'use client';

import { Monitor, Calendar } from 'lucide-react';
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

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 items-stretch">
      {/* Device Selector (Spanning 2 columns to align directly above Tier 1 & Tier 2 cards) */}
      <div className="flex flex-col justify-between gap-3 rounded-xl border border-border/80 bg-card p-3.5 sm:p-4 shadow-xs md:col-span-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Monitor className="h-3.5 w-3.5 text-brand-orange" />
            <span>Protected Devices</span>
          </span>
          <span className="font-display text-xs sm:text-sm font-semibold text-foreground">
            {isSales ? '250+ (Enterprise)' : `${devices} Devices`}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {DEVICE_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setDevices(opt)}
              className={cn(
                'h-9 px-3.5 rounded-lg text-xs font-medium transition-colors',
                devices === opt
                  ? 'bg-foreground text-background font-semibold shadow-xs'
                  : 'bg-surface text-muted-foreground hover:bg-border/60 hover:text-foreground'
              )}
            >
              {opt}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setDevices(SALES_THRESHOLD)}
            className={cn(
              'h-9 px-3.5 rounded-lg text-xs font-medium transition-colors',
              isSales
                ? 'bg-foreground text-background font-semibold shadow-xs'
                : 'bg-surface text-muted-foreground hover:bg-border/60 hover:text-foreground'
            )}
          >
            250+
          </button>
        </div>
      </div>

      {/* Year Selection Dropdown (Aligned directly above Complete Data Protection card) */}
      <div className="flex flex-col justify-between gap-3 rounded-xl border border-border/80 bg-card p-3.5 sm:p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <label htmlFor="yearSelect" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 text-brand-orange" />
            <span>Subscription Term</span>
          </label>
          {currentYearOption.discountPercent > 0 ? (
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 border border-emerald-500/20">
              Save {currentYearOption.discountPercent}%
            </span>
          ) : (
            <span className="text-[11px] font-medium text-muted-foreground">
              Standard
            </span>
          )}
        </div>

        <Select
          value={String(years)}
          onValueChange={(val) => setYears(Number(val))}
        >
          <SelectTrigger id="yearSelect" className="h-9 w-full rounded-lg border-border bg-surface px-3 text-xs font-medium text-foreground">
            <SelectValue placeholder="Select term" />
          </SelectTrigger>
          <SelectContent>
            {YEAR_OPTIONS.map((opt) => (
              <SelectItem key={opt.years} value={String(opt.years)} className="text-xs">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

