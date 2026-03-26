/* eslint-disable @next/next/no-img-element */

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/hush-wordmark.png"
      alt="Hush"
      className={className}
      style={{ height: "50px", width: "auto", objectFit: "contain" }}
    />
  )
}

export function LogoFull({ className }: { className?: string }) {
  return (
    <img
      src="/hush-wordmark.png"
      alt="Hush"
      className={className}
      style={{ height: "50px", width: "auto", objectFit: "contain" }}
    />
  )
}
