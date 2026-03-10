import React from "react";
import { useSettings } from "../../hooks/useSettings";
import { commands } from "@/bindings";
import { SettingsGroup } from "../ui/SettingsGroup";
import { Dropdown } from "../ui/Dropdown";

const APPS = [
  { name: "Visual Studio Code", key: "Visual Studio Code" },
  { name: "Slack", key: "Slack" },
  { name: "Gmail (Chrome)", key: "Google Chrome" },
  { name: "Notes", key: "Notes" },
  { name: "Terminal", key: "Terminal" },
];

const TONES = [
  { value: "default", label: "Default" },
  { value: "casual", label: "Casual" },
  { value: "professional", label: "Professional" },
  { value: "developer", label: "Developer" },
  { value: "raw", label: "Raw (No AI Polish)" },
];

export const ToneSettings: React.FC = () => {
  const { getSetting, refreshSettings } = useSettings();
  const tonePerApp = (getSetting("tone_per_app") as Record<string, string>) || {};

  const handleToneChange = async (appName: string, tone: string) => {
    try {
      await commands.setAppTone(appName, tone);
      await refreshSettings();
    } catch (error) {
      console.error("Failed to update tone setting:", error);
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto space-y-6">
      <SettingsGroup title="Per-App Tone">
        <p className="text-sm text-mid-gray mb-4 break-words px-4 pt-3 pb-1">
          Choose how AI Polish should adjust your transcriptions for different apps
        </p>
        <div className="space-y-3">
          {APPS.map((app) => (
            <div
              key={app.key}
              className="flex items-center justify-between py-2 px-4 border-b border-mid-gray/10 last:border-0"
            >
              <span className="text-sm font-medium">{app.name}</span>
              <Dropdown
                options={TONES}
                selectedValue={tonePerApp[app.key] || "default"}
                onSelect={(tone) => handleToneChange(app.key, tone)}
              />
            </div>
          ))}
        </div>
      </SettingsGroup>
    </div>
  );
};
