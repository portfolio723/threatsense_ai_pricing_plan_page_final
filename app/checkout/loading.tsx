import { Loader2 } from 'lucide-react';

export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Header skeleton */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-36 animate-pulse rounded-md bg-muted/60" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-muted/60" />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation back and steps */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-5 w-32 animate-pulse rounded bg-muted/60" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-36 animate-pulse rounded-full bg-muted/50" />
            <div className="h-8 w-28 animate-pulse rounded-full bg-muted/50" />
          </div>
        </div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
          {/* Form placeholder */}
          <div className="space-y-6 rounded-2xl border border-border/70 bg-card p-6 sm:p-8">
            <div className="space-y-2">
              <div className="h-6 w-56 animate-pulse rounded bg-muted/70" />
              <div className="h-4 w-80 animate-pulse rounded bg-muted/40" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
              <div className="space-y-2">
                <div className="h-4 w-20 animate-pulse rounded bg-muted/50" />
                <div className="h-10 w-full animate-pulse rounded-md bg-muted/40" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-muted/50" />
                <div className="h-10 w-full animate-pulse rounded-md bg-muted/40" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="h-4 w-28 animate-pulse rounded bg-muted/50" />
                <div className="h-10 w-full animate-pulse rounded-md bg-muted/40" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-muted/50" />
                <div className="h-10 w-full animate-pulse rounded-md bg-muted/40" />
              </div>
            </div>
            <div className="h-11 w-full animate-pulse rounded-lg bg-brand-orange/20" />
          </div>

          {/* Order Summary placeholder */}
          <div className="space-y-6 rounded-2xl border border-border/70 bg-card p-6">
            <div className="h-5 w-32 animate-pulse rounded bg-muted/70" />
            <div className="space-y-3 pt-2">
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted/40" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted/40" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted/40" />
            </div>
            <div className="border-t border-border/60 pt-4 space-y-2">
              <div className="flex justify-between">
                <div className="h-4 w-20 animate-pulse rounded bg-muted/40" />
                <div className="h-4 w-16 animate-pulse rounded bg-muted/40" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-24 animate-pulse rounded bg-muted/40" />
                <div className="h-4 w-20 animate-pulse rounded bg-muted/40" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
