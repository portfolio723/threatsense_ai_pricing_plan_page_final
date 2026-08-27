'use client';

import { useState } from 'react';
import { PricingProvider } from '@/lib/pricing-context';
import { Navbar } from '@/components/pricing/navbar';
import { PricingHero } from '@/components/pricing/pricing-hero';
import { PricingGrid } from '@/components/pricing/pricing-grid';
import { FeatureComparison } from '@/components/pricing/feature-comparison';
import { ValueCards } from '@/components/pricing/value-cards';
import { TrustStrip } from '@/components/pricing/trust-strip';
import { FAQ } from '@/components/pricing/faq';
import { ContactSalesDialog } from '@/components/pricing/contact-sales-dialog';
import { StickyNavFooter } from '@/components/pricing/sticky-nav-footer';

export default function Home() {
  const [salesOpen, setSalesOpen] = useState(false);

  return (
    <PricingProvider>
      <div className="min-h-screen bg-background">
        <Navbar onContactSales={() => setSalesOpen(true)} />
        <main>
          <PricingHero onContactSales={() => setSalesOpen(true)} />
          <PricingGrid onContactSales={() => setSalesOpen(true)} />
          <FeatureComparison />
          <ValueCards />
          <TrustStrip />
          <FAQ />
        </main>
        <StickyNavFooter />
        <ContactSalesDialog open={salesOpen} onOpenChange={setSalesOpen} />
      </div>
    </PricingProvider>
  );
}
