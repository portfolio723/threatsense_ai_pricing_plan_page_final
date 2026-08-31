'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 250,
  duration = 8,
  anchor = 90,
  borderWidth = 2,
  colorFrom = '#FB923C',
  colorTo = '#C084FC',
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          '--size': size,
          '--duration': duration,
          '--anchor': anchor,
          '--border-width': borderWidth,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit]',
        className,
      )}
    >
      {/* Standard Magic UI border-beam (offset-path) */}
      <div
        className={cn(
          'absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]',
          '![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]',
          '[-webkit-mask-clip:padding-box,border-box] [-webkit-mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]',
          'after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]',
        )}
      />

      {/* GPU-accelerated rotating gradient beam layer ensuring 100% cross-browser fidelity */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
        style={{
          padding: `${borderWidth}px`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      >
        <div
          className="absolute -inset-[150%] will-change-transform"
          style={{
            animation: `border-spin ${duration}s linear infinite`,
            animationDelay: `-${delay}s`,
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 55deg, ${colorFrom} 115deg, ${colorTo} 165deg, ${colorFrom} 215deg, transparent 270deg, transparent 360deg)`,
          }}
        />
      </div>
    </div>
  );
}

export function BorderBeamDemo() {
  return (
    <div className="relative flex h-[350px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-r from-brand-orange to-brand-purple bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent">
        Border Beam Animation
      </span>
      <p className="mt-2 text-sm text-muted-foreground">Orange and Purple traveling light beam</p>
      <BorderBeam size={280} duration={8} colorFrom="#FB923C" colorTo="#C084FC" borderWidth={2} />
    </div>
  );
}

export default BorderBeam;
