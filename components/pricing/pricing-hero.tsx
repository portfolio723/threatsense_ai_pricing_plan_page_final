'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PricingHero() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" />
      <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/10 blur-[120px]" />
      <div className="absolute right-1/4 top-20 h-[300px] w-[400px] translate-x-1/2 rounded-full bg-brand-purple/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="animate-fade-up inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
            Endpoint · Browser · SAP Data Security
          </p>

          <h1 className="animate-fade-up stagger-1 mt-6 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Security That Scales{' '}
            <span className="font-accent text-brand-orange">With Your Business</span>
          </h1>

          <p className="animate-fade-up stagger-2 mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-balance">
            Protect endpoints, browsers, and SAP data with a security plan built around your organization.
          </p>

          <p className="animate-fade-up stagger-3 mt-3 text-sm text-muted-foreground">
            Choose your protection level, select your devices, and start securing your environment.
          </p>

          <div className="animate-fade-up stagger-4 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/#plans">
              <Button size="lg" className="w-full bg-brand-orange text-white hover:bg-brand-orange-dark sm:w-auto">
                Explore Plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/#contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Talk to Sales
              </Button>
            </Link>
          </div>

          <p className="animate-fade-up stagger-5 mt-6 text-xs text-muted-foreground">
            Annual plans only · Free trial available · No monthly commitment
          </p>
        </div>
      </div>
    </section>
  );
}
