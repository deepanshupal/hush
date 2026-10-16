import Image from "next/image"

/** Product screenshot framed inside the page card. */
export function AppScreenshot() {
  return (
    <div className="px-4 sm:px-8">
      <div className="animate-enter overflow-hidden rounded-panel border border-line shadow-panel [animation-delay:400ms]">
        <Image
          src="/images/banner-v1.png"
          alt="The Hush settings window, with General, Models, Advanced, Snippets, Tone, History and About sections"
          width={1608}
          height={949}
          sizes="(min-width: 832px) 768px, 100vw"
          className="h-auto w-full"
          priority
        />
      </div>
    </div>
  )
}
