import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MainContainer } from "@/components/main-container"

interface ChangeItem {
  type: "new" | "improved" | "fixed"
  text: string
}

interface VersionEntry {
  version: string
  date: string
  title: string
  changes: ChangeItem[]
}

const versions: VersionEntry[] = [
  {
    version: "0.7.9",
    date: "March 2026",
    title: "First release.",
    changes: [
      { type: "new", text: "Voice-to-text that runs entirely on your Mac" },
      { type: "new", text: "Hold Fn to record. Let go to transcribe." },
      { type: "new", text: "Text goes wherever your cursor is. Every app." },
      { type: "new", text: "Snippets — phrases you say often, saved and ready" },
      { type: "new", text: "History — everything you\u2019ve transcribed, searchable" },
      { type: "new", text: "AI Polish — Groq fixes grammar as you go. Your key." },
      { type: "new", text: "Per-App Tone — Hush writes differently in Mail than Slack" },
      { type: "new", text: "Lives in the menu bar. Out of the way until you need it." },
    ],
  },
]

function getTypeStyles(type: ChangeItem["type"]) {
  switch (type) {
    case "new":
      return { background: "#8B3030", color: "#F7F2EA" }
    case "improved":
      return { background: "#DCE8F0", color: "#305080" }
    case "fixed":
      return { background: "#F0ECDC", color: "#806030" }
  }
}

function getTypeLabel(type: ChangeItem["type"]) {
  switch (type) {
    case "new":
      return "New"
    case "improved":
      return "Improved"
    case "fixed":
      return "Fixed"
  }
}

export default function ChangelogsPage() {
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
              What&apos;s New
            </div>
            <h1 className="text-2xl font-medium tracking-tight" style={{ color: "#1A1410" }}>
              Updates
            </h1>
            <p className="text-sm max-w-md leading-relaxed" style={{ color: "#5A5040" }}>
              What&apos;s changed, what&apos;s fixed, what&apos;s next.
            </p>
          </div>

          {/* Version Entries */}
          <div className="flex flex-col">
            {versions.map((version, versionIndex) => (
              <div
                key={version.version}
                className="p-8 opacity-0 animate-blur-fade-slide-in"
                style={{
                  animationDelay: `${100 + versionIndex * 50}ms`,
                  borderTop: "1px solid #C4BCA8",
                }}
              >
                {/* Version Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="px-2 py-0.5 rounded-md text-xs font-medium"
                    style={{ background: "#D4CCB8", color: "#5A5040" }}
                  >
                    v{version.version}
                  </span>
                  <span className="text-xs" style={{ color: "#8B7860" }}>
                    {version.date}
                  </span>
                </div>

                {/* Version Title */}
                <h2 className="text-base font-medium mb-4" style={{ color: "#1A1410" }}>
                  {version.title}
                </h2>

                {/* Changes List */}
                <ul className="space-y-2">
                  {version.changes.map((change, changeIndex) => (
                    <li
                      key={changeIndex}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: "#5A5040" }}
                    >
                      <span
                        className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium"
                        style={getTypeStyles(change.type)}
                      >
                        {getTypeLabel(change.type)}
                      </span>
                      <span className="leading-relaxed">{change.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div
            className="p-8 opacity-0 animate-blur-fade-slide-in"
            style={{
              animationDelay: `${100 + versions.length * 50 + 50}ms`,
              borderTop: "1px solid #C4BCA8",
            }}
          >
            <div className="text-center">
              <p className="text-sm" style={{ color: "#8B7860" }}>
                Questions or thoughts?{" "}
                <a
                  href="mailto:hi@hush.software"
                  className="hover:underline"
                  style={{ color: "#8B3030" }}
                >
                  hi@hush.software
                </a>
              </p>
            </div>
          </div>
        </div>
      </MainContainer>
      <Footer />
    </>
  )
}
