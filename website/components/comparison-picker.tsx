"use client"

import { useState } from "react"
import { CellValue } from "@/components/comparison-cell"
import { ChevronDownIcon } from "@/components/icons/ui-icons"
import type { AppId, Cell } from "@/lib/comparison-data"

export type PickerGroup = {
  id: string
  label: string
  rows: { id: string; label: string; cells: Record<AppId, Cell> }[]
}

/**
 * The comparison on phones and tablets: Hush vs one app at a time, chosen from
 * a menu, so nothing scrolls sideways.
 */
export function ComparisonPicker({
  apps,
  groups,
}: {
  apps: { id: AppId; name: string }[]
  groups: PickerGroup[]
}) {
  const [other, setOther] = useState<AppId>(apps[0].id)
  const otherName = apps.find((a) => a.id === other)?.name ?? ""
  const grid = "grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-2"

  return (
    <div>
      <div className="flex items-center gap-3 rounded-panel border border-line bg-surface-raised p-2 shadow-button-secondary">
        <span className="flex h-10 flex-1 items-center justify-center rounded-[0.5rem] bg-accent text-small font-semibold text-accent-ink">
          Hush
        </span>
        <span className="text-caption font-medium text-ink-subtle">vs</span>
        <label className="relative flex-1">
          <span className="sr-only">Compare Hush with</span>
          <select
            value={other}
            onChange={(e) => setOther(e.target.value as AppId)}
            className="h-10 w-full cursor-pointer appearance-none rounded-[0.5rem] border border-line bg-surface pl-3 pr-8 text-small font-semibold text-ink"
          >
            {apps.map((app) => (
              <option key={app.id} value={app.id}>
                {app.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-accent" />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {groups.map((group) => (
          <section key={group.id} aria-label={group.label}>
            <div className={`${grid} border-b border-line pb-2 text-caption`}>
              <h3 className="text-caption font-semibold uppercase tracking-wider text-ink">{group.label}</h3>
              <span className="font-semibold text-accent">Hush</span>
              <span className="truncate font-semibold text-ink">{otherName}</span>
            </div>
            <dl>
              {group.rows.map((row) => (
                <div key={row.id} className={`${grid} items-center border-b border-line py-2.5 text-small`}>
                  <dt className="font-medium text-ink">{row.label}</dt>
                  <dd className="-my-1 rounded-[0.5rem] bg-accent-soft px-2 py-1 font-medium text-ink">
                    <CellValue cell={row.cells.hush} align="start" />
                  </dd>
                  <dd className="text-ink-muted">
                    <CellValue cell={row.cells[other]} align="end" />
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  )
}
