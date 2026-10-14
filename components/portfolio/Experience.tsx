'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Briefcase } from 'lucide-react';
import type { Experience } from '@/types';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

function sortLatestFirst(experiences: Experience[]): Experience[] {
  return [...experiences].sort((a, b) => {
    if (a.is_current !== b.is_current) return a.is_current ? -1 : 1;
    return (parseInt(b.start_date) || 0) - (parseInt(a.start_date) || 0);
  });
}

export default function Experience({ experiences }: { experiences: Experience[] }) {
  const sorted = sortLatestFirst(experiences);
  const [expanded, setExpanded] = useState<string | null>(sorted[0]?.id ?? null);

  return (
    <div className="min-h-[calc(100vh-56px)] py-14 sm:py-20 px-4 sm:px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto">

        <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-10 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--accent)' }}>Experience</p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Work History</h1>
          <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>
            {experiences.length} position{experiences.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="show" className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-5 top-4 bottom-4 w-px hidden sm:block"
            style={{ background: 'var(--border-light)' }} />

          <div className="space-y-4 sm:space-y-5">
            {sorted.map((exp, index) => {
              const isOpen = expanded === exp.id;
              return (
                <motion.div key={exp.id} variants={fadeUp} className="flex gap-4 sm:gap-6">
                  {/* Timeline dot */}
                  <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: index === 0 ? 'var(--accent)' : 'var(--surface-2)',
                        color: index === 0 ? '#0D0C0A' : 'var(--text-muted)',
                        border: `2px solid ${index === 0 ? 'var(--accent)' : 'var(--border-light)'}`,
                      }}
                    >
                      <Briefcase className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 card overflow-hidden"
                    style={{ borderColor: isOpen ? 'var(--border-light)' : 'var(--border)' }}>
                    <button
                      className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 transition-colors"
                      style={{ background: isOpen ? 'var(--surface-2)' : 'transparent' }}
                      onMouseEnter={e => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)'; }}
                      onMouseLeave={e => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                      onClick={() => setExpanded(isOpen ? null : exp.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-sm sm:text-base leading-tight" style={{ color: 'var(--text)' }}>
                            {exp.role}
                          </span>
                          {exp.is_current && (
                            <span className="text-[10px] font-bold rounded-full px-2 py-0.5 flex-shrink-0"
                              style={{ background: 'rgba(74,222,128,0.1)', color: '#4ADE80' }}>
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{exp.company}</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>
                          {exp.start_date} — {exp.is_current ? 'Present' : exp.end_date}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: 'var(--text-faint)' }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && exp.description.length > 0 && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                          className="overflow-hidden"
                          style={{ borderTop: '1px solid var(--border)' }}
                        >
                          <ul className="space-y-2.5 pt-4 px-5 sm:px-6 pb-5 sm:pb-6">
                            {exp.description.map((item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.04 * i, duration: 0.2 }}
                                className="flex items-start gap-3 text-sm leading-relaxed"
                                style={{ color: 'var(--text-muted)' }}
                              >
                                <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
