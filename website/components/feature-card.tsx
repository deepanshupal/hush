import { Badge } from "@/components/ui/badge"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  badge?: "beta" | "coming-soon"
  delay?: number
}

export function FeatureCard({
  title,
  description,
  icon,
  badge,
  delay = 0,
}: FeatureCardProps) {
  return (
    <div
      className="flex relative flex-col gap-2 opacity-0 p-7 animate-blur-fade-slide-in"
      style={{
        animationDelay: `${delay}s`,
        borderRight: "1px solid #C4BCA8",
        borderBottom: "1px solid #C4BCA8",
      }}
    >
      <div style={{ animationDelay: `${delay}s` }} className="flex items-start gap-3">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <h3 className="text-base flex items-start gap-3 font-medium" style={{ color: "#1A1410" }}>
            <span className="flex items-center gap-2">
              {title}
              {badge === "beta" && <Badge variant="beta">Beta</Badge>}
              {badge === "coming-soon" && <Badge>Coming Soon</Badge>}
            </span>
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#5A5040" }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
