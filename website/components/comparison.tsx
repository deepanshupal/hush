import { Section, SectionHeading } from "@/components/section"

// Only facts that can be checked on each product's own website.
// Prices as listed in October 2026; update this table when they change.
const rows: { label: string; hush: string; wispr: string; superwhisper: string }[] = [
  {
    label: "Price",
    hush: "Free, forever",
    wispr: "$15/month for Pro (free tier capped at 2,000 words a week)",
    superwhisper: "$8.49/month, or $249.99 one-time",
  },
  {
    label: "Where speech is recognized",
    hush: "On your Mac",
    wispr: "In the cloud",
    superwhisper: "On your Mac or in the cloud, depending on the model",
  },
  {
    label: "Source code",
    hush: "Open source (MIT)",
    wispr: "Closed",
    superwhisper: "Closed",
  },
  {
    label: "AI clean-up",
    hush: "Optional, with your own provider or Apple Intelligence",
    wispr: "Built in, through their cloud",
    superwhisper: "Built in, cloud or local models",
  },
]

export function Comparison() {
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
          <caption className="sr-only">Hush compared with Wispr Flow and Superwhisper</caption>
          <thead>
            <tr className="bg-surface-muted">
              <th scope="col" className="w-1/4 px-4 py-3 font-medium text-ink-muted">
                <span className="sr-only">Feature</span>
              </th>
              <th scope="col" className="w-1/4 px-4 py-3 font-semibold text-accent">
                Hush
              </th>
              <th scope="col" className="w-1/4 px-4 py-3 font-semibold text-ink">
                Wispr Flow
              </th>
              <th scope="col" className="w-1/4 px-4 py-3 font-semibold text-ink">
                Superwhisper
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-line align-top">
                <th scope="row" className="px-4 py-3 font-medium text-ink">
                  {row.label}
                </th>
                <td className="px-4 py-3 font-medium text-ink">{row.hush}</td>
                <td className="px-4 py-3 text-ink-muted">{row.wispr}</td>
                <td className="px-4 py-3 text-ink-muted">{row.superwhisper}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-caption text-ink-subtle">
        Prices and details from each product&apos;s website, October 2026. They also offer things
        Hush doesn&apos;t, such as mobile apps. Check their sites for current pricing.
      </p>
    </Section>
  )
}
