import { CellValue, Mark } from "@/components/comparison-cell"
import { apps, groups, type AppId, type Cell } from "@/lib/comparison-data"
import { cn } from "@/lib/utils"

type Note = { number: number; app: string; row: string; cell: Cell }

/** Number every cell that has a note, in reading order (group, row, column). */
function collectNotes() {
  const notes: Note[] = []
  const index = new Map<string, number>()
  for (const group of groups) {
    for (const row of group.rows) {
      for (const app of apps) {
        const cell = row.cells[app.id]
        if (cell.note) {
          const number = notes.length + 1
          notes.push({ number, app: app.name, row: row.label, cell })
          index.set(`${row.id}:${app.id}`, number)
        }
      }
    }
  }
  return { notes, index }
}

// Widths are fixed so the sticky Hush column can sit right after the feature column.
const featureCol = "w-[8.5rem] min-w-[8.5rem] sm:w-[12rem] sm:min-w-[12rem]"
const appCol = "w-[7rem] min-w-[7rem] sm:w-[8rem] sm:min-w-[8rem]"
const hushSticky = "sm:sticky sm:left-[12rem] sm:z-10"

export function ComparisonTable() {
  const { index } = collectNotes()
  const isHush = (id: AppId) => id === "hush"

  return (
    <>
      <ul className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-caption text-ink-muted" aria-label="Legend">
        <li className="flex items-center gap-1.5">
          <Mark kind="yes" /> Yes
        </li>
        <li className="flex items-center gap-1.5">
          <Mark kind="partial" /> Partly (see note)
        </li>
        <li className="flex items-center gap-1.5">
          <Mark kind="no" /> No
        </li>
        <li className="flex items-center gap-1.5">
          <Mark kind="unknown" /> Not stated on their site
        </li>
      </ul>
      <p className="mb-3 text-caption text-ink-subtle sm:hidden">Scroll sideways to see every app.</p>

      <div
        className="overflow-x-auto rounded-panel border border-line"
        tabIndex={0}
        role="region"
        aria-label="Comparison table, scrolls sideways"
      >
        <table className="w-max min-w-full border-separate border-spacing-0 text-left text-small">
          <caption className="sr-only">
            Hush compared with {apps.slice(1).map((a) => a.name).join(", ")}. Notes and sources are
            listed below the table.
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className={cn(featureCol, "sticky left-0 z-20 border-b border-r border-line bg-surface-muted px-4 py-3 align-bottom font-medium text-ink-muted")}
              >
                Feature
              </th>
              {apps.map((app) => (
                <th
                  key={app.id}
                  scope="col"
                  className={cn(
                    appCol,
                    "border-b border-line px-4 py-3 align-bottom font-semibold",
                    isHush(app.id) ? cn(hushSticky, "border-r bg-accent text-accent-ink") : "bg-surface-muted text-ink",
                  )}
                >
                  {app.name}
                  {app.tagline && (
                    <span
                      className={cn(
                        "block text-caption font-normal",
                        isHush(app.id) ? "text-accent-ink" : "text-ink-subtle",
                      )}
                    >
                      {app.tagline}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          {groups.map((group) => (
            <tbody key={group.id}>
              <tr>
                <th
                  scope="colgroup"
                  colSpan={apps.length + 1}
                  className="border-b border-line bg-surface-raised px-0 pb-2 pt-6 text-left"
                >
                  <span className="sticky left-4 px-4 text-caption font-semibold uppercase tracking-wider text-ink">
                    {group.label}
                  </span>
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.id} className="align-top">
                  <th
                    scope="row"
                    className={cn(featureCol, "sticky left-0 z-10 border-b border-r border-line bg-surface px-4 py-3 font-medium text-ink")}
                  >
                    {row.label}
                    {row.description && (
                      <span className="mt-0.5 block text-caption font-normal text-ink-subtle">
                        {row.description}
                      </span>
                    )}
                  </th>
                  {apps.map((app) => {
                    const cell = row.cells[app.id]
                    return (
                      <td
                        key={app.id}
                        className={cn(
                          appCol,
                          "border-b border-line px-4 py-3",
                          isHush(app.id)
                            ? cn(hushSticky, "border-r bg-accent-soft font-medium text-ink")
                            : "text-ink-muted",
                        )}
                      >
                        <CellValue cell={cell} footnote={index.get(`${row.id}:${app.id}`)} />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </>
  )
}

/** Numbered notes for the cells marked in the table. */
export function ComparisonNotes() {
  const { notes } = collectNotes()
  return (
    <ol className="flex flex-col gap-1.5 text-small text-ink-muted">
      {notes.map((note) => (
        <li key={note.number} id={`note-${note.number}`} className="flex gap-2 scroll-mt-6">
          <a href={`#ref-${note.number}`} className="link w-6 shrink-0 text-right" aria-label={`Back to note ${note.number} in the table`}>
            {note.number}.
          </a>
          <span>
            <span className="font-medium text-ink">
              {note.app}, {note.row}:
            </span>{" "}
            {note.cell.note}
            {note.cell.source && (
              <>
                {" "}
                <a href={note.cell.source} className="link" rel="noopener">
                  Source
                </a>
              </>
            )}
          </span>
        </li>
      ))}
    </ol>
  )
}
