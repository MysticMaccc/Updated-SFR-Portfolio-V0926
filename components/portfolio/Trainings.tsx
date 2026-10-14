'use client';

import { motion } from 'framer-motion';
import { ExternalLink, BookOpen } from 'lucide-react';
import type { Training } from '@/types';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Trainings({ trainings }: { trainings: Training[] }) {
  const grouped = trainings.reduce<Record<string, Training[]>>((acc, t) => {
    if (!acc[t.provider]) acc[t.provider] = [];
    acc[t.provider].push(t);
    return acc;
  }, {});

  return (
    <div className="min-h-[calc(100vh-56px)] py-14 sm:py-20 px-4 sm:px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto">

        <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-10 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--accent)' }}>Training</p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Certifications</h1>
          <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>
            {trainings.length} course{trainings.length !== 1 ? 's' : ''} from {Object.keys(grouped).length} provider{Object.keys(grouped).length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        <div className="space-y-5">
          {Object.entries(grouped).map(([provider, courses]) => (
            <motion.div
              key={provider}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="card overflow-hidden"
            >
              {/* Provider header */}
              <div className="px-5 sm:px-6 py-3.5 flex items-center gap-2.5"
                style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--accent-dim)', border: '1px solid rgba(200,168,106,0.2)' }}>
                  <BookOpen className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text)' }}>{provider}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>
                    {courses.length} course{courses.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Courses */}
              <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
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
                      className={[
                        'flex items-center justify-between px-5 sm:px-6 py-4 gap-3 transition-colors',
                        hasUrl ? 'cursor-pointer group' : '',
                      ].join(' ')}
                      style={{ background: 'transparent' }}
                      onMouseEnter={hasUrl ? (e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)'; } : undefined}
                      onMouseLeave={hasUrl ? (e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; } : undefined}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-snug font-medium transition-colors"
                          style={{ color: 'var(--text)' }}>
                          {t.title}
                        </p>
                        {t.year && (
                          <p className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>{t.year}</p>
                        )}
                      </div>

                      {hasUrl && (
                        <div className="flex-shrink-0 flex items-center gap-1.5 transition-colors"
                          style={{ color: 'var(--text-faint)' }}>
                          <span className="text-xs font-medium hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: 'var(--accent)' }}>
                            Open
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover:text-[var(--accent)]" />
                        </div>
                      )}
                    </Row>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
