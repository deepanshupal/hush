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
    title: "Hush — Initial Release",
    changes: [
      { type: "new", text: "Local voice-to-text transcription using on-device AI" },
      { type: "new", text: "Press Fn to record, release to transcribe" },
      { type: "new", text: "Text appears wherever your cursor is" },
      { type: "new", text: "Voice Snippets — save and reuse frequent phrases" },
      { type: "new", text: "Transcription History — browse and search past dictations" },
      { type: "new", text: "AI Polish with Groq (BYOK) — clean up grammar and punctuation" },
      { type: "new", text: "Per-App Tone — different writing styles for different apps" },
      { type: "new", text: "Native macOS menu bar app" },
    ],
  },
]

function getTypeStyles(type: ChangeItem["type"]) {
  switch (type) {
    case "new":
      return "bg-emerald-500/15 text-emerald-400"
    case "improved":
      return "bg-blue-500/15 text-blue-400"
    case "fixed":
      return "bg-amber-500/15 text-amber-400"
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
            <div className="opacity-90 hover:opacity-100 py-1 transition-colors bg-white/[0.08] text-foreground/70 px-2 h-5 rounded-md flex items-center gap-1 font-medium text-[11px]">
              What&apos;s New
            </div>
            <h1 className="text-2xl font-medium tracking-tight text-foreground">
              Updates
            </h1>
            <p className="text-foreground/50 text-sm max-w-md leading-relaxed">
              Stay up to date with the latest features, improvements, and bug fixes in Hush.
            </p>
          </div>

          {/* Version Entries */}
          <div className="flex flex-col">
            {versions.map((version, versionIndex) => (
              <div
                key={version.version}
                className="p-8 border-t border-white/[0.06] opacity-0 animate-blur-fade-slide-in"
                style={{ animationDelay: `${100 + versionIndex * 50}ms` }}
              >
                {/* Version Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-white/[0.08] text-foreground/70 px-2 py-0.5 rounded-md text-xs font-medium">
                    v{version.version}
                  </span>
                  <span className="text-foreground/35 text-xs">
                    {version.date}
                  </span>
                </div>

                {/* Version Title */}
                <h2 className="text-base font-medium text-foreground mb-4">
                  {version.title}
                </h2>

                {/* Changes List */}
                <ul className="space-y-2">
                  {version.changes.map((change, changeIndex) => (
                    <li
                      key={changeIndex}
                      className="flex items-start gap-3 text-sm text-foreground/55"
                    >
                      <span
                        className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium ${getTypeStyles(
                          change.type
                        )}`}
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
            className="p-8 border-t border-white/[0.06] opacity-0 animate-blur-fade-slide-in"
            style={{ animationDelay: `${100 + versions.length * 50 + 50}ms` }}
          >
            <div className="text-center">
              <p className="text-sm text-foreground/35">
                Questions or feedback?{" "}
                <a
                  href="mailto:hi@hush.software"
                  className="text-foreground/55 hover:underline"
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
