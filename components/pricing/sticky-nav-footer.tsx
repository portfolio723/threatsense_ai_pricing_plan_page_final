'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

type SectionId = 'plans' | 'compare' | 'faq';

interface NavItem {
  id: SectionId;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'plans', label: 'Plans' },
  { id: 'compare', label: 'Compare' },
  { id: 'faq', label: 'FAQ' },
];

export function StickyNavFooter() {
  const [activeTab, setActiveTab] = useState<SectionId>('plans');
  const [isVisible, setIsVisible] = useState(false);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Determine if hero section has been scrolled past
      const heroElement = document.getElementById('hero');
      const heroHeight = heroElement ? heroElement.offsetHeight * 0.5 : 280;
      
      setIsVisible(scrollY > heroHeight);

      // If user recently clicked a tab, don't override active tab while smooth scrolling
      if (isClickScrolling.current) return;

      const plansEl = document.getElementById('plans');
      const compareEl = document.getElementById('compare');
      const faqEl = document.getElementById('faq');

      const windowHeight = window.innerHeight;
      const scrollCenter = scrollY + windowHeight * 0.35;

      const faqTop = faqEl ? faqEl.offsetTop : Infinity;
      const compareTop = compareEl ? compareEl.offsetTop : Infinity;
      const plansTop = plansEl ? plansEl.offsetTop : 0;

      if (faqEl && scrollCenter >= faqTop - 120) {
        setActiveTab('faq');
      } else if (compareEl && scrollCenter >= compareTop - 120) {
        setActiveTab('compare');
      } else if (plansEl && scrollCenter >= plansTop - 200) {
        setActiveTab('plans');
      } else {
        setActiveTab('plans');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const scrollToSection = (id: SectionId) => {
    setActiveTab(id);
    isClickScrolling.current = true;
    
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      aria-label="Floating section navigation"
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center',
        'transition-all duration-500 ease-out',
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto scale-100'
          : 'translate-y-10 opacity-0 pointer-events-none scale-95'
      )}
    >
      <div className="flex items-center gap-1 rounded-full border border-border/80 bg-background/90 p-1.5 shadow-xl shadow-black/10 backdrop-blur-xl ring-1 ring-black/5">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ease-out outline-none select-none',
                isActive
                  ? 'bg-brand-orange text-white shadow-sm ring-1 ring-brand-orange/30'
                  : 'text-muted-foreground hover:bg-brand-orange/10 hover:text-brand-orange'
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
