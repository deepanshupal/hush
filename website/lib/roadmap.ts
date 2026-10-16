/**
 * The public roadmap on /roadmap. The comparison table labels Hush's planned
 * features with the same stages (see `planned` in lib/comparison-data.ts), so
 * a "Coming in 1.1" pill there always matches a "Shipping in 1.1" item here.
 */

export type RoadmapStage = "1.1" | "next" | "later"

export type RoadmapItem = { title: string; description: string }

export const ROADMAP_STAGES: Record<
  RoadmapStage,
  { title: string; lead: string; pill: string; items: RoadmapItem[] }
> = {
  "1.1": {
    title: "Shipped in 1.1",
    lead: "Out now. Download the latest version to get them.",
    pill: "New in 1.1",
    items: [
      {
        title: "Double-tap for hands-free",
        description: "Double-tap your shortcut to keep listening without holding a key, even in Hold mode.",
      },
      {
        title: "Paste the last transcript",
        description: "Ctrl+Cmd+V pastes your last dictation again, in case it landed in the wrong place. Also in the menu bar.",
      },
      {
        title: "Pause music while you dictate",
        description: "Music and videos pause while Hush is listening, then carry on. Or lower the volume, or mute.",
      },
      { title: "Simpler settings", description: "Everyday options up front, power-user controls tucked into Advanced, and a one-click Fast / Live / Accurate model choice." },
    ],
  },
  next: {
    title: "Next",
    lead: "What we're working on after 1.1.",
    pill: "Coming next",
    items: [
      {
        title: "Edit selected text by voice",
        description: "Select some text and say “make this shorter” or “more formal”.",
      },
      {
        title: "Context from around your cursor",
        description: "Hush reads the text near your cursor to get names and spelling right.",
      },
      {
        title: "Styles per website",
        description: "Different clean-up styles for Gmail, Slack, GitHub and other sites, not just per app.",
      },
      {
        title: "A dictionary that learns",
        description: "When you fix a word Hush got wrong, it remembers the correction for next time.",
      },
      {
        title: "A guided first dictation",
        description: "A short walkthrough that takes you through your first dictation.",
      },
    ],
  },
  later: {
    title: "Later",
    lead: "On the list, without a date yet.",
    pill: "Coming later",
    items: [
      { title: "Transcribe audio and video files", description: "Drop in a recording and get a transcript, on your Mac." },
      { title: "Intel Macs", description: "Support for Macs without Apple Silicon." },
      {
        title: "Automatic updates",
        description: "New versions download from GitHub Releases and install themselves.",
      },
      { title: "Windows", description: "Hush on Windows PCs." },
    ],
  },
}

export const ROADMAP_ORDER: RoadmapStage[] = ["1.1", "next", "later"]
