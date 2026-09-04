/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LaserFlow from './LaserFlow';

interface PricingHeroProps {
  onContactSales?: () => void;
}

export function PricingHero({ onContactSales }: PricingHeroProps = {}) {
  const [scrollY, setScrollY] = useState(0);
  const revealImgRef = useRef<HTMLImageElement | null>(null);

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
      className="relative flex min-h-[calc(100vh-4rem)] min-h-[calc(100dvh-4rem)] w-full flex-col items-center justify-center overflow-hidden border-b border-border/60 bg-white"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty('--mx', `${x}px`);
          el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
        }
      }}
      onMouseLeave={() => {
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty('--mx', '-9999px');
          el.style.setProperty('--my', '-9999px');
        }
      }}
    >
      {/* Background LaserFlow (Shifted slightly to the right of the dashboard) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <LaserFlow
          horizontalBeamOffset={0.22}
          verticalBeamOffset={-0.08}
          color="#FF6B00"
          backgroundColor="#FFFFFF"
          wispDensity={1.5}
          flowSpeed={0.85}
          verticalSizing={2.4}
          horizontalSizing={0.65}
          fogIntensity={0.7}
          fogScale={0.35}
          wispSpeed={22.0}
          wispIntensity={7.5}
          flowStrength={0.55}
          decay={1.2}
          falloffStart={1.3}
          fogFallSpeed={0.9}
        />
      </div>

      {/* Interactive Reveal Image Overlay */}
      <img
        ref={revealImgRef}
        src="/assets/images/d1.png"
        alt="ThreatSense AI Dashboard Reveal Effect"
        className="pointer-events-none select-none absolute w-full object-cover"
        style={
          {
            top: '-50%',
            zIndex: 5,
            mixBlendMode: 'multiply',
            opacity: 0.18,
            '--mx': '-9999px',
            '--my': '-9999px',
            WebkitMaskImage:
              'radial-gradient(circle at var(--mx) var(--my), rgba(0,0,0,1) 0px, rgba(0,0,0,0.9) 60px, rgba(0,0,0,0.5) 120px, rgba(0,0,0,0.2) 180px, rgba(0,0,0,0) 240px)',
            maskImage:
              'radial-gradient(circle at var(--mx) var(--my), rgba(0,0,0,1) 0px, rgba(0,0,0,0.9) 60px, rgba(0,0,0,0.5) 120px, rgba(0,0,0,0.2) 180px, rgba(0,0,0,0) 240px)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          } as React.CSSProperties
        }
      />

      {/* Content Container: Aligned with the max-w-5xl dashboard */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-start justify-center px-4 py-10 sm:px-6 sm:py-14 lg:px-8 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      >
        <div className="w-full max-w-3xl text-left">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-brand-orange-dark shadow-xs">
            <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
            Endpoint · Browser · SAP Data Security
          </div>

          {/* Staggered Word-Revealing Headline (Left-Aligned, Dark + Orange) */}
          <h1 className="mt-4 sm:mt-6 font-display text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-balance text-left text-neutral-900">
            <span className="inline-flex flex-wrap justify-start gap-x-[0.3em] gap-y-1 text-neutral-900">
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
            <span className="inline-flex flex-wrap justify-start gap-x-[0.3em] gap-y-1 font-accent text-brand-orange">
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

          <p className="animate-fade-up stagger-3 mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-neutral-600 text-left">
            Protect endpoints, browsers, and SAP data with a security plan built around your organization.
          </p>

          <div className="animate-fade-up stagger-4 mt-6 sm:mt-8 flex flex-col items-stretch sm:items-center justify-start gap-3 sm:flex-row">
            <Link href="/#plans" onClick={handleExploreClick} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-brand-orange text-white hover:bg-brand-orange-dark sm:w-auto shadow-md hover:shadow-lg shadow-brand-orange/25 transition-all duration-300 hover:-translate-y-0.5 font-semibold"
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
                className="w-full sm:w-auto border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-900 font-semibold shadow-xs"
              >
                Talk to Sales
              </Button>
            ) : (
              <Link href="/#plans" onClick={handleExploreClick} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-900 font-semibold shadow-xs"
                >
                  Talk to Sales
                </Button>
              </Link>
            )}
          </div>

          <p className="animate-fade-up stagger-6 mt-4 sm:mt-6 text-xs text-neutral-500 text-left">
            Annual plans only · Free trial available · No monthly commitment
          </p>
        </div>

        {/* Attached Dashboard Container with Laser Flow Border */}
        <div
          className="animate-fade-up stagger-5 mt-8 sm:mt-12 w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,107,0,0.25)]"
          style={{
            border: '2px solid #FF6B00',
            backgroundColor: '#120F17',
            zIndex: 6,
          }}
        >
          {/* Dashboard Window Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 hidden text-xs font-mono text-neutral-300 sm:inline">
                ThreatSense AI · Security Operations Center
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-orange">
              <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="hidden sm:inline">Live Threat Detection Active</span>
            </div>
          </div>

          {/* Attached Dashboard Image */}
          <div className="relative aspect-[982/520] sm:aspect-[982/480] w-full overflow-hidden bg-black/40">
            <img
              src="/assets/images/d1.png"
              alt="ThreatSense AI Security Operations Dashboard"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
