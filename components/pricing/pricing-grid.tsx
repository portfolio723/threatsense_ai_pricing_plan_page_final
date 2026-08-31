'use client';

import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { PLANS } from '@/lib/pricing';
import { Button } from '@/components/ui/button';
import { PricingCard } from './pricing-card';
import { DeviceSelector } from './device-selector';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function PricingGrid({ onContactSales }: { onContactSales?: () => void }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  return (
    <section id="plans" className="scroll-mt-20 border-b border-border/60">
      <div ref={ref} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div
          className={cn(
            'mx-auto mb-12 max-w-2xl text-center transition-[opacity,transform] duration-700 ease-out-expo',
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          )}
        >
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
            Plans &amp; Pricing
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Choose the Protection That Fits
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Start with the essentials and add deeper protection as your security needs grow.
          </p>
        </div>

        <div
          style={{ transitionDelay: isInView ? '80ms' : '0ms' }}
          className={cn(
            'mb-12 transition-[opacity,transform] duration-700 ease-out-expo',
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          )}
        >
          <DeviceSelector />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
          {PLANS.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={index}
              isInView={isInView}
              onContactSales={onContactSales}
            />
          ))}
        </div>

        {/* Compare Plans CTA with grey border */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/#compare"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('compare');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.history.pushState(null, '', '/#compare');
              }
            }}
          >
            <Button
              variant="outline"
              size="lg"
              className="group rounded-md border border-border bg-card/80 px-6 py-2.5 text-sm font-medium text-foreground shadow-xs transition-all duration-200 hover:border-muted-foreground/40 hover:bg-surface hover:text-brand-orange"
            >
              <span>Compare Plans</span>
              <ArrowDown className="ml-2 h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-brand-orange" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
