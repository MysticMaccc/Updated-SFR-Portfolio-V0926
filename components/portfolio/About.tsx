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

export default function About({ profile, experiences }: { profile: Profile | null; experiences: Experience[] }) {
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

  const metaRows = [
    { key: 'Based in',    value: 'Philippines' },
    { key: 'Discipline',  value: profile?.title ?? 'Full Stack Developer' },
    { key: 'Availability', value: 'Open to opportunities' },
  ];

  return (
    <div className="min-h-[calc(100vh-48px)] py-14 sm:py-20 px-5 sm:px-10 relative z-10" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1400px] mx-auto">

        {/* Section marker */}
        <div className="flex items-center justify-between mb-12 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="section-meta" style={{ color: 'var(--text-faint)' }}>[ 02 ] — About</span>
          <span className="section-meta" style={{ color: 'var(--text-faint)' }}>Chapter One</span>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left: heading + stats */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
            >
              <span className="heading-bold text-[clamp(3rem,8vw,7rem)]">{yearsExp}+ YEARS</span>
              <span className="heading-outline-orange text-[clamp(3rem,8vw,7rem)]">OF DESIGN</span>
              <span className="heading-bold text-[clamp(3rem,8vw,7rem)]">AND CODE</span>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-px mt-10"
              style={{ border: '1px solid var(--border)' }}
            >
              {stats.map(s => (
                <div key={s.label} className="p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="heading-bold text-3xl sm:text-4xl" style={{ color: 'var(--accent-2)' }}>
                    <CountUp value={s.value} />
                  </p>
                  <p className="text-xs font-medium uppercase tracking-wider mt-2" style={{ color: 'var(--text-faint)' }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: bio + metadata table */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}
            >
              {profile?.bio ?? 'Full Stack Developer with 7+ years of experience designing and building scalable web and mobile applications. I love bringing ideas to life with thoughtful design and code, making things that are fast, modern, and easy to use.'}
            </motion.p>

            {/* Metadata table */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {metaRows.map(row => (
                <div key={row.key} className="flex items-center justify-between py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>{row.key}</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{row.value}</span>
                </div>
              ))}

              {/* Contacts */}
              {contacts.map(({ icon: Icon, label, href, external }) => (
                <div key={label} className="flex items-center justify-between py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--text-faint)' }} />
                  {href ? (
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-sm font-medium transition-colors"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-2)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{label}</span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
