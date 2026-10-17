import React from "react";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  message: string;
  /** Optional action shown under the message. */
  children?: React.ReactNode;
}

/** The one empty-list look used across settings pages. */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  message,
  children,
}) => (
  <div className="px-4 py-8 flex flex-col items-center text-center gap-3">
    {Icon && (
      <span className="grid place-items-center w-10 h-10 rounded-full bg-text/5 text-text-muted">
        <Icon aria-hidden={true} className="w-5 h-5" />
      </span>
    )}
    <p className="text-sm text-text-muted max-w-sm">{message}</p>
    {children}
  </div>
);
