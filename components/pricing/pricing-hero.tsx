'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingHeroProps {
  onContactSales?: () => void;
}

export function PricingHero({ onContactSales }: PricingHeroProps = {}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('plans');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', '/#plans');
    }
  };

  const regularWords = ['Security', 'That', 'Scales'];
  const accentWords = ['With', 'Your', 'Business'];

  return (
    <section id="hero" className="relative overflow-hidden border-b border-border/60">
      {/* Parallax Background Grid */}
      <div
        className="absolute inset-0 bg-grid bg-grid-fade opacity-50 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />

      {/* Parallax Glow Spheres */}
      <div
        className="absolute left-1/2 top-0 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/15 blur-[120px] will-change-transform transition-transform duration-75"
        style={{ transform: `translate(calc(-50% + ${scrollY * 0.05}px), calc(-50% + ${scrollY * 0.25}px))` }}
      />
      <div
        className="absolute right-1/4 top-20 h-[320px] w-[420px] translate-x-1/2 rounded-full bg-brand-purple/15 blur-[120px] will-change-transform transition-transform duration-75"
        style={{ transform: `translate(calc(50% - ${scrollY * 0.08}px), ${scrollY * 0.35}px)` }}
      />
      <div
        className="absolute left-1/6 bottom-10 h-[240px] w-[300px] rounded-full bg-brand-orange/10 blur-[90px] will-change-transform transition-transform duration-75"
        style={{ transform: `translateY(${-scrollY * 0.18}px)` }}
      />

      <div
        className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="animate-fade-up inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
            Endpoint · Browser · SAP Data Security
          </p>

          {/* Staggered Word-Revealing Headline */}
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-balance">
            <span className="inline-flex flex-wrap justify-center gap-x-[0.3em] gap-y-1">
              {regularWords.map((word, idx) => (
                <span key={word} className="inline-block overflow-hidden py-1">
                  <span
                    className="inline-block animate-word-reveal opacity-0"
                    style={{ animationDelay: `${120 + idx * 90}ms`, animationFillMode: 'forwards' }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </span>{' '}
            <span className="inline-flex flex-wrap justify-center gap-x-[0.3em] gap-y-1 font-accent text-brand-orange">
              {accentWords.map((word, idx) => (
                <span key={word} className="inline-block overflow-hidden py-1">
                  <span
                    className="inline-block animate-word-reveal opacity-0"
                    style={{
                      animationDelay: `${120 + (regularWords.length + idx) * 90}ms`,
                      animationFillMode: 'forwards',
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <p className="animate-fade-up stagger-3 mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-balance">
            Protect endpoints, browsers, and SAP data with a security plan built around your organization.
          </p>

          <p className="animate-fade-up stagger-4 mt-3 text-sm text-muted-foreground">
            Choose your protection level, select your devices, and start securing your environment.
          </p>

          <div className="animate-fade-up stagger-5 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/#plans" onClick={handleExploreClick}>
              <Button size="lg" className="w-full bg-brand-orange text-white hover:bg-brand-orange-dark sm:w-auto shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                Explore Plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            {onContactSales ? (
              <Button
                size="lg"
                variant="outline"
                onClick={onContactSales}
                className="w-full sm:w-auto border-border/80 hover:bg-surface"
              >
                Talk to Sales
              </Button>
            ) : (
              <Link href="/#plans" onClick={handleExploreClick}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-border/80 hover:bg-surface">
                  Talk to Sales
                </Button>
              </Link>
            )}
          </div>

          <p className="animate-fade-up stagger-6 mt-6 text-xs text-muted-foreground">
            Annual plans only · Free trial available · No monthly commitment
          </p>
        </div>
      </div>
    </section>
  );
}
