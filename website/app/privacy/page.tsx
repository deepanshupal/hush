import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MainContainer } from "@/components/main-container"

export default function PrivacyPage() {
  return (
    <>
      <MainContainer>
        <Header />
        <div className="relative flex flex-col min-h-[80dvh]">
          {/* Header */}
          <div className="flex flex-col gap-4 p-8 pt-12 pb-10 items-center text-center opacity-0 animate-blur-fade-slide-in">
            <div className="opacity-90 hover:opacity-100 py-1 transition-colors bg-white/[0.08] text-foreground/70 px-2 h-5 rounded-md flex items-center gap-1 font-medium text-[11px]">
              Legal
            </div>
            <h1 className="text-2xl font-medium tracking-tight text-foreground">
              Privacy Policy
            </h1>
            <p className="text-foreground/50 text-sm max-w-md leading-relaxed">
              At Hush, your privacy is not a feature — it&apos;s the foundation. This Privacy Policy explains how we handle your information.
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            {/* Information We Collect */}
            <div
              className="p-8 border-t border-white/[0.06] opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "100ms" }}
            >
              <h2 className="text-base font-medium text-foreground mb-4">
                Information We Collect
              </h2>
              <p className="text-sm text-foreground/55 leading-relaxed mb-4">
                Hush is designed to collect nothing. Everything runs on your device:
              </p>
              <ul className="space-y-2 text-sm text-foreground/55">
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  <span><strong className="text-foreground/80">Audio Data:</strong> Your voice audio is processed entirely on your Mac using on-device AI. It is never recorded, stored, or transmitted.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  <span><strong className="text-foreground/80">Transcriptions:</strong> Your transcription history is stored locally on your device.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  <span><strong className="text-foreground/80">API Keys:</strong> If you use the AI Polish feature with your own Groq API key, it is stored securely on your device and never transmitted to our servers.</span>
                </li>
              </ul>
            </div>

            {/* Data Storage */}
            <div
              className="p-8 border-t border-white/[0.06] opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "150ms" }}
            >
              <h2 className="text-base font-medium text-foreground mb-4">
                Data Storage
              </h2>
              <p className="text-sm text-foreground/55 leading-relaxed mb-4">
                All data is stored locally on your Mac using secure storage mechanisms. We do not operate any servers that receive or store your data.
              </p>
              <p className="text-sm text-foreground/55 leading-relaxed">
                We have no access to your audio, transcriptions, or API keys. Your voice never leaves your device.
              </p>
            </div>

            {/* Third-Party Services */}
            <div
              className="p-8 border-t border-white/[0.06] opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "200ms" }}
            >
              <h2 className="text-base font-medium text-foreground mb-4">
                Third-Party Services
              </h2>
              <p className="text-sm text-foreground/55 leading-relaxed mb-4">
                Hush may interact with the following third-party services only when you explicitly enable them:
              </p>
              <ul className="space-y-2 text-sm text-foreground/55">
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  <span><strong className="text-foreground/80">Groq API:</strong> If you enable AI Polish and provide your own API key, polished text is sent to Groq for processing according to their privacy policy.</span>
                </li>
              </ul>
            </div>

            {/* Data Security */}
            <div
              className="p-8 border-t border-white/[0.06] opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "250ms" }}
            >
              <h2 className="text-base font-medium text-foreground mb-4">
                Data Security
              </h2>
              <ul className="space-y-2 text-sm text-foreground/55">
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  All data is stored using macOS secure storage mechanisms
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  API keys are stored in macOS Keychain
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  No analytics, no tracking, no telemetry
                </li>
              </ul>
            </div>

            {/* Your Rights */}
            <div
              className="p-8 border-t border-white/[0.06] opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "300ms" }}
            >
              <h2 className="text-base font-medium text-foreground mb-4">
                Your Rights
              </h2>
              <ul className="space-y-2 text-sm text-foreground/55">
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  Delete all your data by uninstalling the app
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  Clear transcription history at any time from the app
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  Remove API keys at any time
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div
              className="p-8 border-t border-white/[0.06] opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "350ms" }}
            >
              <h2 className="text-base font-medium text-foreground mb-4">
                Contact Us
              </h2>
              <p className="text-sm text-foreground/55 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a
                  href="mailto:hi@hush.software"
                  className="text-foreground/70 hover:underline"
                >
                  hi@hush.software
                </a>
              </p>
            </div>
          </div>

          {/* Last updated */}
          <div
            className="p-8 text-sm text-foreground/35 leading-6 opacity-0 border-t border-white/[0.06] animate-blur-fade-slide-in"
            style={{ animationDelay: "400ms" }}
          >
            Last updated: March 2026
          </div>
        </div>
      </MainContainer>
      <Footer />
    </>
  )
}
