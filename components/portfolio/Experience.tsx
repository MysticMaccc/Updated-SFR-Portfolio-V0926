'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Experience } from '@/types';

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
    <div className="min-h-[calc(100vh-48px)] py-14 sm:py-20 px-5 sm:px-10 relative z-10" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1400px] mx-auto">

        {/* Section marker */}
        <div className="flex items-center justify-between mb-12 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="section-meta" style={{ color: 'var(--text-faint)' }}>[ 04 ] — Experience</span>
          <span className="section-meta" style={{ color: 'var(--text-faint)' }}>Work History</span>
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="heading-bold text-[clamp(2.5rem,7vw,6rem)]">WORK</span>
          <span className="heading-outline text-[clamp(2.5rem,7vw,6rem)]">HISTORY</span>
        </motion.div>

        {/* Experience list */}
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {sorted.map((exp, index) => {
            const isOpen = expanded === exp.id;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <button
                  className="w-full text-left px-0 py-6 flex items-start justify-between gap-6 transition-all"
                  onClick={() => setExpanded(isOpen ? null : exp.id)}
                >
                  <div className="flex items-start gap-6 min-w-0">
                    {/* Index number */}
                    <span className="section-meta flex-shrink-0 mt-1.5" style={{ color: 'var(--text-faint)' }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-1.5">
                        <span className="text-lg sm:text-xl font-bold leading-tight" style={{ color: 'var(--text)' }}>
                          {exp.role}
                        </span>
                        {exp.is_current && (
                          <span className="tag-chip" style={{ borderColor: 'var(--accent-2)', color: 'var(--accent-2)' }}>
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                        {exp.company}
                        <span className="mx-2" style={{ color: 'var(--text-faint)' }}>·</span>
                        <span style={{ color: 'var(--text-faint)' }}>
                          {exp.start_date} — {exp.is_current ? 'Present' : exp.end_date}
                        </span>
                      </p>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    className="flex-shrink-0 mt-1.5"
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
                    >
                      <ul className="space-y-3 pb-7 pl-12">
                        {exp.description.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.04 * i }}
                            className="flex items-start gap-3 text-sm leading-relaxed"
                            style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}
                          >
                            <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent-2)' }} />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
