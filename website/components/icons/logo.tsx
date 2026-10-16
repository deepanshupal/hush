import Image from "next/image"
import { cn } from "@/lib/utils"

/** The Hush keycap wordmark. Source image is 480x171, trimmed, shown at 36px tall. */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/hush-wordmark.png"
      alt="Hush"
      width={480}
      height={171}
      priority
      className={cn("h-9 w-auto", className)}
    />
  )
}
