'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle2, Mail, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/pricing/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COMPANY_SIZES, SAP_ENVIRONMENTS, INDUSTRIES, getPlan, type PlanId } from '@/lib/pricing';

type Step = 'details' | 'verify' | 'success';

const PERSONAL_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];

export default function TrialPage() {
  const searchParams = useSearchParams();
  const planId = (searchParams.get('plan') || 'endpoint-security') as PlanId;
  const devices = parseInt(searchParams.get('devices') || '5', 10);
  const plan = getPlan(planId);

  const [step, setStep] = useState<Step>('details');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [country, setCountry] = useState('');
  const [industry, setIndustry] = useState('');
  const [sapEnv, setSapEnv] = useState('');

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

  const validateEmail = (value: string) => {
    const domain = value.split('@')[1]?.toLowerCase();
    if (!value) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
    if (domain && PERSONAL_EMAIL_DOMAINS.includes(domain)) {
      return 'Use your work email to continue. Personal email addresses aren\u2019t accepted.';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }
    setEmailError('');
    setStep('verify');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:py-24">
        {step === 'details' && (
          <div className="animate-fade-up">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Change plan
            </Link>

            <div className="mt-6">
              <h1 className="font-display text-3xl font-semibold tracking-tight">Start Your Free Trial</h1>
              <p className="mt-2 text-sm text-muted-foreground">It takes less than 2 minutes to get started.</p>
            </div>

            <div className="mt-6 rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange/10">
                  <ShieldCheck className="h-5 w-5 text-brand-orange" />
                </div>
                <div>
                  <p className="font-semibold">{plan.name}</p>
                  <p className="text-sm text-muted-foreground">{devices} devices · Trial access</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
              {/* Account section */}
              <div className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Your Account</h2>
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
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                  />
                  {emailError ? (
                    <p className="text-sm text-danger">{emailError}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">Use your work email. Personal email addresses aren&apos;t accepted.</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input id="phone" required placeholder="+91 98765 43210" />
                </div>
              </div>

              {/* Organization section */}
              <div className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Your Organization</h2>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" placeholder="e.g. IT Administrator" />
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
              </div>

              {/* Environment section (optional) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Your Environment</h2>
                  <span className="text-xs text-muted-foreground">Optional</span>
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
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
                  <Label>Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Current SAP Environment</Label>
                  <Select value={sapEnv} onValueChange={setSapEnv}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {SAP_ENVIRONMENTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Button type="submit" size="lg" className="w-full bg-brand-orange text-white hover:bg-brand-orange-dark">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  No monthly commitment. Your trial details will be sent to your business email.
                </p>
              </div>
            </form>
          </div>
        )}

        {step === 'verify' && (
          <div className="animate-fade-up text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10">
              <Mail className="h-8 w-8 text-brand-orange" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight">Check Your Inbox</h1>
            <p className="mt-3 text-muted-foreground">
              We&apos;ve sent a verification link to:
            </p>
            <p className="mt-1 font-semibold">{email}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Verify your email to activate your ThreatSenseAI trial.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-brand-orange text-white hover:bg-brand-orange-dark" onClick={() => setStep('success')}>
                <Mail className="mr-2 h-4 w-4" />
                Open Email
              </Button>
              <Button size="lg" variant="outline" onClick={() => setStep('details')}>
                Change Email
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="animate-fade-up text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight">Your Trial Is Ready</h1>
            <p className="mt-3 text-muted-foreground">You&apos;re all set to explore:</p>
            <div className="mx-auto mt-6 max-w-sm rounded-xl border border-border bg-surface p-6 text-left">
              <p className="font-display text-lg font-semibold">{plan.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{devices} Devices</p>
              <p className="mt-1 text-sm text-success">Trial activated</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-brand-orange text-white hover:bg-brand-orange-dark">
                Go to ThreatSenseAI
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                View Setup Guide
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
