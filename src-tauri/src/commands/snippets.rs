use crate::managers::snippets::{Snippet, SnippetsManager};
use std::sync::Arc;
use tauri::{AppHandle, State};

#[tauri::command]
#[specta::specta]
pub async fn get_snippets(
    _app: AppHandle,
    snippets_manager: State<'_, Arc<SnippetsManager>>,
) -> Result<Vec<Snippet>, String> {
    snippets_manager
        .get_snippets()
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
#[specta::specta]
pub async fn add_snippet(
    _app: AppHandle,
    snippets_manager: State<'_, Arc<SnippetsManager>>,
    trigger: String,
    expansion: String,
) -> Result<i64, String> {
    snippets_manager
        .add_snippet(trigger, expansion)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
#[specta::specta]
pub async fn delete_snippet(
    _app: AppHandle,
    snippets_manager: State<'_, Arc<SnippetsManager>>,
    id: i64,
) -> Result<(), String> {
    snippets_manager
        .delete_snippet(id)
        .await
        .map_err(|e| e.to_string())
}
