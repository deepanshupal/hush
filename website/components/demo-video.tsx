import Image from "next/image"

export function DemoVideo() {
  return (
    <div className="w-full mx-auto px-4 z-10 relative">
      <div
        className="max-w-[52rem] w-full z-1 mx-auto rounded-t-2xl animate-fade-in relative gap-2 flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: "#F0EBE0",
          border: "1px solid #C4BCA8",
          borderBottom: "none",
          boxShadow: "0 20px 60px rgba(26,20,16,0.15)",
          padding: "20px",
          paddingBottom: "0",
        }}
      >
        <div
          className="flex z-10 flex-col gap-2 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="min-w-[calc(100%+2px)] translate-x-[-1px] h-fit flex flex-col items-center justify-center relative overflow-hidden rounded-t-2xl">
            <Image
              src="/images/banner-v1.png"
              alt="Hush app screenshot"
              width={1608}
              height={949}
              className="w-full h-auto object-cover transition-opacity duration-300 opacity-100"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
