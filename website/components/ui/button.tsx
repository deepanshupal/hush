import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * The one button style on the site. Renders a <Link> for internal hrefs,
 * an <a> for external hrefs and a <button> otherwise, so a button is never
 * nested inside a link.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control font-semibold transition-colors duration-150 cursor-pointer select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-ink shadow-button hover:bg-accent-hover",
        secondary:
          "bg-surface-raised text-ink border border-line shadow-button-secondary hover:bg-surface-muted",
        ghost: "text-ink-muted hover:text-ink hover:bg-surface-muted",
      },
      size: {
        sm: "h-8 px-3.5 text-caption",
        md: "h-11 px-5 text-small",
        lg: "h-12 px-6 text-body",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

type Variants = VariantProps<typeof buttonVariants>

type ButtonAsLink = Variants &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string
  }

type ButtonAsButton = Variants &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

export type ButtonProps = ButtonAsLink | ButtonAsButton

function isExternal(href: string) {
  return /^(https?:|mailto:)/.test(href)
}

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, href, ...rest } = props
    const classes = cn(buttonVariants({ variant, size }), className)
    if (isExternal(href)) {
      return <a href={href} className={classes} {...rest} />
    }
    return <Link href={href} className={classes} {...rest} />
  }
  const { variant, size, className, type = "button", ...rest } = props
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...rest} />
}
