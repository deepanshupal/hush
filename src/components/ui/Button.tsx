import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "primary-soft"
    | "secondary"
    | "warning"
    | "danger"
    | "danger-ghost"
    | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-md border focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variantClasses = {
    primary:
      "text-accent-contrast bg-accent border-accent shadow-card hover:bg-accent/90 focus-visible:ring-2 focus-visible:ring-accent/40",
    "primary-soft":
      "text-accent bg-accent/12 border-transparent hover:bg-accent/20 focus-visible:ring-2 focus-visible:ring-accent/40",
    secondary:
      "text-text bg-surface-raised border-border shadow-card hover:border-accent/60 hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent/40",
    // Secondary's neutral resting look, but hover/focus use the semantic
    // --color-warning token (theme.css) instead of the pink accent — for
    // buttons sitting on warning surfaces like SecureInputWarning
    warning:
      "text-text bg-surface-raised border-border hover:bg-warning/15 hover:border-warning focus-visible:ring-2 focus-visible:ring-warning/40",
    danger:
      "text-accent-contrast bg-danger border-danger hover:bg-danger/90 focus-visible:ring-2 focus-visible:ring-danger/40",
    "danger-ghost":
      "text-danger border-transparent hover:bg-danger/10 focus-visible:bg-danger/15 focus-visible:ring-2 focus-visible:ring-danger/40",
    ghost:
      "text-current border-transparent hover:bg-text/5 focus-visible:bg-text/10 focus-visible:ring-2 focus-visible:ring-accent/40",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-[5px] text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
