'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { COMPANY_SIZES, SAP_ENVIRONMENTS } from '@/lib/pricing';

interface ContactSalesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactSalesDialog({ open, onOpenChange }: ContactSalesDialogProps) {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => setSubmitted(false), 300);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else onOpenChange(v); }}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        {submitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <h2 className="mt-4 font-display text-xl font-semibold">
              Thanks — We&apos;ve Got Your Request
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A ThreatSenseAI specialist will contact you shortly.
            </p>
            <Button onClick={handleClose} className="mt-6">
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Let&apos;s Build Your Security Plan</DialogTitle>
              <DialogDescription>
                Tell us about your environment and our team will recommend the right deployment.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cs-firstName">First Name</Label>
                  <Input id="cs-firstName" required placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cs-lastName">Last Name</Label>
                  <Input id="cs-lastName" required placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cs-email">Business Email</Label>
                <Input id="cs-email" type="email" required placeholder="you@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cs-phone">Phone</Label>
                <Input id="cs-phone" required placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cs-org">Organization</Label>
                <Input id="cs-org" required placeholder="Acme Corporation" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cs-designation">Designation</Label>
                  <Input id="cs-designation" placeholder="IT Administrator" />
                </div>
                <div className="space-y-2">
                  <Label>Company Size</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {COMPANY_SIZES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cs-devices">Number of Devices</Label>
                  <Input id="cs-devices" type="number" min={1} placeholder="250" />
                </div>
                <div className="space-y-2">
                  <Label>SAP Environment</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {SAP_ENVIRONMENTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cs-message">Message</Label>
                <Textarea id="cs-message" placeholder="Tell us about your requirements..." rows={3} />
              </div>
              <Button type="submit" className="w-full bg-brand-purple text-white hover:bg-brand-purple-dark">
                Talk to Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
