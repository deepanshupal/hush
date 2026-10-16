import React from "react";
import { useTranslation } from "react-i18next";
import { type } from "@tauri-apps/plugin-os";
import { MicrophoneSelector } from "../MicrophoneSelector";
import { ShortcutInput } from "../ShortcutInput";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { PageHeader } from "../../ui/PageHeader";
import { ShortcutActivationSetting } from "../ShortcutActivation";
import { AudioFeedback } from "../AudioFeedback";
import { MuteWhileRecording } from "../MuteWhileRecording";
import { CustomWords } from "../CustomWords";
import { ShowOverlay } from "../ShowOverlay";
import { AutostartToggle } from "../AutostartToggle";
import { ThemeSelector } from "../ThemeSelector";
import { AppLanguageSelector } from "../AppLanguageSelector";
import { RecordingRetentionPeriodSelector } from "../RecordingRetentionPeriod";
import { ModelLanguageSetting } from "./ModelSettingsCard";
import { SpeechModelPicker } from "./SpeechModelPicker";

/**
 * The settings most people need. Everything else lives on the Advanced page.
 */
export const GeneralSettings: React.FC = () => {
  const { t } = useTranslation();
  const isLinux = type() === "linux";
  return (
    <div className="max-w-3xl w-full mx-auto space-y-6">
      <PageHeader title={t("settings.general.title")} />

      <SettingsGroup title={t("settings.general.groups.shortcuts")}>
        <ShortcutInput shortcutId="transcribe" grouped={true} />
        <ShortcutActivationSetting descriptionMode="tooltip" grouped={true} />
        {/* Cancel shortcut remains hidden on Linux because of dynamic shortcut instability. */}
        {!isLinux && <ShortcutInput shortcutId="cancel" grouped={true} />}
        <ShortcutInput shortcutId="paste_last" grouped={true} />
      </SettingsGroup>

      <SettingsGroup title={t("settings.general.groups.speech")}>
        <SpeechModelPicker />
        <ModelLanguageSetting />
        <CustomWords descriptionMode="tooltip" grouped />
      </SettingsGroup>

      <SettingsGroup title={t("settings.sound.title")}>
        <MicrophoneSelector descriptionMode="tooltip" grouped={true} />
        <MuteWhileRecording descriptionMode="tooltip" grouped={true} />
        <AudioFeedback descriptionMode="tooltip" grouped={true} />
      </SettingsGroup>

      <SettingsGroup title={t("settings.general.groups.app")}>
        <ShowOverlay descriptionMode="tooltip" grouped={true} />
        <AutostartToggle descriptionMode="tooltip" grouped={true} />
        <RecordingRetentionPeriodSelector
          descriptionMode="tooltip"
          grouped={true}
        />
        <ThemeSelector descriptionMode="tooltip" grouped={true} />
        <AppLanguageSelector descriptionMode="tooltip" grouped={true} />
      </SettingsGroup>
    </div>
  );
};
