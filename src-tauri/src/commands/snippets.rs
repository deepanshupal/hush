use crate::managers::snippets::{Snippet, SnippetsManager};
use std::sync::Arc;
use tauri::State;

#[tauri::command]
#[specta::specta]
pub fn get_snippets(snippets: State<'_, Arc<SnippetsManager>>) -> Result<Vec<Snippet>, String> {
    snippets.list().map_err(|e| e.to_string())
}

#[tauri::command]
#[specta::specta]
pub fn add_snippet(
    snippets: State<'_, Arc<SnippetsManager>>,
    trigger: String,
    expansion: String,
) -> Result<i64, String> {
    snippets
        .add(&trigger, &expansion)
        .map_err(|e| e.to_string())
}

#[tauri::command]
#[specta::specta]
pub fn update_snippet(
    snippets: State<'_, Arc<SnippetsManager>>,
    id: i64,
    trigger: String,
    expansion: String,
) -> Result<(), String> {
    snippets
        .update(id, &trigger, &expansion)
        .map_err(|e| e.to_string())
}

#[tauri::command]
#[specta::specta]
pub fn delete_snippet(snippets: State<'_, Arc<SnippetsManager>>, id: i64) -> Result<(), String> {
    snippets.delete(id).map_err(|e| e.to_string())
}
