import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MainContainer } from "@/components/main-container"

export default function WhyPage() {
  return (
    <>
      <MainContainer>
        <Header />
        <div className="flex flex-col min-h-[60dvh] max-w-[620px] mx-auto px-8" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={{ color: "#5A5040" }}>
            <h2
              className="font-medium opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.05s", color: "#1A1410", fontSize: "28px", marginBottom: "32px" }}
            >
              Why we built this
            </h2>
            <p
              className="mb-6 opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.1s", fontSize: "17px", lineHeight: 1.85 }}
            >
              Voice is faster than typing. Everyone knows this.
              Most people just accept the tradeoff.
            </p>
            <p
              className="mb-6 opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.15s", fontSize: "17px", lineHeight: 1.85 }}
            >
              We didn&apos;t want to.
            </p>
            <p
              className="mb-6 opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.2s", fontSize: "17px", lineHeight: 1.85 }}
            >
              Every tool we tried sent your audio somewhere. A server in
              Virginia. A cloud in Oregon. Some infrastructure you&apos;ll never
              see, owned by a company with different priorities than yours.
            </p>
            <p
              className="mb-6 opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.25s", fontSize: "17px", lineHeight: 1.85 }}
            >
              Your voice is personal. More personal than your emails.
              More personal than your texts. You shouldn&apos;t have to hand
              it over just to use it.
            </p>
            <p
              className="mb-6 opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.3s", fontSize: "17px", lineHeight: 1.85 }}
            >
              On-device AI made it so you don&apos;t have to anymore. The
              models got good enough. The hardware got fast enough.
              The excuse to use the cloud ran out.
            </p>
            <p
              className="mb-6 opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.35s", fontSize: "17px", lineHeight: 1.85 }}
            >
              So we built Hush.
            </p>
            <p
              className="mb-6 opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.4s", fontSize: "17px", lineHeight: 1.85 }}
            >
              Hold a key. Speak. Let go. Your words appear — right where
              your cursor is, in whatever app you&apos;re using. Nothing is
              recorded remotely. Nothing is sent anywhere. Nothing leaves
              your Mac.
            </p>
            <p
              className="opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.45s", fontSize: "17px", lineHeight: 1.85 }}
            >
              It&apos;s not a technical achievement. It&apos;s just the right way
              to do it. It should have worked this way from the start.
            </p>
            <div
              className="opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.5s", borderTop: "1px solid #C4BCA8", marginTop: "48px", paddingTop: "32px" }}
            >
              <p className="font-medium mb-0" style={{ color: "#1A1410" }}>Deepanshu</p>
              <p className="text-xs mt-1 mb-0" style={{ color: "#8B7860" }}>Founder, Hush</p>
            </div>
          </div>
        </div>
      </MainContainer>
      <Footer />
    </>
  )
}
