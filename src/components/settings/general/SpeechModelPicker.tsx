import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, ChevronRight, Download, Loader2 } from "lucide-react";
import { commands, type ModelInfo } from "@/bindings";
import { useModelStore } from "@/stores/modelStore";
import { formatModelSize } from "@/lib/utils/format";
import { navigateToSection } from "@/lib/navigation";
import { getTranslatedModelName } from "@/lib/utils/modelTranslation";
import Badge from "../../ui/Badge";

/**
 * The three speech models most people should choose between. Each is the
 * catalog repo; the default quantization of that repo is what gets picked,
 * unless the user already has another quantization of it downloaded.
 */
const CHOICES = [
  {
    key: "fast",
    repo: "handy-computer/parakeet-tdt-0.6b-v3-gguf/",
  },
  {
    key: "live",
    repo: "handy-computer/nemotron-3.5-asr-streaming-0.6b-gguf/",
  },
  {
    key: "accurate",
    repo: "handy-computer/granite-speech-4.1-2b-gguf/",
  },
] as const;

type ChoiceKey = (typeof CHOICES)[number]["key"];

/** Macs with at least this much RAM get the large model recommended. */
const ACCURATE_MIN_MEMORY_GB = 16;

const isQuantVariant = (model: ModelInfo) => / \([^)]+\)$/.test(model.name);

/** The model to use for a choice: a downloaded variant first, else the default. */
const resolveChoice = (
  models: ModelInfo[],
  repo: string,
  currentModel: string,
): ModelInfo | undefined => {
  const variants = models.filter((m) => m.id.startsWith(repo));
  return (
    variants.find((m) => m.id === currentModel) ??
    variants.find((m) => m.is_downloaded) ??
    variants.find((m) => !isQuantVariant(m)) ??
    variants[0]
  );
};

export const SpeechModelPicker: React.FC = () => {
  const { t } = useTranslation();
  const {
    models,
    currentModel,
    downloadProgress,
    downloadingModels,
    selectModel,
    downloadModel,
  } = useModelStore();
  const [memoryGb, setMemoryGb] = useState(0);
  const [busyKey, setBusyKey] = useState<ChoiceKey | null>(null);

  useEffect(() => {
    commands
      .getSystemMemoryGb()
      .then(setMemoryGb)
      .catch(() => setMemoryGb(0));
  }, []);

  const choices = CHOICES.map((choice) => ({
    ...choice,
    model: resolveChoice(models, choice.repo, currentModel),
  })).filter(
    (choice): choice is typeof choice & { model: ModelInfo } => !!choice.model,
  );

  const currentInfo = models.find((m) => m.id === currentModel);
  const currentIsChoice = choices.some((c) => c.model.id === currentModel);

  const handleChoose = async (key: ChoiceKey, model: ModelInfo) => {
    if (model.id === currentModel || busyKey) return;
    setBusyKey(key);
    try {
      if (model.is_downloaded) {
        await selectModel(model.id);
      } else if (await downloadModel(model.id)) {
        await selectModel(model.id);
      }
    } finally {
      setBusyKey(null);
    }
  };

  const describe = (key: ChoiceKey, model: ModelInfo) =>
    t(`settings.speechModel.choices.${key}.description`, {
      languages: model.supported_languages.length,
      size: formatModelSize(model.size_mb),
    });

  return (
    <div className="px-4 py-3 space-y-3">
      <div>
        <h3 className="text-sm font-medium text-text">
          {t("settings.speechModel.title")}
        </h3>
        <p className="text-xs text-text-muted mt-0.5">
          {t("settings.speechModel.description")}
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label={t("settings.speechModel.title")}
        className="grid grid-cols-1 sm:grid-cols-3 gap-2"
      >
        {choices.map(({ key, model }) => {
          const isActive = model.id === currentModel;
          const progress = downloadProgress[model.id]?.percentage;
          const isDownloading = !!downloadingModels[model.id];
          const recommended =
            key === "fast" ||
            (key === "accurate" && memoryGb >= ACCURATE_MIN_MEMORY_GB);
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={isActive}
              disabled={!!busyKey && busyKey !== key}
              onClick={() => handleChoose(key, model)}
              className={`text-start flex flex-col gap-1.5 p-3 rounded-lg border transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
                isActive
                  ? "border-accent bg-accent/8"
                  : "border-border bg-surface-raised hover:border-accent/60"
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-text">
                  {t(`settings.speechModel.choices.${key}.label`)}
                </span>
                {isActive ? (
                  <Check
                    aria-hidden="true"
                    className="w-4 h-4 text-accent shrink-0"
                  />
                ) : isDownloading || busyKey === key ? (
                  <Loader2
                    aria-hidden="true"
                    className="w-4 h-4 text-text-muted animate-spin shrink-0"
                  />
                ) : !model.is_downloaded ? (
                  <Download
                    aria-hidden="true"
                    className="w-4 h-4 text-text-muted shrink-0"
                  />
                ) : null}
              </span>
              <span className="text-xs text-text-muted">
                {getTranslatedModelName(model, t)}
              </span>
              <span className="text-xs text-text leading-relaxed">
                {describe(key, model)}
              </span>
              {key === "accurate" && memoryGb < ACCURATE_MIN_MEMORY_GB && (
                <span className="text-xs text-text-muted">
                  {t("settings.speechModel.choices.accurate.memoryNote")}
                </span>
              )}
              <span className="flex items-center gap-1.5 flex-wrap mt-auto pt-1">
                {recommended && (
                  <Badge variant="primary" className="px-2! py-0.5!">
                    {t("settings.speechModel.recommended")}
                  </Badge>
                )}
                {isDownloading && progress !== undefined && (
                  <span className="text-xs text-text-muted tabular-nums">
                    {t("settings.speechModel.downloading", {
                      percent: Math.round(progress),
                    })}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        {currentInfo && !currentIsChoice ? (
          <p className="text-xs text-text-muted">
            {t("settings.speechModel.current", {
              model: getTranslatedModelName(currentInfo, t),
            })}
          </p>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={() => navigateToSection("models")}
          className="inline-flex items-center gap-1 text-xs font-medium text-accent rounded-md px-1 -mx-1 cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          {t("settings.speechModel.moreModels")}
          <ChevronRight
            aria-hidden="true"
            className="w-3.5 h-3.5 rtl:rotate-180"
          />
        </button>
      </div>
    </div>
  );
};
