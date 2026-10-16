import { CellValue } from "@/components/comparison-cell"
import { getApp, getRow, type AppId } from "@/lib/comparison-data"
import { cn } from "@/lib/utils"

/**
 * A compact Hush-vs-others table: a few apps and rows from lib/comparison-data.ts.
 * Used on the home page and the /alternatives pages; works at every width.
 * Cell details show as tooltips.
 */
export function VersusTable({
  appIds,
  rowIds,
  showDescriptions = false,
}: {
  appIds: AppId[]
  rowIds: string[]
  /** Show each row's one-line explanation under its label. */
  showDescriptions?: boolean
}) {
  const apps = appIds.map(getApp)
  const rows = rowIds.map(getRow)

  return (
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
              {showDescriptions && row.description && (
                <span className="mt-0.5 hidden text-caption font-normal text-ink-subtle sm:block">{row.description}</span>
              )}
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
  )
}
