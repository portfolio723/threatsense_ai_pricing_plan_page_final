'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { PlanId } from '@/lib/pricing';

interface PricingState {
  devices: number;
  setDevices: (n: number) => void;
  years: number;
  setYears: (y: number) => void;
  selectedPlan: PlanId | null;
  setSelectedPlan: (id: PlanId | null) => void;
}

const PricingContext = createContext<PricingState | null>(null);

export function PricingProvider({ children }: { children: ReactNode }) {
  const [devices, setDevicesState] = useState(5);
  const [years, setYearsState] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);

  const setDevices = useCallback((n: number) => {
    setDevicesState(n);
  }, []);

  const setYears = useCallback((y: number) => {
    setYearsState(y);
  }, []);

  return (
    <PricingContext.Provider value={{ devices, setDevices, years, setYears, selectedPlan, setSelectedPlan }}>
      {children}
    </PricingContext.Provider>
  );
}

export function usePricing() {
  const ctx = useContext(PricingContext);
  if (!ctx) throw new Error('usePricing must be used within PricingProvider');
  return ctx;
}
