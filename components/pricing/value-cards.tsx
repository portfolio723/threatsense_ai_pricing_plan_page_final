'use client';

import {
  Lightbulb,
  UserRoundSearch,
  Shield,
  UsersRound,
  Sprout,
  Handshake,
  type LucideIcon,
} from 'lucide-react';

interface Value {
  title: string;
  description: string;
  icon: LucideIcon;
}

const VALUES: Value[] = [
  {
    title: 'Innovation',
    description: 'We turn emerging threats into smarter, more proactive protection for modern teams.',
    icon: Lightbulb,
  },
  {
    title: 'Customer',
    description: 'We listen closely and shape every security experience around the people who use it.',
    icon: UserRoundSearch,
  },
  {
    title: 'Integrity',
    description: 'We build trust through clear decisions, responsible protection, and honest communication.',
    icon: Shield,
  },
  {
    title: 'Teamwork',
    description: 'We bring security, IT, and business teams together around one shared standard of care.',
    icon: UsersRound,
  },
  {
    title: 'Adaptability',
    description: 'We stay ready for change so your protection can keep pace with new tools and new risks.',
    icon: Sprout,
  },
  {
    title: 'Commitment',
    description: 'We stay with you beyond deployment, helping your organization protect what matters most.',
    icon: Handshake,
  },
];

export function ValueCards() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
            Our values
          </p>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            What guides our work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-balance">
            Security is stronger when it is built with clarity, care, and a shared sense of responsibility.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <article
                key={value.title}
                tabIndex={0}
                className="group relative min-h-[230px] overflow-hidden rounded-xl bg-surface px-7 py-8 outline-none transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/10 focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <Icon className="h-9 w-9 stroke-[1.5] text-brand-orange transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-x-7 bottom-7 transition-transform duration-300 group-hover:-translate-y-12 group-focus-visible:-translate-y-12">
                  <h3 className="font-display text-2xl font-semibold tracking-tight">{value.title}</h3>
                </div>
                <p className="absolute inset-x-7 bottom-7 translate-y-6 text-sm leading-6 text-foreground/70 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
