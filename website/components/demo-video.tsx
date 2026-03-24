import Image from "next/image"

export function DemoVideo() {
  return (
    <div className="w-full mx-auto px-4 z-10 relative">
      <div className="max-w-[52rem] w-full z-1 mx-auto border-x border-t border-white/[0.06] rounded-t-2xl animate-fade-in relative gap-2 flex flex-col items-center justify-center overflow-hidden">
        <div
          className="flex z-10 flex-col gap-2 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="min-w-[calc(100%+2px)] translate-x-[-1px] bg-white/[0.03] h-fit flex flex-col items-center justify-center relative overflow-hidden rounded-t-2xl">
            {/* Hero Image */}
            <Image
              src="/capture-hero.png"
              alt="Hush"
              width={4000}
              height={2250}
              className="w-full h-auto object-cover transition-opacity duration-300 opacity-100"
              priority
            />

            {/* Border overlay */}
            <div className="absolute inset-0 border border-white/[0.08] rounded-t-2xl pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
