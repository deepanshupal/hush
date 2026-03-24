"use client"

export function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start pt-12 pb-4 px-4">
      <div className="min-h-0 w-full animate-slide-in-from-bottom">
        <div className="max-w-[52rem] w-full mx-auto bg-[#161616] rounded-2xl shadow-[0_8px_24px_-4px_rgba(0,0,0,0.4),0_16px_40px_-8px_rgba(0,0,0,0.3)] ring-1 ring-white/[0.06] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
