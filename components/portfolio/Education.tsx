'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import type { Education } from '@/types';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Education({ educations }: { educations: Education[] }) {
  return (
    <div className="min-h-[calc(100vh-56px)] py-14 sm:py-20 px-4 sm:px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto">

        <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-10 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--accent)' }}>Background</p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Education</h1>
          <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>
            {educations.length} qualification{educations.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        <div className="space-y-4">
          {educations.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 320, damping: 28, delay: i * 0.06 }}
              className="card overflow-hidden"
            >
              {/* Header row */}
              <div className="px-5 sm:px-6 py-4 flex items-start gap-4"
                style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'var(--accent-dim)', border: '1px solid rgba(200,168,106,0.2)' }}>
                  <GraduationCap className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold leading-snug" style={{ color: 'var(--text)' }}>{edu.degree}</p>
                      <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--accent)' }}>{edu.field_of_study}</p>
                    </div>
                    {edu.is_current && (
                      <span className="text-[10px] font-semibold rounded-full px-2 py-0.5 flex-shrink-0"
                        style={{ background: 'rgba(74,222,128,0.1)', color: '#4ADE80' }}>
                        Current
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-5 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{edu.institution}</p>
                  <p className="text-xs flex-shrink-0 ml-3" style={{ color: 'var(--text-faint)' }}>
                    {edu.start_year} — {edu.is_current ? 'Present' : (edu.end_year ?? '')}
                  </p>
                </div>
                {edu.description && (
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{edu.description}</p>
                )}
              </div>
            </motion.div>
          ))}

          {educations.length === 0 && (
            <div className="card p-12 text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'var(--surface-2)' }}>
                <GraduationCap className="w-6 h-6" style={{ color: 'var(--text-faint)' }} />
              </div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No education entries yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
