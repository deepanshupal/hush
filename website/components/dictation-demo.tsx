"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { DemoDock, type DockApp } from "@/components/demo-dock"
import { cn } from "@/lib/utils"

/**
 * Animated hero demo: Fn is held, the Hush pill shows the live transcript
 * (fillers, self-corrections and all), Fn is released and the cleaned text
 * lands in the app. Cycles through three apps and styles, and the dock along
 * the bottom switches apps with it. With reduced motion it shows the finished
 * first scene and doesn't animate.
 */

type Scene = {
  app: string
  /** Which dock icon is "running" for this scene. */
  dock: DockApp
  title: string
  style: string
  /** What the person actually said, word by word, as the live preview shows it. */
  spoken: string
  /** What Hush pastes after clean-up. */
  result: string
  context: { from: string; text: string }[]
  placeholder: string
  mono?: boolean
}

const SCENES: Scene[] = [
  {
    app: "Chat",
    dock: "chat",
    title: "#launch",
    style: "Message",
    spoken: "um can we move the review to wednesday no wait thursday the build isn't ready yet",
    result: "Can we move the review to Thursday? The build isn't ready yet.",
    context: [{ from: "Priya", text: "Review is still on for Wednesday at 3?" }],
    placeholder: "Message #launch",
  },
  {
    app: "Mail",
    dock: "mail",
    title: "Re: Q4 deck",
    style: "Email",
    spoken: "hi priya thanks for sending the deck uh I'll go through it tonight and send notes by ten tomorrow",
    result:
      "Hi Priya,\n\nThanks for sending the deck. I'll go through it tonight and send notes by 10 a.m. tomorrow.",
    context: [{ from: "Priya", text: "Here's the Q4 deck, would love your notes." }],
    placeholder: "Write your reply",
  },
  {
    app: "AI chat",
    dock: "ai",
    title: "New prompt",
    style: "Code",
    spoken: "refactor the use auth hook so it caches the session token and add a test for when it expires",
    result: "Refactor the useAuth hook so it caches the session token, and add a test for when it expires.",
    context: [],
    placeholder: "Ask anything",
    mono: true,
  },
]

type Phase = "idle" | "listening" | "cleaning" | "pasted"

const WORD_MS = 210
const CLEAN_MS = 650
const HOLD_MS = 2600
const IDLE_MS = 700

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

export function DictationDemo() {
  // The server renders the finished, still frame; the client animates unless
  // the person has asked for reduced motion.
  const animate = useSyncExternalStore(
    subscribeToMotion,
    () => !window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  )
  return <Demo key={animate ? "animated" : "still"} animate={animate} />
}

