//! Voice snippets: say a trigger phrase, get its expansion pasted.
//!
//! Snippets live in the `snippets` table of `history.db` (created by the
//! history migrations) and are cached in memory, so matching a dictation
//! never touches the disk.
//!
//! Matching is forgiving about how speech-to-text renders a phrase: case,
//! surrounding whitespace and leading/trailing punctuation are ignored, so a
//! dictation of "My email." triggers the snippet "my email".
//!
//! - If the whole dictation is a trigger, the expansion replaces it verbatim
//!   (and AI clean-up is skipped).
//! - Otherwise triggers spoken inside a longer dictation are replaced in
//!   place. When triggers overlap, the longest one wins.

use anyhow::{anyhow, Result};
use log::debug;
use regex::Regex;
use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use specta::Type;
use std::path::PathBuf;
use std::sync::RwLock;
use tauri::AppHandle;

#[derive(Clone, Debug, Serialize, Deserialize, Type)]
pub struct Snippet {
    pub id: i64,
    pub trigger_text: String,
    pub expansion_text: String,
    pub created_at: i64,
}

/// Lowercase, collapse whitespace and drop punctuation at either end, so the
/// same spoken phrase compares equal however the model punctuated it.
pub fn normalize_trigger(text: &str) -> String {
    let trimmed = text.trim_matches(|c: char| {
        c.is_whitespace()
            || (c.is_ascii_punctuation() && c != '@' && c != '#')
            || matches!(
                c,
                '…' | '“' | '”' | '‘' | '’' | '。' | '、' | '！' | '？' | '，'
            )
    });
    trimmed
        .split_whitespace()
        .collect::<Vec<_>>()
        .join(" ")
        .to_lowercase()
}

struct Cache {
    snippets: Vec<Snippet>,
    /// Alternation of every trigger (longest first) for in-text replacement.
    inline: Option<Regex>,
}

impl Cache {
    fn build(snippets: Vec<Snippet>) -> Self {
        let mut triggers: Vec<String> = snippets
            .iter()
            .map(|s| normalize_trigger(&s.trigger_text))
            .filter(|t| !t.is_empty())
            .collect();
        // Longest first: the regex alternation tries branches in order, so the
        // longest trigger at a position wins over its prefixes.
        triggers.sort_by_key(|t| std::cmp::Reverse(t.chars().count()));
        triggers.dedup();

        let inline = if triggers.is_empty() {
            None
        } else {
            let alternation = triggers
                .iter()
                .map(|t| {
                    let words: Vec<String> = t.split(' ').map(regex::escape).collect();
                    words.join(r"\s+")
                })
                .collect::<Vec<_>>()
                .join("|");
            // Word boundaries on both sides; `(?i)` for case-insensitivity.
            Regex::new(&format!(r"(?i)\b(?:{alternation})\b")).ok()
        };

        Self { snippets, inline }
    }

    fn expansion_for(&self, normalized: &str) -> Option<&str> {
        self.snippets
            .iter()
            .find(|s| normalize_trigger(&s.trigger_text) == normalized)
            .map(|s| s.expansion_text.as_str())
    }
}

pub struct SnippetsManager {
    db_path: PathBuf,
    cache: RwLock<Cache>,
}

impl SnippetsManager {
    /// Must be created after `HistoryManager`, whose migrations create the table.
    pub fn new(app_handle: &AppHandle) -> Result<Self> {
        let app_data_dir = crate::portable::app_data_dir(app_handle)?;
        let manager = Self {
            db_path: app_data_dir.join("history.db"),
            cache: RwLock::new(Cache::build(Vec::new())),
        };
        manager.reload()?;
        Ok(manager)
    }

    fn connection(&self) -> Result<Connection> {
        Ok(Connection::open(&self.db_path)?)
    }

    fn reload(&self) -> Result<()> {
        let conn = self.connection()?;
        let mut stmt = conn.prepare(
            "SELECT id, trigger_text, expansion_text, created_at
             FROM snippets
             ORDER BY created_at DESC, id DESC",
        )?;
        let snippets = stmt
            .query_map([], |row| {
                Ok(Snippet {
                    id: row.get(0)?,
                    trigger_text: row.get(1)?,
                    expansion_text: row.get(2)?,
                    created_at: row.get(3)?,
                })
            })?
            .collect::<Result<Vec<_>, _>>()?;
        debug!("Loaded {} voice snippets", snippets.len());
        *self
            .cache
            .write()
            .map_err(|_| anyhow!("snippet cache poisoned"))? = Cache::build(snippets);
        Ok(())
    }

    pub fn list(&self) -> Result<Vec<Snippet>> {
        Ok(self
            .cache
            .read()
            .map_err(|_| anyhow!("snippet cache poisoned"))?
            .snippets
            .clone())
    }

