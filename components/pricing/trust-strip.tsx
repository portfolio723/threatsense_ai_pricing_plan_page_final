'use client';

import { CalendarClock, Gift, Lock, Headset } from 'lucide-react';

const ITEMS = [
  { icon: CalendarClock, label: 'Annual plans', sub: 'No monthly billing' },
  { icon: Gift, label: 'Free trial', sub: 'Try before committing' },
  { icon: Lock, label: 'Secure checkout', sub: 'Protected payments' },
  { icon: Headset, label: 'Enterprise support', sub: 'Talk to our team' },
];

export function TrustStrip() {
  return (
    <section className="border-b border-border/60 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <item.icon className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
