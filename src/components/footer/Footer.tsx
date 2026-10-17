import React, { useState, useEffect } from "react";
import { getVersion } from "@tauri-apps/api/app";

import ModelSelector from "../model-selector";

const Footer: React.FC = () => {
  const [version, setVersion] = useState("");

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const appVersion = await getVersion();
        setVersion(appVersion);
      } catch (error) {
        console.error("Failed to get app version:", error);
      }
    };

    fetchVersion();
  }, []);

  return (
    <div className="w-full border-t border-border pt-3">
      <div className="flex justify-between items-center text-xs px-4 pb-3 text-text-muted">
        <div className="flex items-center gap-4">
          <ModelSelector />
        </div>

        {version && (
          // eslint-disable-next-line i18next/no-literal-string
          <span className="tabular-nums">v{version}</span>
        )}
      </div>
    </div>
  );
};

export default Footer;
