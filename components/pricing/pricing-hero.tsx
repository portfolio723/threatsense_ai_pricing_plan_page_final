'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] min-h-[calc(100dvh-4rem)] w-full flex-col items-center justify-center overflow-hidden border-b border-border/60"
    >
      {/* Hero Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          poster="/assets/images/bg-3-video-poster.jpg"
          className="h-full w-full object-cover object-center"
        >
          <source src="/assets/images/bg-3.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.04}px)` }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-brand-orange shadow-xs">
            <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
            Endpoint · Browser · SAP Data Security
          </div>

          {/* Staggered Word-Revealing Headline */}
          <h1 className="mt-4 sm:mt-6 font-display text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-balance text-foreground">
            <span className="inline-flex flex-wrap justify-center gap-x-[0.3em] gap-y-1 text-foreground">
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

          <p className="animate-fade-up stagger-3 mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-muted-foreground text-balance">
            Protect endpoints, browsers, and SAP data with a security plan built around your organization.
          </p>

          <div className="animate-fade-up stagger-4 mt-6 sm:mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/#plans" onClick={handleExploreClick} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-brand-orange text-white hover:bg-brand-orange-dark sm:w-auto shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-semibold"
              >
                Explore Plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            {onContactSales ? (
              <Button
                size="lg"
                variant="outline"
                onClick={onContactSales}
                className="w-full sm:w-auto border-border/80 hover:bg-surface text-foreground font-semibold"
              >
                Talk to Sales
              </Button>
            ) : (
              <Link href="/#plans" onClick={handleExploreClick} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-border/80 hover:bg-surface text-foreground font-semibold"
                >
                  Talk to Sales
                </Button>
              </Link>
            )}
          </div>

          <p className="animate-fade-up stagger-6 mt-4 sm:mt-6 text-xs text-muted-foreground">
            Annual plans only · Free trial available · No monthly commitment
          </p>
        </div>
      </div>
    </section>
  );
}
