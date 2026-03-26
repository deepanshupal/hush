import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "beta"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <div
      className={cn(
        "py-1 transition-colors px-2 h-5 rounded-md flex items-center gap-1 text-[10px]",
        variant === "beta"
          ? "font-medium opacity-90 hover:opacity-100"
          : "font-[380] opacity-90 hover:opacity-100",
        className
      )}
      style={
        variant === "beta"
          ? { background: "#F0E0DC", color: "#8B3030", border: "1px solid #D4A8A0" }
          : { background: "#D4CCB8", color: "#5A5040" }
      }
    >
      {children}
    </div>
  )
}
