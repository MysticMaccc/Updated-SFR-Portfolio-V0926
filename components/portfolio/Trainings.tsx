'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { Training } from '@/types';

export default function Trainings({ trainings }: { trainings: Training[] }) {
  const grouped = trainings.reduce<Record<string, Training[]>>((acc, t) => {
    if (!acc[t.provider]) acc[t.provider] = [];
    acc[t.provider].push(t);
    return acc;
  }, {});

  const providerList = Object.entries(grouped);

  return (
    <div className="min-h-[calc(100vh-48px)] py-14 sm:py-20 px-5 sm:px-10 relative z-10" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1400px] mx-auto">

        {/* Section marker */}
        <div className="flex items-center justify-between mb-12 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="section-meta" style={{ color: 'var(--text-faint)' }}>[ 07 ] — Training</span>
          <span className="section-meta" style={{ color: 'var(--text-faint)' }}>Certifications</span>
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="heading-bold text-[clamp(2.5rem,7vw,6rem)]">COURSES</span>
          <span className="heading-outline-orange text-[clamp(2.5rem,7vw,6rem)]">&amp; CERTS</span>
          <p className="text-base mt-4 font-medium" style={{ color: 'var(--text-muted)' }}>
            {trainings.length} course{trainings.length !== 1 ? 's' : ''} · {providerList.length} provider{providerList.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Provider groups */}
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {providerList.map(([provider, courses], pi) => (
            <motion.div
              key={provider}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: pi * 0.06 }}
            >
              {/* Provider header */}
              <div className="flex items-center justify-between py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                <div className="flex items-center gap-4">
                  <span className="section-meta" style={{ color: 'var(--accent-2)' }}>
                    {String(pi + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text)' }}>
                    {provider}
                  </span>
                </div>
                <span className="text-xs font-medium" style={{ color: 'var(--text-faint)' }}>
                  {courses.length} course{courses.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Courses */}
              {courses.map(t => {
                const hasUrl = !!t.certificate_url;
                const Row = hasUrl ? 'a' : 'div';
                const rowProps = hasUrl
                  ? { href: t.certificate_url!, target: '_blank', rel: 'noopener noreferrer' }
                  : {};

                return (
                  <Row
                    key={t.id}
                    {...rowProps}
                    className="flex items-center justify-between py-4 pl-10 gap-4 transition-colors group"
                    style={{
                      borderBottom: '1px solid var(--border)',
                      textDecoration: 'none',
                      cursor: hasUrl ? 'pointer' : 'default',
                    }}
                    onMouseEnter={hasUrl ? (e: React.MouseEvent<HTMLElement>) => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--surface)';
                    } : undefined}
                    onMouseLeave={hasUrl ? (e: React.MouseEvent<HTMLElement>) => {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    } : undefined}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-snug transition-colors" style={{ color: 'var(--text-muted)' }}>
                        {t.title}
                      </p>
                      {t.year && (
                        <p className="text-xs font-medium mt-1" style={{ color: 'var(--text-faint)' }}>{t.year}</p>
                      )}
                    </div>

                    {hasUrl && (
                      <div className="flex items-center gap-2 flex-shrink-0 transition-colors" style={{ color: 'var(--text-faint)' }}>
                        <span className="text-xs font-semibold hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: 'var(--accent-2)' }}>
                          Open
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </Row>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
