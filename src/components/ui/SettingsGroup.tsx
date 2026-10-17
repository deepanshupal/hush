import React, { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

interface SettingsGroupProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  /** Render the title as a disclosure button that shows/hides the group. */
  collapsible?: boolean;
  /** Initial state of a collapsible group. */
  defaultOpen?: boolean;
}

const titleClass =
  "text-[11px] font-semibold text-text-muted uppercase tracking-[0.07em]";

export const SettingsGroup: React.FC<SettingsGroupProps> = ({
  title,
  description,
  children,
  collapsible = false,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();
  const isOpen = !collapsible || open;

  return (
    <div className="space-y-2">
      {title && (
        <div className="px-4">
          {collapsible ? (
            <h2 className={titleClass}>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={contentId}
                onClick={() => setOpen((value) => !value)}
                className="-mx-1 px-1 py-0.5 inline-flex items-center gap-1.5 rounded-md uppercase tracking-[0.07em] cursor-pointer hover:text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <ChevronDown
                  aria-hidden="true"
                  className={`w-3.5 h-3.5 transition-transform ${
                    open ? "" : "-rotate-90 rtl:rotate-90"
                  }`}
                />
                {title}
              </button>
            </h2>
          ) : (
            <h2 className={titleClass}>{title}</h2>
          )}
          {description && (
            <p className="text-xs text-text-muted mt-1">{description}</p>
          )}
        </div>
      )}
      {isOpen && (
        <div
          id={contentId}
          className="bg-surface border border-border rounded-xl shadow-card overflow-visible"
        >
          <div className="divide-y divide-border">{children}</div>
        </div>
      )}
    </div>
  );
};
