import React from "react";

interface SettingsGroupProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const SettingsGroup: React.FC<SettingsGroupProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="space-y-2">
      {title && (
        <div className="px-4">
          <h2 className="text-[11px] font-semibold text-text-muted uppercase tracking-[0.07em]">
            {title}
          </h2>
          {description && (
            <p className="text-xs text-text-muted mt-1">{description}</p>
          )}
        </div>
      )}
      <div className="bg-surface border border-border rounded-xl shadow-card overflow-visible">
        <div className="divide-y divide-border">{children}</div>
      </div>
    </div>
  );
};
