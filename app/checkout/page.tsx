'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, Lock, CheckCircle2, XCircle, Loader2,
  Download, FileText, HelpCircle, Plus, Sparkles, SlidersHorizontal, ChevronDown,
} from 'lucide-react';
import { Navbar } from '@/components/pricing/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  PLANS,
  DEVICE_OPTIONS,
  YEAR_OPTIONS,
  ADD_ONS,
  getPlan,
  getPriceForDevices,
  formatINR,
  type PlanId,
  type AddOn,
} from '@/lib/pricing';

type Step = 'details' | 'payment' | 'processing' | 'success' | 'failure';

const TAX_RATE = 0.18;

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlanId = (searchParams.get('plan') || 'endpoint-security') as PlanId;
  const initialDevices = parseInt(searchParams.get('devices') || '5', 10);
  const initialYears = parseInt(searchParams.get('years') || '1', 10);

  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>(initialPlanId);
  const [devices, setDevices] = useState<number>(initialDevices);
  const [selectedYears, setSelectedYears] = useState<number>(initialYears);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  const [step, setStep] = useState<Step>('details');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [org, setOrg] = useState('');
  const [country, setCountry] = useState('in');
  const [primaryOS, setPrimaryOS] = useState('windows');
  const [gstin, setGstin] = useState('');

  const plan = getPlan(selectedPlanId) || PLANS[0];
  const isEnterprise = plan.salesOnly;

  const baseAnnualPrice = getPriceForDevices(plan, devices) ?? 0;
  const selectedDuration = YEAR_OPTIONS.find((d) => d.years === selectedYears) || YEAR_OPTIONS[0];
  const undiscountedPlanTotal = baseAnnualPrice * selectedDuration.years;
  const planDiscountAmount = Math.round(undiscountedPlanTotal * (selectedDuration.discountPercent / 100));
  const planSubtotal = undiscountedPlanTotal - planDiscountAmount;

  // Add-ons calculations
  const activeAddOns: AddOn[] = ADD_ONS.filter((a) => selectedAddOnIds.includes(a.id));
  const addOnsUndiscountedTotal = activeAddOns.reduce(
    (sum, addon) => sum + addon.pricePerDeviceYear * devices * selectedDuration.years,
    0
  );
  const addOnsDiscountAmount = Math.round(addOnsUndiscountedTotal * (selectedDuration.discountPercent / 100));
  const addOnsSubtotal = addOnsUndiscountedTotal - addOnsDiscountAmount;

  const subtotal = planSubtotal + addOnsSubtotal;
  const totalDiscount = planDiscountAmount + addOnsDiscountAmount;
  const monthlyEquivalent = Math.round(subtotal / selectedDuration.months);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;
  const orderId = `TS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2200);
  };

  const steps: { id: Step; label: string }[] = [
    { id: 'details', label: 'Details & Billing' },
    { id: 'payment', label: 'Payment' },
  ];
  const currentStepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Pricing
          </Link>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">Complete your purchase</h1>

          {/* Step indicator */}
          {step !== 'processing' && step !== 'success' && step !== 'failure' && (
            <div className="mt-6 flex items-center gap-2">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                      i <= currentStepIndex ? 'bg-brand-orange text-white' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className={`text-sm font-medium ${i <= currentStepIndex ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {s.label}
                  </span>
                  {i < steps.length - 1 && <div className="mx-2 h-px w-8 bg-border" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {(step === 'details' || step === 'payment') && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
            {/* Form area */}
            <div className="order-2 lg:order-1 space-y-6">
              {/* Step 1: Simplified Account & Billing in One Step */}
              {step === 'details' && (
                <div className="animate-fade-up space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
                  <div>
                    <h2 className="font-display text-xl font-semibold">Account &amp; Billing Information</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Essential information required for license provisioning, 24/7 customer support, and tax invoices.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Primary Contact */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jane@company.com"
                        />
                        <p className="text-[11px] text-muted-foreground">
                          License key and console credentials sent here
                        </p>
                      </div>
                    </div>

                    {/* Support & Organization Data */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Support Contact Number</Label>
                        <Input
                          id="phone"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                        />
                        <p className="text-[11px] text-muted-foreground">
                          For 24/7 emergency incident response &amp; escalation
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="org">Organization Name</Label>
                        <Input
                          id="org"
                          required
                          value={org}
                          onChange={(e) => setOrg(e.target.value)}
                          placeholder="Acme Corporation"
                        />
                        <p className="text-[11px] text-muted-foreground">
                          Tenant name for cloud console and billing invoice
                        </p>
                      </div>
                    </div>

                    {/* Environment & Location Data (Crucial for Customer Support & Future Improvements) */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="primaryOS">Primary Environment / OS</Label>
                        <Select value={primaryOS} onValueChange={setPrimaryOS}>
                          <SelectTrigger id="primaryOS">
                            <SelectValue placeholder="Select primary OS" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="windows">Windows (Desktops &amp; Servers)</SelectItem>
                            <SelectItem value="macos">macOS (Apple Silicon &amp; Intel)</SelectItem>
                            <SelectItem value="linux">Linux (Ubuntu / RHEL / Debian)</SelectItem>
                            <SelectItem value="hybrid">Multi-OS Hybrid Environment</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-[11px] text-muted-foreground">
                          Helps support team pre-package your agent installers
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country / Billing Jurisdiction</Label>
                        <Select value={country} onValueChange={setCountry}>
                          <SelectTrigger id="country">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in">India</SelectItem>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="de">Germany</SelectItem>
                            <SelectItem value="sg">Singapore</SelectItem>
                            <SelectItem value="ae">UAE</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-[11px] text-muted-foreground">
                          Used for tax invoices &amp; data residency compliance
                        </p>
                      </div>
                    </div>

                    {country === 'in' && (
                      <div className="space-y-2">
                        <Label htmlFor="gstin">
                          GSTIN <span className="font-normal text-muted-foreground">(Optional for B2B input tax credit)</span>
                        </Label>
                        <Input
                          id="gstin"
                          value={gstin}
                          onChange={(e) => setGstin(e.target.value)}
                          placeholder="22AAAAA0000A1Z5"
                        />
                      </div>
                    )}
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-brand-orange text-white hover:bg-brand-orange-dark shadow-xs"
                    onClick={() => setStep('payment')}
                  >
                    Continue to Payment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 'payment' && (
                <form onSubmit={handlePay} className="animate-fade-up space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
                  <div>
                    <h2 className="font-display text-xl font-semibold">Select Payment Method</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Choose your payment mode to complete purchase.</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay, Amex' },
                      { id: 'upi', label: 'UPI', desc: 'Google Pay, PhonePe, Paytm, BHIM' },
                      { id: 'netbanking', label: 'Net Banking', desc: 'All major Indian banks' },
                    ].map((method, i) => (
                      <label
                        key={method.id}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:border-brand-orange has-[:checked]:border-brand-orange has-[:checked]:bg-brand-orange/5"
                      >
                        <input type="radio" name="payment" defaultChecked={i === 0} className="h-4 w-4 accent-brand-orange" />
                        <div>
                          <p className="text-sm font-medium">{method.label}</p>
                          <p className="text-xs text-muted-foreground">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="rounded-xl bg-surface p-4">
                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Lock className="h-3.5 w-3.5 shrink-0" />
                      Payments are encrypted via 256-bit SSL. License keys and access credentials are generated immediately.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" size="lg" variant="outline" onClick={() => setStep('details')}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Details
                    </Button>
                    <Button type="submit" size="lg" className="flex-1 bg-brand-orange text-white hover:bg-brand-orange-dark">
                      Pay {formatINR(total)} Securely
                      <Lock className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    Official invoice will be delivered to {email ? email : 'your work email'}.
                  </p>
                </form>
              )}
            </div>

            {/* Order summary (interactive & sticky) */}
            <div className="order-1 lg:order-2">
              <div className="lg:sticky lg:top-24 space-y-5 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-brand-orange" />
                    Order Summary &amp; Config
                  </h3>
                  <span className="text-xs text-muted-foreground font-medium">Instant Update</span>
                </div>

                {/* Tier Selection Dropdown */}
                <div className="space-y-1.5">
                  <Label htmlFor="planTierSelect" className="text-xs font-semibold text-foreground">
                    Selected Security Tier
                  </Label>
                  <Select
                    value={selectedPlanId}
                    onValueChange={(val) => setSelectedPlanId(val as PlanId)}
                  >
                    <SelectTrigger id="planTierSelect" className="h-10 rounded-xl border-border bg-surface text-sm font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PLANS.filter((p) => !p.salesOnly).map((p) => (
                        <SelectItem key={p.id} value={p.id} className="text-sm">
                          <span className="font-medium">{p.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Devices & Years Dropdowns in parallel */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="devicesSelect" className="text-xs font-semibold text-foreground">
                      Devices
                    </Label>
                    <Select
                      value={String(devices)}
                      onValueChange={(val) => setDevices(Number(val))}
                    >
                      <SelectTrigger id="devicesSelect" className="h-10 rounded-xl border-border bg-surface text-sm font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DEVICE_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={String(opt)} className="text-sm">
                            {opt} devices
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="yearsSelect" className="text-xs font-semibold text-foreground">
                      Duration
                    </Label>
                    <Select
                      value={String(selectedYears)}
                      onValueChange={(val) => setSelectedYears(Number(val))}
                    >
                      <SelectTrigger id="yearsSelect" className="h-10 rounded-xl border-border bg-surface text-sm font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {YEAR_OPTIONS.map((opt) => (
                          <SelectItem key={opt.years} value={String(opt.years)} className="text-sm">
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Optional Add-Ons Dropdown */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="addonsDropdown" className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
                      Optional Add-Ons
                    </Label>
                    {activeAddOns.length > 0 && (
                      <span className="text-xs font-semibold text-brand-orange tabular-nums">
                        +{formatINR(addOnsSubtotal)}
                      </span>
                    )}
                  </div>

                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        id="addonsDropdown"
                        className="flex h-10 w-full items-center justify-between rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-border/80 focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <span className="truncate text-left">
                          {activeAddOns.length === 0
                            ? 'Select optional add-ons...'
                            : `${activeAddOns.length} add-on${activeAddOns.length > 1 ? 's' : ''} selected (${activeAddOns.map((a) => a.name.split(' ')[0]).join(', ')})`}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50 shrink-0 ml-2" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[320px] sm:w-[380px] p-2 space-y-1.5 rounded-xl border border-border bg-popover shadow-lg"
                      align="end"
                      sideOffset={6}
                    >
                      <div className="px-2.5 py-1.5 border-b border-border/60 flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground">Available Security Modules</span>
                        <span className="text-[10px] text-muted-foreground">{devices} dev · {selectedDuration.years} yr</span>
                      </div>
                      <div className="space-y-1 pt-1 max-h-[260px] overflow-y-auto">
                        {ADD_ONS.map((addon) => {
                          const isChecked = selectedAddOnIds.includes(addon.id);
                          const addonAnnualCost = addon.pricePerDeviceYear * devices;
                          const addonTotalCost = addonAnnualCost * selectedDuration.years * (1 - selectedDuration.discountPercent / 100);

                          return (
                            <label
                              key={addon.id}
                              className={`flex items-start gap-2.5 rounded-lg p-2.5 transition-colors cursor-pointer ${
                                isChecked
                                  ? 'bg-brand-orange/10 border border-brand-orange/30'
                                  : 'hover:bg-accent/60 border border-transparent'
                              }`}
                            >
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={() => toggleAddOn(addon.id)}
                                className="mt-0.5"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <p className="text-xs font-semibold text-foreground truncate">{addon.name}</p>
                                  <span className="text-xs font-semibold text-foreground whitespace-nowrap tabular-nums">
                                    +{formatINR(Math.round(addonTotalCost))}
                                  </span>
                                </div>
                                <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                                  {addon.shortDesc}
                                </p>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Pricing Calculation Breakdown */}
                <div className="space-y-2.5 border-t border-border pt-4 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {plan.name} ({devices} dev · {selectedDuration.years} yr)
                    </span>
                    <span className="font-medium tabular-nums">{formatINR(undiscountedPlanTotal)}</span>
                  </div>

                  {planDiscountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Multi-Year Term Discount ({selectedDuration.discountPercent}%)</span>
                      <span className="font-medium tabular-nums">-{formatINR(planDiscountAmount)}</span>
                    </div>
                  )}

                  {activeAddOns.length > 0 && (
                    <div className="flex justify-between text-foreground">
                      <span className="text-muted-foreground">
                        {activeAddOns.length} Add-on{activeAddOns.length > 1 ? 's' : ''} ({selectedDuration.years} yr)
                      </span>
                      <span className="font-medium tabular-nums">{formatINR(addOnsSubtotal)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium tabular-nums">{formatINR(subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (18% GST)</span>
                    <span className="font-medium tabular-nums">{formatINR(tax)}</span>
                  </div>

                  <div className="flex items-baseline justify-between border-t border-border pt-3">
                    <div>
                      <span className="font-semibold text-foreground text-base">Total Due</span>
                      <p className="text-[11px] text-muted-foreground">{formatINR(monthlyEquivalent)}/mo equivalent</p>
                    </div>
                    <span className="font-display text-2xl font-bold tabular-nums text-foreground">{formatINR(total)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-surface p-3 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5 shrink-0" />
                  Secure encrypted 256-bit payment
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-brand-orange" />
            <h2 className="mt-6 font-display text-2xl font-semibold">Processing Your Payment</h2>
            <p className="mt-2 text-sm text-muted-foreground">Please don&apos;t close this window.</p>
          </div>
        )}

        {step === 'success' && (
          <div className="animate-fade-up mx-auto max-w-lg py-16 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight">Payment Successful</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you for purchasing {plan.name} ({selectedDuration.years} Year license). Your order ID is{' '}
              <span className="font-mono font-semibold text-foreground">{orderId}</span>.
            </p>

            <div className="mt-8 rounded-xl border border-border bg-surface p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">License Details</p>
              <div className="mt-2 space-y-1 text-sm">
                <p><span className="text-muted-foreground">Plan:</span> {plan.name}</p>
                <p><span className="text-muted-foreground">Duration:</span> {selectedDuration.label}</p>
                <p><span className="text-muted-foreground">Devices:</span> {devices}</p>
                {activeAddOns.length > 0 && (
                  <p><span className="text-muted-foreground">Add-ons:</span> {activeAddOns.map((a) => a.name).join(', ')}</p>
                )}
                <p><span className="text-muted-foreground">Amount Paid:</span> {formatINR(total)}</p>
                <p><span className="text-muted-foreground">Status:</span> Active</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-brand-orange text-white hover:bg-brand-orange-dark">
                <Download className="mr-2 h-4 w-4" /> Download Agent Installer
              </Button>
              <Button size="lg" variant="outline">
                <FileText className="mr-2 h-4 w-4" /> Download Invoice
              </Button>
            </div>
          </div>
        )}

        {step === 'failure' && (
          <div className="animate-fade-up mx-auto max-w-lg py-16 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-danger/10">
              <XCircle className="h-10 w-10 text-danger" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight">Payment Didn&apos;t Go Through</h1>
            <p className="mt-3 text-muted-foreground">Your order hasn&apos;t been charged.</p>
            <div className="mx-auto mt-6 max-w-sm rounded-xl border border-border bg-surface p-6 text-left">
              <p className="text-sm font-medium">Possible reasons:</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Payment declined</li>
                <li>• Bank authentication failed</li>
                <li>• Session expired</li>
                <li>• Payment cancelled</li>
              </ul>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-brand-orange text-white hover:bg-brand-orange-dark" onClick={() => setStep('payment')}>
                Try Again
              </Button>
              <Button size="lg" variant="outline">
                Change Payment Method
              </Button>
              <Button size="lg" variant="ghost">
                <HelpCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin text-brand-orange" />
            <span>Loading checkout...</span>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}

