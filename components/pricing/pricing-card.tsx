'use client';

import { useRouter } from 'next/navigation';
import { Check, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import { Plan, getPriceForDevices, formatINR, SALES_THRESHOLD } from '@/lib/pricing';
import { usePricing } from '@/lib/pricing-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function PricingCard({ plan, onContactSales }: { plan: Plan; onContactSales?: () => void }) {
  const { devices } = usePricing();
  const router = useRouter();
  const price = getPriceForDevices(plan, devices);
  const isSales = plan.salesOnly || devices >= SALES_THRESHOLD || price === null;

  const highlights = plan.features.slice(0, plan.highlightCount);
  const remaining = plan.features.length - plan.highlightCount;

  const accentClasses =
    plan.accent === 'purple'
      ? 'border-brand-purple/50'
      : plan.accent === 'orange'
      ? 'border-brand-orange/50'
      : 'border-border';

  const handleTrial = () => {
    const params = new URLSearchParams({ plan: plan.id, devices: String(devices) });
    router.push(`/trial?${params.toString()}`);
  };

  const handleBuy = () => {
    const params = new URLSearchParams({ plan: plan.id, devices: String(devices) });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border-2 bg-card p-6 transition-all duration-200 hover:-translate-y-0.5',
        plan.recommended
          ? 'border-brand-purple shadow-lg shadow-brand-purple/10'
          : accentClasses,
        'hover:shadow-md'
      )}
    >
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-brand-purple px-3 py-1 text-white shadow-sm">
            <Star className="mr-1 h-3 w-3 fill-white" />
            RECOMMENDED
          </Badge>
        </div>
      )}

      <h3 className="font-display text-xl font-semibold tracking-tight">{plan.name}</h3>

      <div className="my-6 border-t border-border" />

      <div className="mb-6">
        {isSales ? (
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
            <p className="text-sm text-muted-foreground">From</p>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-3xl font-semibold tabular-nums">
                {formatINR(price ?? 0)}
              </span>
              <span className="text-sm text-muted-foreground">/year</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {devices} devices · annual plan
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
          <>
            {plan.trialAvailable && (
              <Button
                onClick={handleTrial}
                variant="outline"
                className="group/cta w-full hover:border-brand-orange hover:text-brand-orange"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
              </Button>
            )}
            {plan.purchaseAvailable && (
              <Button
                onClick={handleBuy}
                className="group/cta w-full bg-brand-orange text-white hover:bg-brand-orange-dark"
              >
                <span className="group-hover/cta:hidden">Buy Now</span>
                <span className="hidden group-hover/cta:inline">Continue to Checkout</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
