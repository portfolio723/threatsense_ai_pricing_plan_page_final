'use client';

import { Check, Minus, Info, Layers } from 'lucide-react';
import { COMPARISON_ROWS } from '@/lib/pricing';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export function FeatureComparison() {
  const categories = Array.from(new Set(COMPARISON_ROWS.map((r) => r.category)));

  const packageHeaders = [
    { num: 'Package 1', name: 'Endpoint Security', recommended: false },
    { num: 'Package 2', name: 'Endpoint + Browser Security', recommended: true },
    { num: 'Package 3', name: 'Endpoint + Browser + SAP Controls', recommended: false },
  ];

  return (
    <section id="compare" className="scroll-mt-20 border-b border-border/60 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
            ThreatOps Cybersecurity Suite
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Data Leak Prevention Packages
          </h2>
          <p className="mt-3 text-base text-muted-foreground text-balance">
            Cumulative protection across device, browser, and SAP on a single unified console.
          </p>
        </div>

        {/* Desktop comparison table */}
        <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-xs lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface/80 backdrop-blur-xs">
                  <th className="sticky left-0 z-10 bg-surface/95 px-6 py-5 text-left text-sm font-semibold text-foreground min-w-[320px]">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-brand-orange" />
                      <span>Security Controls &amp; Capabilities</span>
                    </div>
                  </th>
                  {packageHeaders.map((pkg, idx) => (
                    <th key={pkg.num} className="px-4 py-5 text-center text-sm font-semibold min-w-[200px]">
                      <div className="flex flex-col items-center gap-1">
                        {pkg.recommended ? (
                          <span className="rounded-full bg-brand-purple/10 px-2.5 py-0.5 text-xs font-semibold text-brand-purple border border-brand-purple/20">
                            Recommended
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {pkg.num}
                          </span>
                        )}
                        <span className="font-display text-sm font-semibold text-foreground">{pkg.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.flatMap((category) => [
                  <tr key={`cat-${category}`} className="border-b border-border/60 bg-surface/90">
                    <td colSpan={4} className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {category}
                    </td>
                  </tr>,
                  ...COMPARISON_ROWS.filter((r) => r.category === category).map((row) => (
                    <tr key={row.label} className="border-b border-border/40 transition-colors hover:bg-muted/25">
                      <td className="sticky left-0 z-10 bg-card px-6 py-3.5 text-sm font-medium text-foreground">
                        <div className="flex items-center gap-1.5">
                          <span>{row.label}</span>
                          {row.description && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    aria-label="Feature info"
                                    className="text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                                  >
                                    <Info className="h-3.5 w-3.5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs text-xs">
                                  <p>{row.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </td>
                      {row.values.map((val, i) => (
                        <td key={i} className="px-4 py-3.5 text-center">
                          {typeof val === 'string' ? (
                            <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-xs font-semibold text-brand-orange border border-brand-orange/20">
                              {val}
                            </span>
                          ) : val ? (
                            <Check className="mx-auto h-4 w-4 text-brand-orange stroke-[2.5]" />
                          ) : (
                            <Minus className="mx-auto h-4 w-4 text-border" />
                          )}
                        </td>
                      ))}
                    </tr>
                  )),
                ])}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile accordion / card view */}
        <div className="space-y-6 lg:hidden">
          {packageHeaders.map((pkg, idx) => (
            <div key={pkg.num} className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
              <div className="flex flex-col items-start gap-1 border-b border-border bg-surface px-5 py-4">
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {pkg.num}
                  </span>
                  {pkg.recommended && (
                    <span className="rounded-full bg-brand-purple/10 px-2.5 py-0.5 text-xs font-semibold text-brand-purple border border-brand-purple/20">
                      Recommended
                    </span>
                  )}
                </div>
                <span className="font-display text-base font-semibold text-foreground">{pkg.name}</span>
              </div>
              <div className="divide-y divide-border/40">
                {categories.flatMap((cat) => [
                  <div key={`m-cat-${cat}`} className="bg-surface/60 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {cat}
                  </div>,
                  ...COMPARISON_ROWS.filter((r) => r.category === cat).map((row) => {
                    const val = row.values[idx];
                    return (
                      <div key={row.label} className="flex items-center justify-between px-4 py-3 text-sm">
                        <span className="text-foreground pr-3">{row.label}</span>
                        {typeof val === 'string' ? (
                          <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-2 py-0.5 text-xs font-semibold text-brand-orange shrink-0">
                            {val}
                          </span>
                        ) : val ? (
                          <Check className="h-4 w-4 text-brand-orange stroke-[2.5] shrink-0" />
                        ) : (
                          <Minus className="h-4 w-4 text-border shrink-0" />
                        )}
                      </div>
                    );
                  }),
                ])}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
