'use client';

import { useEffect, useRef, useState, type ElementType } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import { Github, Mail, Phone, Globe } from 'lucide-react';
import type { Profile, Experience } from '@/types';

function CountUp({ value }: { value: string }) {
  const target = parseInt(value, 10) || 0;
  const suffix = value.replace(String(target), '');
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: v => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function About({
  profile,
  experiences,
}: {
  profile: Profile | null;
  experiences: Experience[];
}) {
  const startYear = experiences.length
    ? Math.min(...experiences.map(e => parseInt(e.start_date)))
    : 2018;
  const yearsExp = new Date().getFullYear() - startYear;

  const contacts = [
    profile?.email    && { icon: Mail,   label: profile.email,  href: `mailto:${profile.email}` },
    profile?.phone    && { icon: Phone,  label: profile.phone,  href: `tel:${profile.phone}` },
    profile?.github   && { icon: Github, label: profile.github.replace('https://github.com/', 'github.com/'), href: profile.github, external: true },
    profile?.portfolio_url && { icon: Globe, label: profile.portfolio_url.replace('https://', ''), href: profile.portfolio_url, external: true },
  ].filter(Boolean) as { icon: ElementType; label: string; href: string | null; external?: boolean }[];

  const stats = [
    { value: `${yearsExp}+`, label: 'Years Experience' },
    { value: `${experiences.length > 0 ? experiences.length : '2'}+`, label: 'Companies' },
    { value: '11+', label: 'Projects' },
    { value: '38+', label: 'Skills' },
  ];

  return (
    <div className="min-h-[calc(100vh-56px)] py-14 sm:py-20 px-4 sm:px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto">

        <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-10 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--accent)' }}>About</p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight" style={{ color: 'var(--text)' }}>
            {profile?.name ?? 'Full Stack Developer'}
          </h1>
          <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>{profile?.title ?? 'Full Stack Developer'}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">

          {/* Bio */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.15 }} className="md:col-span-2">
            <div className="card p-6 sm:p-8 h-full">
              <p className="text-sm font-semibold mb-3" style={{ color: 'var(--accent)' }}>
                {profile?.title ?? 'Full Stack Developer'}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', lineHeight: '1.75' }}>
                {profile?.bio ?? 'Full Stack Developer with 7+ years of experience designing and building scalable web and mobile applications.'}
              </p>

              {contacts.length > 0 && (
                <div className="mt-6 pt-6 space-y-3" style={{ borderTop: '1px solid var(--border)' }}>
                  {contacts.map(({ icon: Icon, label, href, external }) =>
                    href ? (
                      <a
                        key={label}
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm transition-colors group"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                      >
                        <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                          style={{ background: 'var(--surface-2)' }}>
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                        {label}
                      </a>
                    ) : (
                      <div key={label} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: 'var(--surface-2)' }}>
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                        {label}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4 content-start">
            {stats.map(s => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="card p-5 text-center transition-all duration-200 hover:-translate-y-0.5"
                style={{ cursor: 'default' }}
              >
                <p className="text-3xl sm:text-4xl font-serif font-bold tracking-tight" style={{ color: 'var(--accent)' }}>
                  <CountUp value={s.value} />
                </p>
                <p className="text-xs mt-1.5 font-medium" style={{ color: 'var(--text-faint)' }}>{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
