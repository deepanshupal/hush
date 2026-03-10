import React, { useState } from "react";
import { ToggleSwitch } from "../ui/ToggleSwitch";
import { useSettings } from "../../hooks/useSettings";
import { Eye, EyeOff } from "lucide-react";

interface AIPolishSettingsProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const AIPolishSettings: React.FC<AIPolishSettingsProps> = React.memo(
  ({ descriptionMode = "tooltip", grouped = false }) => {
    const { getSetting, updateSetting, isUpdating } = useSettings();
    const [showApiKey, setShowApiKey] = useState(false);

    const enabled = getSetting("ai_polish_enabled") ?? false;
    const apiKey = getSetting("ai_polish_groq_api_key") ?? "";

    const handleApiKeyChange = (value: string) => {
      updateSetting("ai_polish_groq_api_key", value);
    };

    return (
      <div className={grouped ? "space-y-3" : "space-y-2"}>
        <ToggleSwitch
          checked={enabled}
          onChange={(enabled) => updateSetting("ai_polish_enabled", enabled)}
          isUpdating={isUpdating("ai_polish_enabled")}
          label="AI Polish"
          description="Automatically clean up transcriptions using AI"
          descriptionMode={descriptionMode}
          grouped={grouped}
        />

        {enabled && (
          <div className="px-4 pb-4 border-t border-mid-gray/20 mt-2 pt-3">
            <div className="space-y-2">
              <label className="text-xs font-medium text-mid-gray">
                Groq API Key
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  placeholder="Enter your Groq API key"
                  className="w-full px-3 py-2 pr-10 text-sm bg-white dark:bg-dark-gray border border-mid-gray/20 rounded focus:outline-none focus:ring-2 focus:ring-logo-primary/50"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-mid-gray hover:text-text transition-colors"
                  title={showApiKey ? "Hide API key" : "Show API key"}
                >
                  {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-xs text-mid-gray">
                Get a free API key at console.groq.com
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);
