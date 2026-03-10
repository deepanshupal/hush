use anyhow::Result;
use log::debug;
use rusqlite::{params, Connection, OptionalExtension};
use serde::{Deserialize, Serialize};
use specta::Type;
use std::path::PathBuf;
use tauri::AppHandle;

#[derive(Clone, Debug, Serialize, Deserialize, Type)]
pub struct Snippet {
    pub id: i64,
    pub trigger_text: String,
    pub expansion_text: String,
    pub created_at: i64,
}

pub struct SnippetsManager {
    db_path: PathBuf,
}

impl SnippetsManager {
    pub fn new(app_handle: &AppHandle) -> Result<Self> {
        let app_data_dir = crate::portable::app_data_dir(app_handle)?;
        let db_path = app_data_dir.join("history.db");

        Ok(Self { db_path })
    }

    fn get_connection(&self) -> Result<Connection> {
        Ok(Connection::open(&self.db_path)?)
    }

    pub async fn get_snippets(&self) -> Result<Vec<Snippet>> {
        let db_path = self.db_path.clone();
        
        tokio::task::spawn_blocking(move || {
            let conn = Connection::open(&db_path)?;
            let mut stmt = conn.prepare(
                "SELECT id, trigger_text, expansion_text, created_at 
                 FROM snippets 
                 ORDER BY created_at DESC"
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

            Ok(snippets)
        })
        .await?
    }

    pub async fn add_snippet(&self, trigger: String, expansion: String) -> Result<i64> {
        let db_path = self.db_path.clone();
        let created_at = chrono::Utc::now().timestamp();

        tokio::task::spawn_blocking(move || {
            let conn = Connection::open(&db_path)?;
            conn.execute(
                "INSERT INTO snippets (trigger_text, expansion_text, created_at) VALUES (?1, ?2, ?3)",
                params![trigger, expansion, created_at],
            )?;

            let id = conn.last_insert_rowid();
            debug!("Added snippet with id: {}", id);
            Ok(id)
        })
        .await?
    }

    pub async fn delete_snippet(&self, id: i64) -> Result<()> {
        let db_path = self.db_path.clone();

        tokio::task::spawn_blocking(move || {
            let conn = Connection::open(&db_path)?;
            conn.execute("DELETE FROM snippets WHERE id = ?1", params![id])?;
            debug!("Deleted snippet with id: {}", id);
            Ok(())
        })
        .await?
    }

    /// Find a snippet by trigger text (case-insensitive, trimmed)
    /// This is synchronous because it's called from the transcription flow
    pub fn find_snippet_by_trigger(&self, trigger: &str) -> Result<Option<Snippet>> {
        let conn = self.get_connection()?;
        let trimmed_trigger = trigger.trim();

        let mut stmt = conn.prepare(
            "SELECT id, trigger_text, expansion_text, created_at 
             FROM snippets 
             WHERE LOWER(TRIM(trigger_text)) = LOWER(?1)"
        )?;

        let result = stmt
            .query_row(params![trimmed_trigger], |row| {
                Ok(Snippet {
                    id: row.get(0)?,
                    trigger_text: row.get(1)?,
                    expansion_text: row.get(2)?,
                    created_at: row.get(3)?,
                })
            })
            .optional()?;

        Ok(result)
    }
}
