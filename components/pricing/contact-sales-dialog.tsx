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
import { SAP_ENVIRONMENTS } from '@/lib/pricing';

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
      <DialogContent className="max-h-[92vh] max-w-lg overflow-y-auto p-5 sm:p-6">
        {submitted ? (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h2 className="mt-3.5 font-display text-xl font-semibold">
              Request Received
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground max-w-sm">
              Our enterprise security architect will reach out within 2 hours with customized architecture and pricing.
            </p>
            <Button onClick={handleClose} className="mt-5 bg-brand-purple text-white hover:bg-brand-purple-dark">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="pb-1">
              <DialogTitle className="font-display text-xl font-semibold">Contact Enterprise Sales</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Get custom SAP deployment quotes, multi-year volume pricing, and architecture reviews.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              {/* Row 1: Full Name and Business Email side by side */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="cs-fullName" className="text-xs font-medium text-foreground">Full Name</Label>
                  <Input id="cs-fullName" required placeholder="Jane Doe" className="h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cs-email" className="text-xs font-medium text-foreground">Business Email</Label>
                  <Input id="cs-email" type="email" required placeholder="jane@company.com" className="h-9 text-sm" />
                </div>
              </div>

              {/* Row 2: Phone Number and Organization side by side */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="cs-phone" className="text-xs font-medium text-foreground">Phone Number</Label>
                  <Input id="cs-phone" required placeholder="+91 98765 43210" className="h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cs-org" className="text-xs font-medium text-foreground">Organization</Label>
                  <Input id="cs-org" required placeholder="Acme Corporation" className="h-9 text-sm" />
                </div>
              </div>

              {/* Row 3: Protected Devices and SAP Environment side by side */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="cs-devices" className="text-xs font-medium text-foreground">Estimated Devices</Label>
                  <Input id="cs-devices" type="number" min={1} placeholder="250+" className="h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cs-sap" className="text-xs font-medium text-foreground">SAP Environment</Label>
                  <Select>
                    <SelectTrigger id="cs-sap" className="h-9 text-sm">
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      {SAP_ENVIRONMENTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 4: Requirements Message (compact) */}
              <div className="space-y-1.5">
                <Label htmlFor="cs-message" className="text-xs font-medium text-foreground">
                  Requirements / Notes <span className="font-normal text-muted-foreground">(Optional)</span>
                </Label>
                <Textarea
                  id="cs-message"
                  placeholder="Tell us about your compliance timeline or SAP landscape..."
                  rows={2}
                  className="text-sm resize-none min-h-[56px] py-1.5"
                />
              </div>

              <Button type="submit" size="default" className="w-full bg-brand-purple text-white hover:bg-brand-purple-dark mt-2 shadow-xs">
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
