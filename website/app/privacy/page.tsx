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
            <div
              className="py-1 transition-colors px-2 h-5 rounded-md flex items-center gap-1 font-medium text-[11px]"
              style={{ background: "#D4CCB8", color: "#5A5040" }}
            >
              Legal
            </div>
            <h1 className="text-2xl font-medium tracking-tight" style={{ color: "#1A1410" }}>
              Privacy Policy
            </h1>
            <p className="text-sm max-w-md leading-relaxed" style={{ color: "#5A5040" }}>
              At Hush, your privacy is not a feature — it&apos;s the foundation. This Privacy Policy explains how we handle your information.
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <div className="p-8 opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "100ms", borderTop: "1px solid #C4BCA8" }}>
              <h2 className="text-base font-medium mb-4" style={{ color: "#1A1410" }}>Information We Collect</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#5A5040" }}>
                Hush is designed to collect nothing. Everything runs on your device:
              </p>
              <ul className="space-y-2 text-sm" style={{ color: "#5A5040" }}>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span><span><strong style={{ color: "#1A1410" }}>Audio Data:</strong> Your voice audio is processed entirely on your Mac using on-device AI. It is never recorded, stored, or transmitted.</span></li>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span><span><strong style={{ color: "#1A1410" }}>Transcriptions:</strong> Your transcription history is stored locally on your device.</span></li>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span><span><strong style={{ color: "#1A1410" }}>API Keys:</strong> If you use the AI Polish feature with your own Groq API key, it is stored securely on your device and never transmitted to our servers.</span></li>
              </ul>
            </div>

            <div className="p-8 opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "150ms", borderTop: "1px solid #C4BCA8" }}>
              <h2 className="text-base font-medium mb-4" style={{ color: "#1A1410" }}>Data Storage</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#5A5040" }}>
                All data is stored locally on your Mac using secure storage mechanisms. We do not operate any servers that receive or store your data.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#5A5040" }}>
                We have no access to your audio, transcriptions, or API keys. Your voice never leaves your device.
              </p>
            </div>

            <div className="p-8 opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "200ms", borderTop: "1px solid #C4BCA8" }}>
              <h2 className="text-base font-medium mb-4" style={{ color: "#1A1410" }}>Third-Party Services</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#5A5040" }}>
                Hush may interact with the following third-party services only when you explicitly enable them:
              </p>
              <ul className="space-y-2 text-sm" style={{ color: "#5A5040" }}>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span><span><strong style={{ color: "#1A1410" }}>Groq API:</strong> If you enable AI Polish and provide your own API key, polished text is sent to Groq for processing according to their privacy policy.</span></li>
              </ul>
            </div>

            <div className="p-8 opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "250ms", borderTop: "1px solid #C4BCA8" }}>
              <h2 className="text-base font-medium mb-4" style={{ color: "#1A1410" }}>Data Security</h2>
              <ul className="space-y-2 text-sm" style={{ color: "#5A5040" }}>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>All data is stored using macOS secure storage mechanisms</li>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>API keys are stored in macOS Keychain</li>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>No analytics, no tracking, no telemetry</li>
              </ul>
            </div>

            <div className="p-8 opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "300ms", borderTop: "1px solid #C4BCA8" }}>
              <h2 className="text-base font-medium mb-4" style={{ color: "#1A1410" }}>Your Rights</h2>
              <ul className="space-y-2 text-sm" style={{ color: "#5A5040" }}>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>Delete all your data by uninstalling the app</li>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>Clear transcription history at any time from the app</li>
                <li className="flex items-start gap-2"><span style={{ color: "#C4BCA8" }}>•</span>Remove API keys at any time</li>
              </ul>
            </div>

            <div className="p-8 opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "350ms", borderTop: "1px solid #C4BCA8" }}>
              <h2 className="text-base font-medium mb-4" style={{ color: "#1A1410" }}>Contact Us</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#5A5040" }}>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:hi@hush.software" className="hover:underline" style={{ color: "#8B3030" }}>
                  hi@hush.software
                </a>
              </p>
            </div>
          </div>

          {/* Last updated */}
          <div
            className="p-8 text-sm leading-6 opacity-0 animate-blur-fade-slide-in"
            style={{ animationDelay: "400ms", borderTop: "1px solid #C4BCA8", color: "#8B7860" }}
          >
            Last updated: March 2026
          </div>
        </div>
      </MainContainer>
      <Footer />
    </>
  )
}
