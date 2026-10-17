import React from "react";
import { useTranslation } from "react-i18next";
import { type } from "@tauri-apps/plugin-os";
import { Dropdown } from "../ui/Dropdown";
import { SettingContainer } from "../ui/SettingContainer";
import { useSettings } from "../../hooks/useSettings";
import type { MediaWhileRecording as MediaWhileRecordingMode } from "@/bindings";

interface MediaWhileRecordingProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

/**
 * What happens to music and videos while dictating: pause them, lower the
 * volume, mute everything, or leave them alone. (This file used to be the
 * "Mute while recording" toggle; muting is now one of the choices.)
 */
export const MuteWhileRecording: React.FC<MediaWhileRecordingProps> =
  React.memo(({ descriptionMode = "tooltip", grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();
    // Pausing and lowering the volume are macOS-only for now.
    const isMac = type() === "macos";

    const options = [
      ...(isMac
        ? [
            {
              value: "pause",
              label: t("settings.sound.mediaWhileRecording.options.pause"),
            },
            {
              value: "lower_volume",
              label: t(
                "settings.sound.mediaWhileRecording.options.lowerVolume",
              ),
            },
          ]
        : []),
      {
        value: "mute",
        label: t("settings.sound.mediaWhileRecording.options.mute"),
      },
      {
        value: "off",
        label: t("settings.sound.mediaWhileRecording.options.off"),
      },
    ];

    const stored = (getSetting("media_while_recording") ??
      "pause") as MediaWhileRecordingMode;
    const selected = options.some((option) => option.value === stored)
      ? stored
      : "off";

    return (
      <SettingContainer
        title={t("settings.sound.mediaWhileRecording.title")}
        description={t("settings.sound.mediaWhileRecording.description")}
        descriptionMode={descriptionMode}
        grouped={grouped}
      >
        <Dropdown
          options={options}
          selectedValue={selected}
          onSelect={(value) =>
            updateSetting(
              "media_while_recording",
              value as MediaWhileRecordingMode,
            )
          }
          disabled={isUpdating("media_while_recording")}
        />
      </SettingContainer>
    );
  });
