import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MainContainer } from "@/components/main-container"

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-foreground/50 text-sm max-w-md leading-relaxed">
              Please read these terms carefully before using Hush.
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            {/* Acceptance of Terms */}
            <div
              className="p-8 border-t border-white/[0.06] opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "100ms" }}
            >
              <h2 className="text-base font-medium text-foreground mb-4">
                Acceptance of Terms
              </h2>
              <p className="text-sm text-foreground/55 leading-relaxed">
                By downloading, installing, or using Hush, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the app.
              </p>
            </div>

            {/* Description of Service */}
            <div
              className="p-8 border-t border-white/[0.06] opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "150ms" }}
            >
              <h2 className="text-base font-medium text-foreground mb-4">
                Description of Service
              </h2>
              <p className="text-sm text-foreground/55 leading-relaxed mb-4">
                Hush is a local voice-to-text application for macOS that allows you to:
              </p>
              <ul className="space-y-2 text-sm text-foreground/55">
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  Transcribe speech to text using on-device AI
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  Insert transcribed text into any application
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  Save and manage voice snippets and transcription history
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  Optionally polish transcriptions using your own AI provider API key
                </li>
              </ul>
            </div>

            {/* User Responsibilities */}
            <div
              className="p-8 border-t border-white/[0.06] opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "200ms" }}
            >
              <h2 className="text-base font-medium text-foreground mb-4">
                User Responsibilities
              </h2>
              <ul className="space-y-2 text-sm text-foreground/55">
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  Keeping your API keys secure and confidential
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  Complying with the terms of service of any AI provider you use
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  The content you process through the app
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  Any costs incurred from third-party AI provider usage
                </li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div
              className="p-8 border-t border-white/[0.06] opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "250ms" }}
            >
              <h2 className="text-base font-medium text-foreground mb-4">
                Intellectual Property
              </h2>
              <p className="text-sm text-foreground/55 leading-relaxed">
                Hush and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            {/* Disclaimer */}
            <div
              className="p-8 border-t border-white/[0.06] opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "300ms" }}
            >
              <h2 className="text-base font-medium text-foreground mb-4">
                Disclaimer
              </h2>
              <p className="text-sm text-foreground/55 leading-relaxed mb-4">
                Hush is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that:
              </p>
              <ul className="space-y-2 text-sm text-foreground/55">
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  The app will be error-free or uninterrupted
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  Transcriptions will be 100% accurate
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/25">•</span>
                  The app is suitable for any particular purpose
                </li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div
              className="p-8 border-t border-white/[0.06] opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "350ms" }}
            >
              <h2 className="text-base font-medium text-foreground mb-4">
                Limitation of Liability
              </h2>
              <p className="text-sm text-foreground/55 leading-relaxed">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of Hush.
              </p>
            </div>

            {/* Changes to Terms */}
            <div
              className="p-8 border-t border-white/[0.06] opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "400ms" }}
            >
              <h2 className="text-base font-medium text-foreground mb-4">
                Changes to Terms
              </h2>
              <p className="text-sm text-foreground/55 leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the app after changes constitutes acceptance of the new terms.
              </p>
            </div>

            {/* Contact */}
            <div
              className="p-8 border-t border-white/[0.06] opacity-0 animate-blur-fade-slide-in"
              style={{ animationDelay: "450ms" }}
            >
              <h2 className="text-base font-medium text-foreground mb-4">
                Contact
              </h2>
              <p className="text-sm text-foreground/55 leading-relaxed">
                For questions about these Terms of Service, contact us at{" "}
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
            style={{ animationDelay: "500ms" }}
          >
            Last updated: March 2026
          </div>
        </div>
      </MainContainer>
      <Footer />
    </>
  )
}
