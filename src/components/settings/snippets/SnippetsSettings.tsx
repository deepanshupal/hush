import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Plus, X } from "lucide-react";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { commands } from "@/bindings";

interface Snippet {
  id: number;
  trigger_text: string;
  expansion_text: string;
  created_at: number;
}

export const SnippetsSettings: React.FC = () => {
  const { t } = useTranslation();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [triggerText, setTriggerText] = useState("");
  const [expansionText, setExpansionText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSnippets = async () => {
    try {
      const result = await commands.getSnippets();
      if (result.status === "ok") {
        setSnippets(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(String(err));
    }
  };

  useEffect(() => {
    loadSnippets();
  }, []);

  const handleAddSnippet = async () => {
    if (!triggerText.trim() || !expansionText.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await commands.addSnippet(
        triggerText.trim(),
        expansionText.trim()
      );
      if (result.status === "ok") {
        setTriggerText("");
        setExpansionText("");
        setShowAddForm(false);
        await loadSnippets();
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSnippet = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await commands.deleteSnippet(id);
      if (result.status === "ok") {
        await loadSnippets();
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setTriggerText("");
    setExpansionText("");
    setError(null);
  };

  return (
    <div className="max-w-3xl w-full mx-auto space-y-6">
      <SettingsGroup title={t("settings.snippets.title")}>
        <div className="space-y-4">
          <p className="text-sm text-mid-gray break-words px-4 pt-3 pb-1">
            {t("settings.snippets.description")}
          </p>

          {error && (
            <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded">
              {error}
            </div>
          )}

          {snippets.length === 0 && !showAddForm && (
            <div className="text-sm text-mid-gray italic py-8 px-4 text-center">
              {t("settings.snippets.noSnippets")}
            </div>
          )}

          {snippets.length > 0 && (
            <div className="space-y-2">
              {snippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className="flex items-start gap-3 p-3 bg-light-gray/30 dark:bg-dark-gray/30 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">
                        {snippet.trigger_text}
                      </span>
                      <span className="text-mid-gray">→</span>
                    </div>
                    <div className="text-sm text-mid-gray break-words">
                      {snippet.expansion_text}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteSnippet(snippet.id)}
                    disabled={isLoading}
                    className="flex-shrink-0 p-2 text-mid-gray hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
                    title={t("settings.snippets.deleteSnippet")}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {showAddForm && (
            <div className="space-y-3 p-4 bg-light-gray/30 dark:bg-dark-gray/30 rounded-lg">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("settings.snippets.trigger")}
                </label>
                <input
                  type="text"
                  value={triggerText}
                  onChange={(e) => setTriggerText(e.target.value)}
                  placeholder={t("settings.snippets.triggerPlaceholder")}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-dark-gray border border-mid-gray/20 rounded focus:outline-none focus:ring-2 focus:ring-logo-primary/50"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("settings.snippets.expansion")}
                </label>
                <textarea
                  value={expansionText}
                  onChange={(e) => setExpansionText(e.target.value)}
                  placeholder={t("settings.snippets.expansionPlaceholder")}
                  rows={3}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-dark-gray border border-mid-gray/20 rounded focus:outline-none focus:ring-2 focus:ring-logo-primary/50 resize-none"
                  disabled={isLoading}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddSnippet}
                  disabled={
                    isLoading ||
                    !triggerText.trim() ||
                    !expansionText.trim()
                  }
                  className="px-4 py-2 text-sm font-medium text-white bg-logo-primary hover:bg-logo-primary/90 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t("settings.snippets.save")}
                </button>
                <button
                  onClick={toggleAddForm}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-mid-gray hover:bg-light-gray/50 dark:hover:bg-dark-gray/50 rounded transition-colors disabled:opacity-50"
                >
                  {t("settings.snippets.cancel")}
                </button>
              </div>
            </div>
          )}

          {!showAddForm && (
            <button
              onClick={toggleAddForm}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-logo-primary hover:bg-logo-primary/10 rounded transition-colors disabled:opacity-50"
            >
              <Plus size={16} />
              {t("settings.snippets.addSnippet")}
            </button>
          )}
        </div>
      </SettingsGroup>
    </div>
  );
};
