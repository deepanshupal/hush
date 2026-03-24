import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center whitespace-nowrap font-medium transition-transform disabled:pointer-events-none disabled:opacity-20 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background hover:bg-foreground/90",
        secondary:
          "bg-white/[0.08] hover:bg-white/[0.12] text-foreground/90 hover:text-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.06)] border border-white/[0.06]",
        ghost:
          "hover:bg-white/[0.08] hover:text-foreground text-foreground/60",
      },
      size: {
        default: "h-9 px-4 has-[>svg]:px-3 text-sm rounded-full gap-2",
        sm: "h-7 gap-1.5 px-2.5 has-[>svg]:px-2 text-xs rounded-lg",
        xs: "h-6 gap-1.5 px-2.5 has-[>svg]:px-2 text-xs rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
