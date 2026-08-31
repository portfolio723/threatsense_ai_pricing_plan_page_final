'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type TColorProp = string | string[];

export type ShineBorderProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> & {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children?: React.ReactNode;
};

export function ShineBorder({
  borderRadius = 16,
  borderWidth = 1.5,
  duration = 8,
  color = ['#FB923C', '#C084FC'],
  className,
  children,
  ...props
}: ShineBorderProps) {
  const colorString = Array.isArray(color) ? color.join(',') : color;

  return (
    <div
      style={
        {
          '--border-radius': `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        'relative w-full rounded-[--border-radius]',
        className,
      )}
      {...props}
    >
      <div
        style={
          {
            '--border-width': `${borderWidth}px`,
            '--border-radius': `${borderRadius}px`,
            '--duration': `${duration}s`,
            '--mask-linear-gradient': `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            '--background-radial-gradient': `radial-gradient(transparent, transparent, ${colorString}, transparent, transparent)`,
          } as React.CSSProperties
        }
        className={cn(
          'pointer-events-none absolute inset-0 size-full rounded-[--border-radius] p-[--border-width]',
          'before:absolute before:inset-0 before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position]',
          'before:content-[""]',
          'before:![-webkit-mask-composite:xor] before:![mask-composite:exclude]',
          'before:[background-image:var(--background-radial-gradient)] before:[background-size:300%_300%]',
          'before:[mask:var(--mask-linear-gradient)] before:[-webkit-mask:var(--mask-linear-gradient)]',
          'motion-safe:before:animate-shine',
        )}
      />
      {children}
    </div>
  );
}

export function ShineBorderDemo() {
  return (
    <ShineBorder
      className="relative flex h-[350px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm"
      color={['#FB923C', '#C084FC']}
    >
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-r from-brand-orange to-brand-purple bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent">
        Shine Border Animation
      </span>
      <p className="mt-2 text-sm text-muted-foreground">Glowing orange &amp; purple animated border</p>
    </ShineBorder>
  );
}

export default ShineBorder;
