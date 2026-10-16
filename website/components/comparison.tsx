import Link from "next/link"
import { CellValue } from "@/components/comparison-cell"
import { Section, SectionHeading } from "@/components/section"
import { CHECKED, getApp, getRow, type AppId } from "@/lib/comparison-data"
import { cn } from "@/lib/utils"

// A subset of the full comparison on /compare. All values live in lib/comparison-data.ts.
const HOME_APPS: AppId[] = ["hush", "wispr", "superwhisper"]
// Notes are shown inline where they add useful detail.
const HOME_ROWS: { id: string; notes: boolean }[] = [
  { id: "price", notes: true },
  { id: "on-device", notes: true },
  { id: "open-source", notes: false },
  { id: "ai-cleanup", notes: true },
]

export function Comparison() {
  const apps = HOME_APPS.map(getApp)
  const rows = HOME_ROWS.map(({ id, notes }) => ({ ...getRow(id), notes }))

  return (
    <Section id="compare" aria-labelledby="compare-title">
      <SectionHeading
        id="compare-title"
        eyebrow="Compare"
        title="A free, open-source alternative to Wispr Flow"
        lead="Wispr Flow and Superwhisper are good products. If you would rather not pay every month, or you want your speech recognized on your own machine, Hush is for you."
      />
      <div className="overflow-x-auto rounded-panel border border-line">
        <table className="w-full min-w-[36rem] border-collapse text-left text-small">
          <caption className="sr-only">
            Hush compared with {apps.slice(1).map((a) => a.name).join(" and ")}
          </caption>
          <thead>
            <tr className="bg-surface-muted">
              <th scope="col" className="w-1/4 px-4 py-3 font-medium text-ink-muted">
                <span className="sr-only">Feature</span>
              </th>
              {apps.map((app) => (
                <th
                  key={app.id}
                  scope="col"
                  className={cn("w-1/4 px-4 py-3 font-semibold", app.id === "hush" ? "text-accent" : "text-ink")}
                >
                  {app.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-line align-top">
                <th scope="row" className="px-4 py-3 font-medium text-ink">
                  {row.label}
                </th>
                {apps.map((app) => (
                  <td
                    key={app.id}
                    className={cn("px-4 py-3", app.id === "hush" ? "font-medium text-ink" : "text-ink-muted")}
                  >
                    <CellValue cell={row.cells[app.id]} inlineNote={row.notes} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-caption text-ink-subtle">
        From each product&apos;s own website, checked {CHECKED}. They also offer things Hush
        doesn&apos;t yet, such as mobile apps.
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
