'use client';

import { Minus, Plus } from 'lucide-react';
import { DEVICE_OPTIONS, SALES_THRESHOLD } from '@/lib/pricing';
import { usePricing } from '@/lib/pricing-context';
import { cn } from '@/lib/utils';

export function DeviceSelector() {
  const { devices, setDevices } = usePricing();
  const isSales = devices >= SALES_THRESHOLD;

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
    <div className="flex flex-col items-center gap-4">
      <label className="text-sm font-medium text-muted-foreground">
        How many devices do you need to protect?
      </label>
      <div className="flex items-center gap-1 rounded-full border border-border bg-surface p-1">
        <button
          onClick={decrease}
          disabled={devices <= DEVICE_OPTIONS[0]}
          className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-background disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="Decrease device count"
        >
          <Minus className="h-4 w-4" />
        </button>
        <div className="min-w-[80px] text-center">
          <span className="font-display text-xl font-semibold tabular-nums">{devices}</span>
          <span className="ml-1 text-sm text-muted-foreground">devices</span>
        </div>
        <button
          onClick={increase}
          className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-background"
          aria-label="Increase device count"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {DEVICE_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => setDevices(opt)}
            className={cn(
              'rounded-full px-3 py-1 text-sm font-medium transition-colors',
              devices === opt
                ? 'bg-foreground text-background'
                : 'bg-surface text-muted-foreground hover:bg-border/40'
            )}
          >
            {opt}
          </button>
        ))}
        <button
          onClick={() => setDevices(SALES_THRESHOLD)}
          className={cn(
            'rounded-full px-3 py-1 text-sm font-medium transition-colors',
            isSales
              ? 'bg-foreground text-background'
              : 'bg-surface text-muted-foreground hover:bg-border/40'
          )}
        >
          250+
        </button>
      </div>
      {isSales && (
        <p className="text-sm text-muted-foreground">
          Need a larger deployment?{' '}
          <a href="/#contact" className="font-medium text-brand-purple underline-offset-4 hover:underline">
            Talk to Sales →
          </a>
        </p>
      )}
    </div>
  );
}
