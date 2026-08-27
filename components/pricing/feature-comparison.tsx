'use client';

import { Check, Minus, Info } from 'lucide-react';
import { COMPARISON_ROWS, PLANS } from '@/lib/pricing';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export function FeatureComparison() {
  const categories = Array.from(new Set(COMPARISON_ROWS.map((r) => r.category)));

  return (
    <section id="compare" className="scroll-mt-20 border-b border-border/60 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-purple">
            Compare Plans
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            See What&apos;s Included
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Compare protection across every ThreatSenseAI tier.
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-2xl border border-border bg-card lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="sticky left-0 z-10 bg-surface px-6 py-4 text-left text-sm font-semibold">
                    Capability
                  </th>
                  {PLANS.map((plan) => (
                    <th key={plan.id} className="px-4 py-4 text-center text-sm font-semibold min-w-[160px]">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-display">{plan.name}</span>
                        {plan.recommended && (
                          <span className="rounded-full bg-brand-purple/10 px-2 py-0.5 text-xs font-medium text-brand-purple">
                            Recommended
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.flatMap((category) => [
                  <tr key={`cat-${category}`} className="border-b border-border/50 bg-surface/50">
                    <td colSpan={5} className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {category}
                    </td>
                  </tr>,
                  ...COMPARISON_ROWS.filter((r) => r.category === category).map((row) => (
                    <tr key={row.label} className="border-b border-border/40 transition-colors hover:bg-muted/30">
                      <td className="sticky left-0 z-10 bg-card px-6 py-3.5 text-sm">
                        <div className="flex items-center gap-1.5">
                          <span>{row.label}</span>
                          {row.description && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="text-muted-foreground/60 hover:text-muted-foreground">
                                    <Info className="h-3.5 w-3.5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p>{row.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </td>
                      {row.values.map((val, i) => (
                        <td key={i} className="px-4 py-3.5 text-center">
                          {val ? (
                            <Check className="mx-auto h-4 w-4 text-brand-orange" />
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

        {/* Mobile accordion-style */}
        <div className="space-y-4 lg:hidden">
          {PLANS.map((plan) => (
            <div key={plan.id} className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
                <span className="font-display font-semibold">{plan.name}</span>
                {plan.recommended && (
                  <span className="rounded-full bg-brand-purple/10 px-2 py-0.5 text-xs font-medium text-brand-purple">
                    Recommended
                  </span>
                )}
              </div>
              <div className="divide-y divide-border/40">
                {COMPARISON_ROWS.map((row) => {
                  const idx = PLANS.findIndex((p) => p.id === plan.id);
                  const val = row.values[idx];
                  return (
                    <div key={row.label} className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm">{row.label}</span>
                      {val ? (
                        <Check className="h-4 w-4 text-brand-orange" />
                      ) : (
                        <Minus className="h-4 w-4 text-border" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
