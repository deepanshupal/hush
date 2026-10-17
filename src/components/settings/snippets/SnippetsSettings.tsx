import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Pencil, TextQuote, Trash2 } from "lucide-react";
import { commands, type Snippet } from "@/bindings";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { Input } from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import { Button } from "../../ui/Button";
import { EmptyState } from "../../ui/EmptyState";
import { PageHeader } from "../../ui/PageHeader";

interface DraftProps {
  trigger: string;
  expansion: string;
  onTrigger: (value: string) => void;
  onExpansion: (value: string) => void;
}

const SnippetFields: React.FC<DraftProps> = ({
  trigger,
  expansion,
  onTrigger,
  onExpansion,
}) => {
  const { t } = useTranslation();
  return (
    <div className="grid gap-2">
      <label className="grid gap-1">
        <span className="text-xs font-medium text-text-muted">
          {t("settings.snippets.trigger")}
        </span>
        <Input
          type="text"
          value={trigger}
          onChange={(e) => onTrigger(e.target.value)}
          placeholder={t("settings.snippets.triggerPlaceholder")}
          variant="compact"
        />
      </label>
      <label className="grid gap-1">
        <span className="text-xs font-medium text-text-muted">
          {t("settings.snippets.expansion")}
        </span>
        <Textarea
          value={expansion}
          onChange={(e) => onExpansion(e.target.value)}
          placeholder={t("settings.snippets.expansionPlaceholder")}
          className="min-h-16"
        />
      </label>
    </div>
  );
};

export const SnippetsSettings: React.FC = () => {
  const { t } = useTranslation();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [trigger, setTrigger] = useState("");
  const [expansion, setExpansion] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTrigger, setEditTrigger] = useState("");
  const [editExpansion, setEditExpansion] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const result = await commands.getSnippets();
    if (result.status === "ok") setSnippets(result.data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const run = async (
    action: () => Promise<
      { status: "ok" } | { status: "error"; error: string }
    >,
  ) => {
    setBusy(true);
    try {
      const result = await action();
      if (result.status === "error") {
        toast.error(t("settings.snippets.error", { error: result.error }));
        return false;
      }
      await load();
      return true;
    } finally {
      setBusy(false);
    }
  };

  const handleAdd = async () => {
    const ok = await run(() =>
      commands.addSnippet(trigger.trim(), expansion.trim()),
    );
    if (ok) {
      setTrigger("");
      setExpansion("");
    }
  };

  const handleSave = async (id: number) => {
    const ok = await run(() =>
      commands.updateSnippet(id, editTrigger.trim(), editExpansion.trim()),
    );
    if (ok) setEditingId(null);
  };

  const startEdit = (snippet: Snippet) => {
    setEditingId(snippet.id);
    setEditTrigger(snippet.trigger_text);
    setEditExpansion(snippet.expansion_text);
  };

  return (
    <div className="max-w-3xl w-full mx-auto space-y-6">
      <PageHeader
        title={t("settings.snippets.title")}
        description={t("settings.snippets.description")}
      />
      <SettingsGroup>
        <div className="p-4 space-y-3">
          <SnippetFields
            trigger={trigger}
            expansion={expansion}
            onTrigger={setTrigger}
            onExpansion={setExpansion}
          />
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={handleAdd}
              disabled={busy || !trigger.trim() || !expansion.trim()}
            >
              {t("settings.snippets.add")}
            </Button>
          </div>
        </div>
      </SettingsGroup>

      <SettingsGroup>
        {snippets.length === 0 ? (
          <EmptyState icon={TextQuote} message={t("settings.snippets.empty")} />
        ) : (
          snippets.map((snippet) =>
            editingId === snippet.id ? (
              <div key={snippet.id} className="p-4 space-y-3">
                <SnippetFields
                  trigger={editTrigger}
                  expansion={editExpansion}
                  onTrigger={setEditTrigger}
                  onExpansion={setEditExpansion}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setEditingId(null)}
                    disabled={busy}
                  >
                    {t("settings.snippets.cancel")}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleSave(snippet.id)}
                    disabled={
                      busy || !editTrigger.trim() || !editExpansion.trim()
                    }
                  >
                    {t("settings.snippets.save")}
                  </Button>
                </div>
              </div>
            ) : (
              <div
                key={snippet.id}
                className="flex items-start gap-3 px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-text">
                    {snippet.trigger_text}
                  </p>
                  <p className="text-sm text-text-muted whitespace-pre-wrap break-words select-text">
                    {snippet.expansion_text}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEdit(snippet)}
                  aria-label={t("settings.snippets.edit")}
                  title={t("settings.snippets.edit")}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="danger-ghost"
                  size="sm"
                  onClick={() => run(() => commands.deleteSnippet(snippet.id))}
                  disabled={busy}
                  aria-label={t("settings.snippets.delete")}
                  title={t("settings.snippets.delete")}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ),
          )
        )}
      </SettingsGroup>
    </div>
  );
};
