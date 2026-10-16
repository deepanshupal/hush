import Link from "next/link"
import { CellValue } from "@/components/comparison-cell"
import { Section, SectionHeading } from "@/components/section"
import { CHECKED, getApp, getRow, type AppId } from "@/lib/comparison-data"
import { cn } from "@/lib/utils"

// A subset of the full comparison on /compare. All values live in lib/comparison-data.ts;
// details show as tooltips on the cells.
const HOME_APPS: AppId[] = ["hush", "wispr", "superwhisper"]
const HOME_ROWS = ["price", "on-device", "open-source", "ai-cleanup"]

export function Comparison() {
  const apps = HOME_APPS.map(getApp)
  const rows = HOME_ROWS.map(getRow)

  return (
    <Section id="compare" aria-labelledby="compare-title">
      <SectionHeading
        id="compare-title"
        eyebrow="Compare"
        title="A free, open-source alternative to Wispr Flow"
        lead="Wispr Flow and Superwhisper are good products. If you would rather not pay every month, or you want your speech recognized on your own machine, Hush is for you."
      />
      <table className="w-full table-fixed border-separate border-spacing-0 rounded-panel border border-line text-left text-small">
        <caption className="sr-only">
          Hush compared with {apps.slice(1).map((a) => a.name).join(" and ")}
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-[30%] rounded-tl-panel bg-surface-muted px-3 py-3 sm:px-4">
              <span className="sr-only">Feature</span>
            </th>
            {apps.map((app, i) => (
              <th
                key={app.id}
                scope="col"
                className={cn(
                  "px-3 py-3 font-semibold sm:px-4",
                  app.id === "hush" ? "bg-accent text-accent-ink" : "bg-surface-muted text-ink",
                  i === apps.length - 1 && "rounded-tr-panel",
                )}
              >
                {app.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="align-middle">
              <th scope="row" className="border-t border-line px-3 py-3 font-medium text-ink sm:px-4">
                {row.label}
              </th>
              {apps.map((app, i) => (
                <td
                  key={app.id}
                  className={cn(
                    "border-t border-line px-3 py-3 sm:px-4",
                    app.id === "hush" ? "bg-accent-soft font-medium text-ink" : "text-ink-muted",
                  )}
                >
                  <CellValue cell={row.cells[app.id]} align={i === apps.length - 1 ? "end" : "center"} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-caption text-ink-subtle">
        Based on each product&apos;s website, {CHECKED}. They also offer things Hush doesn&apos;t,
        such as iPhone apps.
      </p>
      <p className="mt-4 text-small">
        <Link href="/compare" className="link font-medium">
          See the full comparison
        </Link>{" "}
        <span className="text-ink-muted">with VoiceInk, OpenWhispr, Spokenly, Willow and Apple Dictation.</span>
      </p>
    </Section>
  )
}
