import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppWindow, RefreshCcw, X } from "lucide-react";
import {
  commands,
  type AppInfo,
  type AppStyle,
  type CleanupLevel,
} from "@/bindings";
import { Dropdown } from "../../ui/Dropdown";
import { SettingContainer } from "../../ui/SettingContainer";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Alert } from "../../ui/Alert";
import { EmptyState } from "../../ui/EmptyState";
import { useSettings } from "../../../hooks/useSettings";

const STYLES: AppStyle[] = ["default", "message", "email", "code", "raw"];
const LEVELS: CleanupLevel[] = ["none", "light", "medium"];

const useStyleOptions = () => {
  const { t } = useTranslation();
  return useMemo(
    () =>
      STYLES.map((style) => ({
        value: style,
        label: t(`settings.postProcessing.styles.options.${style}`),
      })),
    [t],
  );
};

/** Clean-up level: how much ordinary dictation may change. */
export const CleanupLevelSetting: React.FC = () => {
  const { t } = useTranslation();
  const { getSetting, refreshSettings } = useSettings();
  const level = getSetting("cleanup_level") ?? "light";

  return (
    <SettingContainer
      title={t("settings.postProcessing.cleanup.level.title")}
      description={t("settings.postProcessing.cleanup.level.description")}
      descriptionMode="tooltip"
      grouped={true}
    >
      <Dropdown
        options={LEVELS.map((value) => ({
          value,
          label: t(`settings.postProcessing.cleanup.level.options.${value}`),
        }))}
        selectedValue={level}
        onSelect={async (value) => {
          await commands.changeCleanupLevelSetting(value as CleanupLevel);
          await refreshSettings();
        }}
      />
    </SettingContainer>
  );
};

/** Per-app styles: pick a running app (or type a name) and give it a style. */
export const AppStylesSettings: React.FC = () => {
  const { t } = useTranslation();
  const { getSetting, refreshSettings } = useSettings();
  const styleOptions = useStyleOptions();
  const enabled = getSetting("post_process_enabled") ?? false;
  const defaultStyle = getSetting("default_app_style") ?? "default";
  const rules = getSetting("app_styles") ?? [];

  const [runningApps, setRunningApps] = useState<AppInfo[]>([]);
  const [pickedApp, setPickedApp] = useState<string | null>(null);
  const [typedName, setTypedName] = useState("");
  const [newStyle, setNewStyle] = useState<AppStyle>("message");

  const loadApps = useCallback(async () => {
    try {
      setRunningApps(await commands.listRunningApps());
    } catch (e) {
      console.warn("Failed to list running apps:", e);
    }
  }, []);

  useEffect(() => {
    loadApps();
  }, [loadApps]);

  const appKey = (app: AppInfo) => app.bundle_id ?? app.name;
  const appOptions = runningApps
    .filter((app) => !rules.some((rule) => rule.app_id === appKey(app)))
    .map((app) => ({ value: appKey(app), label: app.name }));

  const addRule = async () => {
    const picked = runningApps.find((app) => appKey(app) === pickedApp);
    const name = typedName.trim();
    const appId = picked ? appKey(picked) : name;
    const appName = picked ? picked.name : name;
    if (!appId) return;
    await commands.setAppStyle(appId, appName, newStyle);
    setPickedApp(null);
    setTypedName("");
    await refreshSettings();
  };

  const changeRule = async (appId: string, appName: string, style: string) => {
    await commands.setAppStyle(appId, appName, style as AppStyle);
    await refreshSettings();
  };

  const removeRule = async (appId: string) => {
    await commands.removeAppStyle(appId);
    await refreshSettings();
  };

  return (
    <>
      {!enabled && (
        <Alert variant="info" contained>
          {t("settings.postProcessing.styles.offNotice")}
        </Alert>
      )}

      <SettingContainer
        title={t("settings.postProcessing.styles.default.title")}
        description={t("settings.postProcessing.styles.default.description")}
        descriptionMode="tooltip"
        grouped={true}
      >
        <Dropdown
          options={styleOptions}
          selectedValue={defaultStyle}
          onSelect={async (value) => {
            await commands.changeDefaultAppStyleSetting(value as AppStyle);
            await refreshSettings();
          }}
        />
      </SettingContainer>

      {rules.length === 0 ? (
        <EmptyState
          icon={AppWindow}
          message={t("settings.postProcessing.styles.empty")}
        />
      ) : (
        rules.map((rule) => (
          <div key={rule.app_id} className="flex items-center gap-3 px-4 py-2">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-text truncate">
                {rule.app_name}
              </p>
              {rule.app_id !== rule.app_name && (
                <p className="text-xs text-text-muted truncate font-mono">
                  {rule.app_id}
                </p>
              )}
            </div>
            <Dropdown
              options={styleOptions}
              selectedValue={rule.style}
              onSelect={(value) =>
                changeRule(rule.app_id, rule.app_name, value)
              }
            />
            <Button
              variant="danger-ghost"
              size="sm"
              onClick={() => removeRule(rule.app_id)}
              aria-label={t("settings.postProcessing.styles.remove")}
              title={t("settings.postProcessing.styles.remove")}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))
      )}

      <div className="px-4 py-3 space-y-2">
        <p className="text-sm font-medium text-text">
          {t("settings.postProcessing.styles.addTitle")}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Dropdown
            options={appOptions}
            selectedValue={pickedApp}
            onSelect={(value) => {
              setPickedApp(value);
              setTypedName("");
            }}
            onOpen={loadApps}
            placeholder={t("settings.postProcessing.styles.pickApp")}
            className="min-w-[200px]"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={loadApps}
            aria-label={t("settings.postProcessing.styles.refresh")}
            title={t("settings.postProcessing.styles.refresh")}
          >
            <RefreshCcw className="w-4 h-4" />
          </Button>
          <Input
            type="text"
            value={typedName}
            onChange={(e) => {
              setTypedName(e.target.value);
              setPickedApp(null);
            }}
            placeholder={t("settings.postProcessing.styles.typeName")}
            variant="compact"
            className="w-44"
          />
          <Dropdown
            options={styleOptions}
            selectedValue={newStyle}
            onSelect={(value) => setNewStyle(value as AppStyle)}
          />
          <Button
            variant="primary"
            onClick={addRule}
            disabled={!pickedApp && !typedName.trim()}
          >
            {t("settings.postProcessing.styles.add")}
          </Button>
        </div>
      </div>
    </>
  );
};
