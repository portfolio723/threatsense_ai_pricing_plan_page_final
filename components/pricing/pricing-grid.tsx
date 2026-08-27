'use client';

import { PLANS } from '@/lib/pricing';
import { PricingCard } from './pricing-card';
import { DeviceSelector } from './device-selector';

export function PricingGrid({ onContactSales }: { onContactSales?: () => void }) {
  return (
    <section id="plans" className="scroll-mt-20 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
            Plans &amp; Pricing
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Choose the Protection That Fits
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Start with the essentials and add deeper protection as your security needs grow.
          </p>
        </div>

        <div className="mb-12">
          <DeviceSelector />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} onContactSales={onContactSales} />
          ))}
        </div>
      </div>
    </section>
  );
}
