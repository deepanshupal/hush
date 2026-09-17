import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hush terms",
  description:
    "The terms for using Hush.",
}

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
            <div
              className="py-1 transition-colors px-2 h-5 rounded-md flex items-center gap-1 font-medium text-[11px]"
              style={{ background: "#D4CCB8", color: "#5A5040" }}
            >
              Legal
            </div>
            <h1 className="text-2xl font-medium tracking-tight" style={{ color: "#1A1410" }}>
              Terms of Service
            </h1>
            <p className="text-sm max-w-md leading-relaxed" style={{ color: "#5A5040" }}>
              Please read these terms carefully before using Hush.
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <div className="p-8 opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "100ms", borderTop: "1px solid #C4BCA8" }}>
              <h2 className="text-base font-medium mb-4" style={{ color: "#1A1410" }}>Acceptance of Terms</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#5A5040" }}>
                By downloading, installing, or using Hush, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the app.
              </p>
            </div>

            <div className="p-8 opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "150ms", borderTop: "1px solid #C4BCA8" }}>
              <h2 className="text-base font-medium mb-4" style={{ color: "#1A1410" }}>Description of Service</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#5A5040" }}>
                Hush is a local voice-to-text application for macOS that allows you to:
              </p>
              <ul className="space-y-2 text-sm" style={{ color: "#5A5040" }}>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>Transcribe speech to text using on-device AI</li>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>Insert transcribed text into any application</li>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>Save and manage voice snippets and transcription history</li>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>Optionally polish transcriptions using your own AI provider API key</li>
              </ul>
            </div>

            <div className="p-8 opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "200ms", borderTop: "1px solid #C4BCA8" }}>
              <h2 className="text-base font-medium mb-4" style={{ color: "#1A1410" }}>User Responsibilities</h2>
              <ul className="space-y-2 text-sm" style={{ color: "#5A5040" }}>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>Keeping your API keys secure and confidential</li>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>Complying with the terms of service of any AI provider you use</li>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>The content you process through the app</li>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>Any costs incurred from third-party AI provider usage</li>
              </ul>
            </div>

            <div className="p-8 opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "250ms", borderTop: "1px solid #C4BCA8" }}>
              <h2 className="text-base font-medium mb-4" style={{ color: "#1A1410" }}>Intellectual Property</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#5A5040" }}>
                Hush and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            <div className="p-8 opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "300ms", borderTop: "1px solid #C4BCA8" }}>
              <h2 className="text-base font-medium mb-4" style={{ color: "#1A1410" }}>Disclaimer</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#5A5040" }}>
                Hush is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that:
              </p>
              <ul className="space-y-2 text-sm" style={{ color: "#5A5040" }}>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>The app will be error-free or uninterrupted</li>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>Transcriptions will be 100% accurate</li>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>The app is suitable for any particular purpose</li>
              </ul>
            </div>

            <div className="p-8 opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "350ms", borderTop: "1px solid #C4BCA8" }}>
              <h2 className="text-base font-medium mb-4" style={{ color: "#1A1410" }}>Limitation of Liability</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#5A5040" }}>
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of Hush.
              </p>
            </div>

            <div className="p-8 opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "400ms", borderTop: "1px solid #C4BCA8" }}>
              <h2 className="text-base font-medium mb-4" style={{ color: "#1A1410" }}>Changes to Terms</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#5A5040" }}>
                We reserve the right to modify these terms at any time. Continued use of the app after changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div className="p-8 opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "450ms", borderTop: "1px solid #C4BCA8" }}>
              <h2 className="text-base font-medium mb-4" style={{ color: "#1A1410" }}>Contact</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#5A5040" }}>
                For questions about these Terms of Service, contact us at{" "}
                <a href="mailto:hi@hush.software" className="hover:underline" style={{ color: "#8B3030" }}>
                  hi@hush.software
                </a>
              </p>
            </div>
          </div>

          {/* Last updated */}
          <div
            className="p-8 text-sm leading-6 opacity-0 animate-blur-fade-slide-in"
            style={{ animationDelay: "500ms", borderTop: "1px solid #C4BCA8", color: "#8B7860" }}
          >
            Last updated: March 2026
          </div>
        </div>
      </MainContainer>
      <Footer />
    </>
  )
}
