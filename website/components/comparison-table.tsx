import { CellValue, Mark, type TipAlign } from "@/components/comparison-cell"
import { ComparisonPicker, type PickerGroup } from "@/components/comparison-picker"
import { ChevronDownIcon } from "@/components/icons/ui-icons"
import { apps, getApp, groups, type AppId, type Cell } from "@/lib/comparison-data"
import { cn } from "@/lib/utils"

/** Shown side by side on desktop. The rest sit behind "Show more apps". */
const FEATURED: AppId[] = ["hush", "wispr", "superwhisper", "voiceink", "openwhispr"]
const MORE: AppId[] = ["hush", "spokenly", "willow", "apple"]

/**
 * The full comparison. Desktop (lg and up): a table with Hush and the four
 * closest alternatives, no sideways scrolling. Smaller screens: Hush vs one
 * app at a time, picked from a menu.
 */
export function ComparisonTable() {
  // Only what the table renders goes to the client picker; sources stay on the server.
  const pickerGroups: PickerGroup[] = groups.map((group) => ({
    id: group.id,
    label: group.label,
    rows: group.rows.map((row) => ({
      id: row.id,
      label: row.label,
      cells: Object.fromEntries(
        Object.entries(row.cells).map(([id, { value, note, planned }]) => [id, { value, note, planned }]),
      ) as Record<AppId, Cell>,
    })),
  }))

  return (
    <>
      <Legend />
      <div className="hidden lg:block">
        <AppTable ids={FEATURED} caption="Hush compared with Wispr Flow, Superwhisper, VoiceInk and OpenWhispr" />
        <details className="group mt-6">
          <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-control border border-line bg-surface-raised px-4 py-2 text-small font-medium text-ink shadow-button-secondary transition-colors hover:bg-surface-muted [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Show more apps: Spokenly, Willow, Apple Dictation</span>
            <span className="hidden group-open:inline">Hide Spokenly, Willow and Apple Dictation</span>
            <ChevronDownIcon className="size-4 text-accent transition-transform group-open:rotate-180" />
          </summary>
          <div className="mt-6">
            <AppTable ids={MORE} caption="Hush compared with Spokenly, Willow and Apple Dictation" />
          </div>
        </details>
      </div>
      <div className="lg:hidden">
        <ComparisonPicker
          apps={apps.filter((a) => a.id !== "hush").map(({ id, name }) => ({ id, name }))}
          groups={pickerGroups}
        />
      </div>
    </>
  )
}

function Legend() {
  return (
    <ul
      className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-caption text-ink-muted"
      aria-label="Legend"
    >
      <li className="flex items-center gap-1.5">
        <Mark kind="yes" /> Yes
      </li>
      <li className="flex items-center gap-1.5">
        <Mark kind="partial" /> Partly
      </li>
      <li className="flex items-center gap-1.5">
        <Mark kind="no" /> No
      </li>
      <li className="flex items-center gap-1.5">
        <Mark kind="unknown" /> Not stated on their site
      </li>
      <li className="text-ink-subtle">Hover or tap a cell for details</li>
    </ul>
  )
}

function AppTable({ ids, caption }: { ids: AppId[]; caption: string }) {
  const cols = ids.map(getApp)
  const align = (i: number): TipAlign => (i === cols.length - 1 ? "end" : "center")

  return (
    <table className="w-full table-fixed border-separate border-spacing-0 rounded-panel border border-line text-left text-small">
      <caption className="sr-only">{caption}</caption>
      <colgroup>
        <col className="w-[13rem]" />
        {cols.map((app) => (
          <col key={app.id} />
        ))}
      </colgroup>
      <thead>
        <tr>
          <th
            scope="col"
            className="rounded-tl-panel border-b border-line bg-surface-muted px-4 py-3 align-bottom text-caption font-medium uppercase tracking-wider text-ink-subtle"
          >
            Feature
          </th>
          {cols.map((app, i) => (
            <th
              key={app.id}
              scope="col"
              className={cn(
                "border-b border-line px-3 py-3 align-bottom font-semibold",
                app.id === "hush" ? "bg-accent text-accent-ink" : "bg-surface-muted text-ink",
                i === cols.length - 1 && "rounded-tr-panel",
              )}
            >
              {app.name}
            </th>
          ))}
        </tr>
      </thead>
      {groups.map((group, g) => (
        <tbody key={group.id}>
          <tr>
            <th
              scope="colgroup"
              colSpan={cols.length + 1}
              className="border-b border-line px-4 pb-2 pt-6 text-left text-caption font-semibold uppercase tracking-wider text-ink"
            >
              {group.label}
            </th>
          </tr>
          {group.rows.map((row, r) => {
            const last = g === groups.length - 1 && r === group.rows.length - 1
            return (
              <tr key={row.id} className="align-middle">
                <th
                  scope="row"
                  className={cn("px-4 py-3 font-medium text-ink", !last && "border-b border-line")}
                >
                  {row.label}
                  {row.description && (
                    <span className="mt-0.5 block text-caption font-normal text-ink-subtle">
                      {row.description}
                    </span>
                  )}
                </th>
                {cols.map((app, i) => (
                  <td
                    key={app.id}
                    className={cn(
                      "px-3 py-3",
                      !last && "border-b border-line",
                      app.id === "hush" ? "bg-accent-soft font-medium text-ink" : "text-ink-muted",
                    )}
                  >
                    <CellValue cell={row.cells[app.id]} align={align(i)} />
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      ))}
    </table>
  )
}
