'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onContactSales?: () => void;
}

export function Navbar({ onContactSales }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="ThreatSenseAI home">
          <Image
            src="/assets/images/logo-C122NXu5.png"
            alt="ThreatSenseAI"
            width={160}
            height={36}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#plans" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Plans
          </Link>
          <Link href="/#compare" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Compare
          </Link>
          <Link href="/#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            FAQ
          </Link>
        </nav>

        <div className="hidden items-center md:flex">
          <Button
            size="sm"
            onClick={onContactSales}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            Contact Us
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={cn('border-t border-border/60 md:hidden', open ? 'block' : 'hidden')}>
        <nav className="flex flex-col gap-1 px-4 py-4">
          <Link href="/#plans" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted" onClick={() => setOpen(false)}>
            Plans
          </Link>
          <Link href="/#compare" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted" onClick={() => setOpen(false)}>
            Compare
          </Link>
          <Link href="/#faq" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted" onClick={() => setOpen(false)}>
            FAQ
          </Link>
          <Button
            onClick={() => { setOpen(false); onContactSales?.(); }}
            className="mt-2 w-full bg-foreground text-background hover:bg-foreground/90"
          >
            Contact Us
          </Button>
        </nav>
      </div>
    </header>
  );
}
