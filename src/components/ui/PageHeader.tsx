import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  /** Optional controls shown at the end of the title row. */
  actions?: React.ReactNode;
}

/** Settings page title, set in the brand display face like the website. */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
}) => (
  <header className="px-4 pt-2 flex items-end justify-between gap-4">
    <div className="min-w-0">
      <h1 className="font-display italic text-3xl leading-tight text-text">
        {title}
      </h1>
      {description && (
        <p className="text-sm text-text-muted mt-1">{description}</p>
      )}
    </div>
    {actions && <div className="shrink-0">{actions}</div>}
  </header>
);