    fn validate(&self, trigger: &str, expansion: &str, editing: Option<i64>) -> Result<String> {
        let normalized = normalize_trigger(trigger);
        if normalized.is_empty() {
            return Err(anyhow!("The trigger phrase can't be empty"));
        }
        if expansion.trim().is_empty() {
            return Err(anyhow!("The expansion can't be empty"));
        }
        let duplicate = self
            .list()?
            .into_iter()
            .any(|s| Some(s.id) != editing && normalize_trigger(&s.trigger_text) == normalized);
        if duplicate {
            return Err(anyhow!("A snippet with this trigger phrase already exists"));
        }
        Ok(trigger.trim().to_string())
    }

    pub fn add(&self, trigger: &str, expansion: &str) -> Result<i64> {
        let trigger = self.validate(trigger, expansion, None)?;
        let conn = self.connection()?;
        conn.execute(
            "INSERT INTO snippets (trigger_text, expansion_text, created_at) VALUES (?1, ?2, ?3)",
            params![trigger, expansion, chrono::Utc::now().timestamp()],
        )?;
        let id = conn.last_insert_rowid();
        self.reload()?;
        Ok(id)
    }

    pub fn update(&self, id: i64, trigger: &str, expansion: &str) -> Result<()> {
        let trigger = self.validate(trigger, expansion, Some(id))?;
        self.connection()?.execute(
            "UPDATE snippets SET trigger_text = ?1, expansion_text = ?2 WHERE id = ?3",
            params![trigger, expansion, id],
        )?;
        self.reload()
    }

    pub fn delete(&self, id: i64) -> Result<()> {
        self.connection()?
            .execute("DELETE FROM snippets WHERE id = ?1", params![id])?;
        self.reload()
    }

    /// The expansion when the whole dictation is a trigger phrase.
    pub fn find_expansion(&self, transcription: &str) -> Result<Option<String>> {
        let normalized = normalize_trigger(transcription);
        if normalized.is_empty() {
            return Ok(None);
        }
        let cache = self
            .cache
            .read()
            .map_err(|_| anyhow!("snippet cache poisoned"))?;
        Ok(cache.expansion_for(&normalized).map(str::to_string))
    }

    /// Replace trigger phrases spoken inside a longer dictation.
    pub fn expand_inline(&self, text: &str) -> String {
        let Ok(cache) = self.cache.read() else {
            return text.to_string();
        };
        let Some(re) = &cache.inline else {
            return text.to_string();
        };
        re.replace_all(text, |caps: &regex::Captures| {
            let matched = normalize_trigger(&caps[0]);
            cache
                .expansion_for(&matched)
                .map(str::to_string)
                .unwrap_or_else(|| caps[0].to_string())
        })
        .into_owned()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn snippet(id: i64, trigger: &str, expansion: &str) -> Snippet {
        Snippet {
            id,
            trigger_text: trigger.to_string(),
            expansion_text: expansion.to_string(),
            created_at: id,
        }
    }

    #[test]
    fn normalization_ignores_case_whitespace_and_end_punctuation() {
        assert_eq!(normalize_trigger("  My   Email. "), "my email");
        assert_eq!(normalize_trigger("my email!"), "my email");
        assert_eq!(normalize_trigger("My email?"), "my email");
        assert_eq!(normalize_trigger("my email,"), "my email");
        assert_eq!(normalize_trigger("“Sign off.”"), "sign off");
        assert_eq!(normalize_trigger("..."), "");
    }

    #[test]
    fn whole_dictation_matches_after_normalizing() {
        let cache = Cache::build(vec![snippet(1, "my email", "me@example.com")]);
        assert_eq!(
            cache.expansion_for(&normalize_trigger("My email.")),
            Some("me@example.com")
        );
        assert_eq!(cache.expansion_for(&normalize_trigger("my emails")), None);
    }

    #[test]
    fn inline_triggers_expand_and_the_longest_wins() {
        let cache = Cache::build(vec![
            snippet(1, "my address", "1 Short St"),
            snippet(2, "my work address", "99 Office Rd"),
        ]);
        let re = cache.inline.as_ref().unwrap();
        let out = re.replace_all(
            "Send it to my work address, please.",
            |c: &regex::Captures| {
                cache
                    .expansion_for(&normalize_trigger(&c[0]))
                    .unwrap()
                    .to_string()
            },
        );
        assert_eq!(out, "Send it to 99 Office Rd, please.");
    }

    #[test]
    fn inline_matching_respects_word_boundaries() {
        let cache = Cache::build(vec![snippet(1, "sig", "— Deepanshu")]);
        let re = cache.inline.as_ref().unwrap();
        assert!(!re.is_match("a signature"));
        assert!(re.is_match("thanks Sig"));
    }
}
