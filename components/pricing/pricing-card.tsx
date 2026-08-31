'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, Star, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { Plan, getPriceCalculation, formatINR, SALES_THRESHOLD } from '@/lib/pricing';
import { usePricing } from '@/lib/pricing-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  plan: Plan;
  onContactSales?: () => void;
  index?: number;
  isInView?: boolean;
}

export function PricingCard({ plan, onContactSales, index = 0, isInView = true }: PricingCardProps) {
  const { devices, years } = usePricing();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const priceCalc = getPriceCalculation(plan, devices, years);
  const isSales = plan.salesOnly || devices >= SALES_THRESHOLD || priceCalc === null;

  const highlights = plan.features.slice(0, plan.highlightCount);
  const remaining = plan.features.length - plan.highlightCount;

  const checkoutUrl = `/checkout?plan=${encodeURIComponent(plan.id)}&devices=${devices}&years=${years}`;

  // Proactively prefetch checkout route and exact params for instant 0ms navigation
  useEffect(() => {
    if (!isSales) {
      router.prefetch(checkoutUrl);
      router.prefetch('/checkout');
    }
  }, [router, checkoutUrl, isSales]);

  const accentClasses =
    plan.accent === 'purple'
      ? 'border-brand-purple/40 hover:border-brand-purple hover:shadow-brand-purple/15'
      : plan.accent === 'orange'
      ? 'border-brand-orange/40 hover:border-brand-orange hover:shadow-brand-orange/15'
      : 'border-border hover:border-muted-foreground/30';

  return (
    <div
      style={{
        transitionDelay: isInView ? `${160 + index * 120}ms` : '0ms',
      }}
      className={cn(
        'group relative flex flex-col rounded-2xl border-2 bg-card p-6',
        'transition-[opacity,transform,box-shadow,border-color] duration-800 ease-out-expo will-change-[transform,opacity]',
        isInView
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-8 opacity-0 scale-[0.97]',
        'hover:-translate-y-1.5 hover:shadow-xl',
        plan.recommended
          ? 'border-brand-purple shadow-lg shadow-brand-purple/10 hover:shadow-brand-purple/20'
          : accentClasses
      )}
    >
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 transition-transform duration-300 group-hover:scale-105">
          <Badge className="bg-brand-purple px-3 py-1 text-white shadow-sm font-semibold tracking-wide">
            <Star className="mr-1 h-3 w-3 fill-white" />
            RECOMMENDED
          </Badge>
        </div>
      )}

      <h3 className="font-display text-xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-brand-orange">
        {plan.name}
      </h3>

      <div className="my-6 border-t border-border" />

      <div className="mb-6">
        {isSales || !priceCalc ? (
          <div>
            <p className="font-display text-2xl font-semibold">Custom pricing</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {plan.salesOnly
                ? 'Designed for larger and complex SAP environments.'
                : 'Tailored deployment for your scale.'}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {years === 1 ? 'Annual License' : `${years}-Year License`}
              </p>
              {priceCalc.discountPercent > 0 && (
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 border border-emerald-500/20">
                  {priceCalc.discountPercent}% Off
                </span>
              )}
            </div>

            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display text-3xl font-semibold tabular-nums text-foreground">
                {formatINR(priceCalc.subtotal)}
              </span>
              <span className="text-xs text-muted-foreground font-normal">
                {years === 1 ? '/year' : `total for ${years} yrs`}
              </span>
            </div>

            {priceCalc.discountAmount > 0 ? (
              <div className="mt-1 flex items-center gap-1.5 text-xs">
                <span className="font-medium text-emerald-600">
                  Save {formatINR(priceCalc.discountAmount)}
                </span>
                <span className="text-muted-foreground line-through">
                  {formatINR(priceCalc.undiscountedTotal)}
                </span>
              </div>
            ) : null}

            <p className="mt-1 text-xs text-muted-foreground">
              {devices} devices {years > 1 ? `· ${formatINR(priceCalc.annualEquivalent)}/yr equivalent` : '· billed annually'}
            </p>
          </div>
        )}
      </div>

      <ul className="mb-6 flex-1 space-y-3">
        {highlights.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
            <span className="text-foreground/90">{f.label}</span>
          </li>
        ))}
        {remaining > 0 && (
          <li className="pl-6.5 text-xs text-muted-foreground">
            + {remaining} more
          </li>
        )}
      </ul>

      <div className="space-y-2">
        {isSales ? (
          <Button
            onClick={onContactSales}
            className="group/cta w-full bg-brand-purple text-white hover:bg-brand-purple-dark"
          >
            Contact Sales
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
          </Button>
        ) : (
          <Button
            asChild
            className="group/cta w-full bg-brand-orange text-white hover:bg-brand-orange-dark shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer"
            onClick={() => setIsNavigating(true)}
            onMouseEnter={() => router.prefetch(checkoutUrl)}
          >
            <Link href={checkoutUrl} prefetch={true}>
              {isNavigating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Opening Checkout...</span>
                </>
              ) : (
                <>
                  <span className="group-hover/cta:hidden">Buy Now</span>
                  <span className="hidden group-hover/cta:inline">Continue to Checkout</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
                </>
              )}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
