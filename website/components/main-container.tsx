"use client"

export function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start pt-12 pb-4 px-4">
      <div className="min-h-0 w-full animate-slide-in-from-bottom">
        <div
          className="max-w-[52rem] w-full mx-auto rounded-2xl overflow-hidden"
          style={{
            background: "#F0EBE0",
            border: "1px solid #C4BCA8",
            boxShadow: "0 8px 24px -4px rgba(26,20,16,0.12), 0 16px 40px -8px rgba(26,20,16,0.08)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
