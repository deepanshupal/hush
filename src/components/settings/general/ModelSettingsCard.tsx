import React from "react";
import { LanguageSelector } from "../LanguageSelector";
import { TranslateToEnglish } from "../TranslateToEnglish";
import { useModelStore } from "../../../stores/modelStore";
import type { ModelInfo } from "@/bindings";

const useCurrentModelInfo = (): ModelInfo | undefined => {
  const { currentModel, models } = useModelStore();
  return models.find((m: ModelInfo) => m.id === currentModel);
};

/** Speech language picker, shown when the active model has a choice. */
export const ModelLanguageSetting: React.FC = () => {
  const info = useCurrentModelInfo();
  if (!info?.supports_language_selection) return null;
  return (
    <LanguageSelector
      descriptionMode="tooltip"
      grouped={true}
      supportedLanguages={info.supported_languages}
      supportsLanguageDetection={info.supports_language_detection}
    />
  );
};

/** Translate-to-English toggle, shown when the active model supports it. */
export const ModelTranslateSetting: React.FC = () => {
  const info = useCurrentModelInfo();
  if (!info?.supports_translation) return null;
  return <TranslateToEnglish descriptionMode="tooltip" grouped={true} />;
};
