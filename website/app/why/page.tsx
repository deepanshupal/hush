import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MainContainer } from "@/components/main-container"

export default function WhyPage() {
  return (
    <>
      <MainContainer>
        <Header />
        <div className="flex py-32 flex-col min-h-[60dvh] gap-8 max-w-xl mx-auto px-8">
          <div className="prose prose-sm text-foreground/55">
            <h2
              className="text-lg font-medium text-foreground opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.05s" }}
            >
              The idea behind Hush
            </h2>
            <p
              className="opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.1s" }}
            >
              I talk faster than I type. Most people do. But every voice-to-text
              tool I tried sent my audio to someone else&apos;s server. That felt
              wrong for something as personal as my voice.
            </p>
            <p
              className="opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.2s" }}
            >
              With on-device AI models getting good enough to run locally, there
              was no reason voice transcription still needed the cloud. So I
              built Hush.
            </p>
            <p
              className="opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.3s" }}
            >
              Hush is a native Mac app that lives in your menu bar. Press Fn,
              speak, and your words appear as text wherever your cursor is. No
              cloud. No account. No subscription.
            </p>
            <p
              className="opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.4s" }}
            >
              Everything runs on your machine using on-device AI. Your audio
              never leaves your Mac. It&apos;s that simple.
            </p>
            <p
              className="opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.5s" }}
            >
              I wanted something that felt invisible — like a superpower that
              just works. Hold a key, speak naturally, and text appears. That&apos;s
              Hush.
            </p>
            <div
              className="pt-4 border-t border-white/[0.06] mt-8 opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "0.6s" }}
            >
              <p className="font-medium text-foreground mb-0">Deepanshu</p>
              <p className="text-xs mt-1 mb-0">Building Hush</p>
            </div>
          </div>
        </div>
      </MainContainer>
      <Footer />
    </>
  )
}
