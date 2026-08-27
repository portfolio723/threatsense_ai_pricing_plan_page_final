'use client';

import { Minus, Plus, Calendar, Sparkles } from 'lucide-react';
import { DEVICE_OPTIONS, SALES_THRESHOLD, YEAR_OPTIONS } from '@/lib/pricing';
import { usePricing } from '@/lib/pricing-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export function DeviceSelector() {
  const { devices, setDevices, years, setYears } = usePricing();
  const isSales = devices >= SALES_THRESHOLD;
  const currentYearOption = YEAR_OPTIONS.find((y) => y.years === years) || YEAR_OPTIONS[0];

  const decrease = () => {
    const idx = DEVICE_OPTIONS.indexOf(devices as (typeof DEVICE_OPTIONS)[number]);
    if (idx > 0) setDevices(DEVICE_OPTIONS[idx - 1]);
  };
  const increase = () => {
    const idx = DEVICE_OPTIONS.indexOf(devices as (typeof DEVICE_OPTIONS)[number]);
    if (idx >= 0 && idx < DEVICE_OPTIONS.length - 1) setDevices(DEVICE_OPTIONS[idx + 1]);
    else setDevices(SALES_THRESHOLD);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
      {/* Device Selector (Spanning 2 columns to align directly above Tier 1 & Tier 2 cards) */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs lg:col-span-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <label className="text-sm font-semibold text-foreground">
            How many devices do you need to protect?
          </label>
          <span className="text-xs font-medium text-muted-foreground">
            Self-serve from 5 to 250+ devices
          </span>
        </div>

        <div className="flex w-full flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-1 rounded-full border border-border bg-surface p-1 shrink-0">
            <button
              onClick={decrease}
              disabled={devices <= DEVICE_OPTIONS[0]}
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-background disabled:opacity-40 disabled:hover:bg-transparent"
              aria-label="Decrease device count"
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="min-w-[80px] text-center">
              <span className="font-display text-lg font-semibold tabular-nums">{devices}</span>
              <span className="ml-1 text-xs text-muted-foreground">devices</span>
            </div>
            <button
              onClick={increase}
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-background"
              aria-label="Increase device count"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 flex-1">
            {DEVICE_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setDevices(opt)}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                  devices === opt
                    ? 'bg-foreground text-background shadow-xs font-semibold'
                    : 'bg-surface text-muted-foreground hover:bg-border/40 hover:text-foreground'
                )}
              >
                {opt}
              </button>
            ))}
            <button
              onClick={() => setDevices(SALES_THRESHOLD)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                isSales
                  ? 'bg-foreground text-background shadow-xs font-semibold'
                  : 'bg-surface text-muted-foreground hover:bg-border/40 hover:text-foreground'
              )}
            >
              250+
            </button>
          </div>
        </div>

        {isSales ? (
          <p className="text-xs text-muted-foreground">
            Deployments of 250+ devices qualify for enterprise volume pricing.{' '}
            <a href="/#contact" className="font-medium text-brand-purple underline-offset-4 hover:underline">
              Talk to Enterprise Sales →
            </a>
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Price updates automatically across all available packages below.
          </p>
        )}
      </div>

      {/* Year Selection Dropdown (Positioned parallel in the same container, aligned above Complete Data Protection card) */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between">
          <label htmlFor="yearSelect" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Calendar className="h-4 w-4 text-brand-orange" />
            <span>Subscription Term</span>
          </label>
          {currentYearOption.discountPercent > 0 ? (
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 border border-emerald-500/20">
              Save {currentYearOption.discountPercent}%
            </span>
          ) : (
            <span className="text-xs font-medium text-muted-foreground">
              Standard rate
            </span>
          )}
        </div>

        <div>
          <Select
            value={String(years)}
            onValueChange={(val) => setYears(Number(val))}
          >
            <SelectTrigger id="yearSelect" className="h-11 w-full rounded-xl border-border bg-surface px-3.5 text-sm font-medium text-foreground">
              <SelectValue placeholder="Select license duration" />
            </SelectTrigger>
            <SelectContent>
              {YEAR_OPTIONS.map((opt) => (
                <SelectItem key={opt.years} value={String(opt.years)} className="text-sm">
                  <div className="flex items-center justify-between w-full gap-2">
                    <span className="font-medium">{opt.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-brand-orange shrink-0" />
          <span>
            {currentYearOption.discountPercent > 0
              ? `${currentYearOption.discountPercent}% multi-year discount applied to tiers 1 & 2`
              : 'Select up to 5 years for multi-year discounts'}
          </span>
        </p>
      </div>
    </div>
  );
}
