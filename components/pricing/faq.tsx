'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { FAQS } from '@/lib/pricing';
import { cn } from '@/lib/utils';

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24 lg:px-8 lg:py-28">
        <div className="lg:pt-2">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
            FAQs
          </p>
          <h2 className="mt-6 max-w-xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl">
            Questions, Answered
          </h2>
        </div>

        <div className="divide-y divide-border/70">
          {FAQS.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={faq.q} className="group">
                <button
                  type="button"
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-4 py-5 text-left outline-none transition-colors hover:text-brand-orange focus-visible:text-brand-orange sm:py-6"
                >
                  <span className={cn('w-6 shrink-0 pt-0.5 text-sm font-medium tabular-nums transition-colors', isOpen ? 'text-brand-orange' : 'text-muted-foreground')}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-base font-medium leading-6 sm:text-lg">{faq.q}</span>
                  <span className={cn('flex h-6 w-6 shrink-0 items-center justify-center text-brand-orange transition-transform duration-300', isOpen && 'rotate-180')}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div className={cn('grid transition-[grid-template-rows,opacity] duration-300 ease-out', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
                  <div className="overflow-hidden">
                    <p className="pb-6 pl-10 pr-8 text-sm leading-6 text-muted-foreground sm:text-base">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
