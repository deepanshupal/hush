import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { openUrl } from "@tauri-apps/plugin-opener";
import { toast, Toaster } from "sonner";
import { useLicenseStore } from "../stores/licenseStore";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import HushTextLogo from "./icons/HandyTextLogo";

const Paywall: React.FC = () => {
  const { t } = useTranslation();
  const { activating, activate } = useLicenseStore();
  const [key, setKey] = useState("");

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

  return (
    <div className="h-screen flex flex-col items-center justify-center select-none cursor-default bg-background px-8">
      <Toaster
        theme="system"
        toastOptions={{
          unstyled: true,
          classNames: {
            toast:
              "bg-background border border-mid-gray/20 rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 text-sm",
            title: "font-medium",
            description: "text-mid-gray",
          },
        }}
      />
      <div className="flex flex-col items-center gap-6 max-w-sm w-full">
        <HushTextLogo />
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-lg font-semibold">{t("paywall.title")}</h1>
          <p className="text-sm text-text/60">{t("paywall.subtitle")}</p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Input
            className="w-full text-center"
            placeholder={t("settings.license.activate.placeholder")}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            disabled={activating}
          />
          <Button
            variant="primary"
            size="lg"
            onClick={handleActivate}
            disabled={activating || key.trim().length < 8}
          >
            {activating
              ? t("settings.license.activate.activating")
              : t("settings.license.activate.button")}
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => openUrl("https://hush.software/pricing")}
          >
            {t("paywall.buyButton")}
          </Button>
        </div>
        <button
          className="text-xs text-text/50 hover:text-text/80 underline underline-offset-2 cursor-pointer bg-transparent border-none"
          onClick={() => openUrl("mailto:hi@hush.software")}
        >
          {t("paywall.help")}
        </button>
      </div>
    </div>
  );
};

export default Paywall;
