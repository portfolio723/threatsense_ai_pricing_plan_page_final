'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, Lock, CheckCircle2, XCircle, Loader2,
  ShieldCheck, Download, FileText, HelpCircle,
} from 'lucide-react';
import { Navbar } from '@/components/pricing/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COMPANY_SIZES, getPlan, getPriceForDevices, formatINR, type PlanId } from '@/lib/pricing';

type Step = 'account' | 'billing' | 'payment' | 'processing' | 'success' | 'failure';

const TAX_RATE = 0.18;

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const planId = (searchParams.get('plan') || 'endpoint-security') as PlanId;
  const devices = parseInt(searchParams.get('devices') || '5', 10);
  const plan = getPlan(planId);

  const [step, setStep] = useState<Step>('account');
  const [sameAsCompany, setSameAsCompany] = useState(false);
  const [country, setCountry] = useState('in');

  if (!plan) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <p className="text-muted-foreground">Plan not found.</p>
          <Link href="/"><Button className="mt-4">Back to Pricing</Button></Link>
        </div>
      </div>
    );
  }

  const price = getPriceForDevices(plan, devices) ?? 0;
  const tax = Math.round(price * TAX_RATE);
  const total = price + tax;
  const orderId = `TS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2200);
  };

  const steps: { id: Step; label: string }[] = [
    { id: 'account', label: 'Account' },
    { id: 'billing', label: 'Billing' },
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

        {(step === 'account' || step === 'billing' || step === 'payment') && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
            {/* Form area */}
            <div className="order-2 lg:order-1">
              {step === 'account' && (
                <div className="animate-fade-up space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
                  <div>
                    <h2 className="font-display text-xl font-semibold">Your Details</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Tell us about yourself and your organization.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <Input id="email" type="email" required placeholder="you@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Number</Label>
                    <Input id="phone" required placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" placeholder="IT Administrator" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org">Organization Name</Label>
                    <Input id="org" required placeholder="Acme Corporation" />
                  </div>
                  <div className="space-y-2">
                    <Label>Company Size</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select company size" /></SelectTrigger>
                      <SelectContent>
                        {COMPANY_SIZES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button size="lg" className="w-full" onClick={() => setStep('billing')}>
                    Continue to Billing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {step === 'billing' && (
                <div className="animate-fade-up space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
                  <div>
                    <h2 className="font-display text-xl font-semibold">Billing Information</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Where should we send your invoice?</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="sameAsCompany" checked={sameAsCompany} onCheckedChange={(v) => setSameAsCompany(v === true)} />
                    <Label htmlFor="sameAsCompany" className="text-sm font-normal cursor-pointer">
                      Billing details are the same as company details
                    </Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingOrg">Company / Organization</Label>
                    <Input id="billingOrg" required placeholder="Acme Corporation" disabled={sameAsCompany} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingEmail">Billing Email</Label>
                    <Input id="billingEmail" type="email" required placeholder="billing@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Billing Address</Label>
                    <Input id="address" required placeholder="123 Business Park, Suite 400" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required placeholder="Mumbai" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" required placeholder="Maharashtra" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                          <SelectItem value="sg">Singapore</SelectItem>
                          <SelectItem value="ae">UAE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal">Postal Code</Label>
                      <Input id="postal" required placeholder="400001" />
                    </div>
                  </div>
                  {country === 'in' && (
                    <div className="space-y-2">
                      <Label htmlFor="gstin">GSTIN <span className="text-muted-foreground font-normal">(optional)</span></Label>
                      <Input id="gstin" placeholder="22AAAAA0000A1Z5" />
                    </div>
                  )}
                  <div className="flex gap-3">
                    <Button size="lg" variant="outline" onClick={() => setStep('account')}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button size="lg" className="flex-1" onClick={() => setStep('payment')}>
                      Continue to Payment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <form onSubmit={handlePay} className="animate-fade-up space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
                  <div>
                    <h2 className="font-display text-xl font-semibold">Secure Payment</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Choose your preferred payment method.</p>
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

                  <div className="rounded-lg bg-surface p-4">
                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Lock className="h-3.5 w-3.5" />
                      Your payment is processed securely. We do not store your card details.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" size="lg" variant="outline" onClick={() => setStep('billing')}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit" size="lg" className="flex-1 bg-brand-orange text-white hover:bg-brand-orange-dark">
                      Pay {formatINR(total)} Securely
                      <Lock className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    You&apos;ll receive your invoice after successful payment.
                  </p>
                </form>
              )}
            </div>

            {/* Order summary (sticky) */}
            <div className="order-1 lg:order-2">
              <div className="lg:sticky lg:top-24 rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-semibold">Order Summary</h3>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange/10">
                    <ShieldCheck className="h-5 w-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-semibold">{plan.name}</p>
                    <p className="text-sm text-muted-foreground">{devices} devices · Annual</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium tabular-nums">{formatINR(price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (18% GST)</span>
                    <span className="font-medium tabular-nums">{formatINR(tax)}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="font-semibold">Total</span>
                    <span className="font-display text-xl font-semibold tabular-nums">{formatINR(total)}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 rounded-lg bg-surface p-3 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5 shrink-0" />
                  Secure encrypted payment
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
            <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight">You&apos;re Protected</h1>
            <p className="mt-3 text-muted-foreground">
              Your ThreatSenseAI plan has been successfully activated.
            </p>
            <div className="mx-auto mt-6 max-w-sm rounded-xl border border-border bg-surface p-6 text-left">
              <p className="font-display text-lg font-semibold">{plan.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{devices} devices</p>
              <p className="text-sm text-muted-foreground">Annual plan</p>
              <p className="mt-2 text-sm font-medium">Order #{orderId}</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-brand-orange text-white hover:bg-brand-orange-dark">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
              <Button size="lg" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View Setup Guide
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
