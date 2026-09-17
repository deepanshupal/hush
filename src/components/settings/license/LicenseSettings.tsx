import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { openUrl } from "@tauri-apps/plugin-opener";
import { toast } from "sonner";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { SettingContainer } from "../../ui/SettingContainer";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { useLicenseStore } from "../../../stores/licenseStore";

export const LicenseSettings: React.FC = () => {
  const { t } = useTranslation();
  const { license, loading, activating, fetchLicense, activate, deactivate } =
    useLicenseStore();
  const [key, setKey] = useState("");

  useEffect(() => {
    if (!license) {
      fetchLicense();
    }
  }, [license, fetchLicense]);

  const handleActivate = async () => {
    try {
      await activate(key);
      setKey("");
      toast.success(t("settings.license.activated"));
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : t("settings.license.activateError"),
      );
    }
  };

  const handleDeactivate = async () => {
    try {
      await deactivate();
      toast.success(t("settings.license.deactivated"));
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : t("settings.license.deactivateError"),
      );
    }
  };

  const statusText = loading
    ? t("settings.license.loading")
    : license?.status === "licensed"
      ? t("settings.license.statusLicensed")
      : license?.status === "trial"
        ? t("settings.license.statusTrial", {
            count: license.days_remaining,
          })
        : t("settings.license.statusExpired");

  return (
    <div className="max-w-3xl w-full mx-auto space-y-6">
      <SettingsGroup title={t("settings.license.title")}>
        <SettingContainer
          title={t("settings.license.status.title")}
          description={statusText}
          grouped={true}
        >
          {license?.status !== "licensed" && (
            <Button
              variant="secondary"
              size="md"
              onClick={() => openUrl("https://hush.software/license")}
            >
              {t("settings.license.buyButton")}
            </Button>
          )}
        </SettingContainer>

        {license?.status === "licensed" && (
          <>
            {license.customer_email && (
              <SettingContainer
                title={t("settings.license.email.title")}
                description={license.customer_email}
                grouped={true}
              >
                <></>
              </SettingContainer>
            )}
            {license.masked_key && (
              <SettingContainer
                title={t("settings.license.key.title")}
                description={license.masked_key}
                grouped={true}
              >
                <></>
              </SettingContainer>
            )}
            <SettingContainer
              title={t("settings.license.deactivate.title")}
              description={t("settings.license.deactivate.description")}
              grouped={true}
            >
              <Button
                variant="danger-ghost"
                size="md"
                onClick={handleDeactivate}
                disabled={activating}
              >
                {t("settings.license.deactivate.button")}
              </Button>
            </SettingContainer>
          </>
        )}

        {license?.status !== "licensed" && (
          <SettingContainer
            title={t("settings.license.activate.title")}
            description={t("settings.license.activate.description")}
            grouped={true}
            layout="stacked"
          >
            <div className="flex gap-2 w-full">
              <Input
                className="flex-1"
                placeholder={t("settings.license.activate.placeholder")}
                value={key}
                onChange={(e) => setKey(e.target.value)}
                disabled={activating}
              />
              <Button
                variant="primary"
                size="md"
                onClick={handleActivate}
                disabled={activating || key.trim().length < 8}
              >
                {activating
                  ? t("settings.license.activate.activating")
                  : t("settings.license.activate.button")}
              </Button>
            </div>
          </SettingContainer>
        )}
      </SettingsGroup>
    </div>
  );
};