function Demo({ animate }: { animate: boolean }) {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>(animate ? "idle" : "pasted")
  const [wordCount, setWordCount] = useState(0)
  const [typed, setTyped] = useState(animate ? 0 : SCENES[0].result.length)

  const scene = SCENES[sceneIndex]
  const words = scene.spoken.split(" ")

  // Drive the phases with one timer per step.
  useEffect(() => {
    if (!animate) return
    let timer: ReturnType<typeof setTimeout>

    if (phase === "idle") {
      timer = setTimeout(() => {
        setWordCount(0)
        setTyped(0)
        setPhase("listening")
      }, IDLE_MS)
    } else if (phase === "listening") {
      timer =
        wordCount < words.length
          ? setTimeout(() => setWordCount((n) => n + 1), WORD_MS)
          : setTimeout(() => setPhase("cleaning"), 350)
    } else if (phase === "cleaning") {
      timer = setTimeout(() => setPhase("pasted"), CLEAN_MS)
    } else if (typed < scene.result.length) {
      // Paste is near-instant in the app; type quickly so the eye can follow it.
      timer = setTimeout(() => setTyped((n) => Math.min(n + 3, scene.result.length)), 12)
    } else {
      timer = setTimeout(() => {
        setSceneIndex((i) => (i + 1) % SCENES.length)
        setPhase("idle")
      }, HOLD_MS)
    }
    return () => clearTimeout(timer)
  }, [animate, phase, wordCount, typed, words.length, scene.result.length])

  const keyDown = phase === "listening"
  // Show only the latest words, like the live preview in the app.
  const LIVE_WORDS = 6
  const liveText =
    (wordCount > LIVE_WORDS ? "… " : "") +
    words.slice(Math.max(0, wordCount - LIVE_WORDS), wordCount).join(" ")

  return (
    <div className="px-4 sm:px-8">
      <figure
        className="animate-enter relative overflow-hidden rounded-panel bg-accent shadow-panel [animation-delay:400ms]"
        aria-label="Hush demo: hold Fn, speak, and cleaned-up text appears in the app you're using"
      >
        {/* Dotted texture, matching the page background. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(var(--color-accent-ink)_0.0625rem,transparent_0.0625rem)] [background-size:1.125rem_1.125rem]"
        />

        <div className="relative flex flex-col items-center gap-5 px-4 pb-3 pt-8 sm:px-10 sm:pb-4 sm:pt-10">
          {/* App window */}
          <div className="w-full max-w-[34rem] overflow-hidden rounded-panel border border-line bg-surface-raised text-left shadow-card">
            <div className="flex items-center gap-2 border-b border-line bg-surface px-3.5 py-2.5">
              <span aria-hidden className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
              </span>
              <span className="ml-2 truncate text-caption font-medium text-ink-muted">
                {scene.app} · {scene.title}
              </span>
              <span className="ml-auto shrink-0 rounded-control bg-accent-soft px-2 py-0.5 text-caption font-medium text-accent">
                Style: {scene.style}
              </span>
            </div>

            {/* Every scene is laid out invisibly in the same grid cell, so the window is
                always as tall as the tallest scene and cycling never shifts the page. */}
            <div className="grid">
              {SCENES.map((s) => (
                <SceneBody key={s.app} scene={s} className="invisible [grid-area:1/1]" aria-hidden>
                  {s.result}
                </SceneBody>
              ))}
              <SceneBody scene={scene} className="[grid-area:1/1]">
                {scene.result.slice(0, typed)}
                {phase !== "pasted" || typed < scene.result.length ? (
                  <span aria-hidden className="ml-px inline-block h-4 w-px translate-y-0.5 animate-pulse bg-ink" />
                ) : null}
                {typed === 0 && phase !== "pasted" && (
                  <span className="text-ink-subtle">{scene.placeholder}</span>
                )}
              </SceneBody>
            </div>
          </div>

          {/* Fn key + Hush pill */}
          <div className="flex w-full max-w-[34rem] items-center justify-center gap-3">
            <span
              aria-hidden
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-[0.625rem] border border-line bg-surface-raised font-medium text-ink shadow-button-secondary transition-transform duration-150",
                keyDown && "translate-y-0.5 bg-surface-muted shadow-none",
              )}
            >
              fn
            </span>
            <div
              className={cn(
                "flex h-11 min-w-0 flex-1 items-center gap-3 rounded-control px-4 transition-colors duration-200 sm:w-[24rem] sm:flex-none",
                phase === "listening" || phase === "cleaning"
                  ? "bg-ink text-surface"
                  : "border border-line bg-surface-raised text-ink-muted",
              )}
            >
              <Waveform active={phase === "listening"} idle={phase === "idle" || phase === "pasted"} />
              <span className="min-w-0 flex-1 truncate text-small">
                {phase === "cleaning"
                  ? "Cleaning up…"
                  : phase === "listening"
                    ? liveText || "Listening…"
                    : phase === "pasted" && typed >= scene.result.length
                      ? `Pasted into ${scene.app}`
                      : "Hold fn and talk"}
              </span>
            </div>
          </div>
          <div className="mt-1 w-full sm:mt-2">
            <DemoDock active={scene.dock} bounceKey={animate ? sceneIndex : -1} />
          </div>
          <figcaption className="sr-only">
            You say: “{scene.spoken}”. Hush pastes: “{scene.result}”.
          </figcaption>
        </div>
      </figure>
    </div>
  )
}

/** The app window's content: the conversation so far and the text field Hush pastes into. */
function SceneBody({
  scene,
  className,
  children,
  ...props
}: { scene: Scene; className?: string; children: React.ReactNode } & React.AriaAttributes) {
  return (
    <div className={cn("flex min-h-[11.5rem] flex-col gap-3 p-4 sm:min-h-[12.5rem]", className)} {...props}>
      {scene.context.map((m) => (
        <div key={m.text} className="max-w-[85%] rounded-panel bg-surface-muted px-3 py-2">
          <p className="text-caption font-medium text-ink-subtle">{m.from}</p>
          <p className="text-small text-ink">{m.text}</p>
        </div>
      ))}
      <div
        className={cn(
          "mt-auto min-h-[4.5rem] whitespace-pre-line rounded-panel border border-line bg-surface px-3 py-2.5 text-small text-ink",
          scene.mono && "font-mono text-[0.8125rem]",
        )}
      >
        {children}
      </div>
    </div>
  )
}

function Waveform({ active, idle }: { active: boolean; idle: boolean }) {
  return (
    <span aria-hidden className="flex h-4 shrink-0 items-center gap-[0.1875rem]">
      {[0.5, 0.9, 0.6, 1, 0.7].map((h, i) => (
        <span
          key={i}
          className={cn("w-[0.1875rem] rounded-full", idle ? "bg-line" : "bg-accent-soft", active && "animate-wave")}
          style={{ height: `${h * 100}%`, animationDelay: `${i * 110}ms` }}
        />
      ))}
    </span>
  )
}
