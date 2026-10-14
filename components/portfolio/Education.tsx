'use client';

import { motion } from 'framer-motion';
import type { Education } from '@/types';

export default function Education({ educations }: { educations: Education[] }) {
  return (
    <div className="min-h-[calc(100vh-48px)] py-14 sm:py-20 px-5 sm:px-10 relative z-10" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1400px] mx-auto">

        {/* Section marker */}
        <div className="flex items-center justify-between mb-12 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="section-meta" style={{ color: 'var(--text-faint)' }}>[ 05 ] — Education</span>
          <span className="section-meta" style={{ color: 'var(--text-faint)' }}>Background</span>
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="heading-bold text-[clamp(2.5rem,7vw,6rem)]">ACADEMIC</span>
          <span className="heading-outline text-[clamp(2.5rem,7vw,6rem)]">BACKGROUND</span>
        </motion.div>

        {/* Education list */}
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {educations.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-7"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              {/* Index */}
              <span className="section-meta flex-shrink-0 mt-0.5" style={{ color: 'var(--text-faint)' }}>
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-lg sm:text-xl font-bold leading-tight" style={{ color: 'var(--text)' }}>
                    {edu.degree}
                  </span>
                  {edu.is_current && (
                    <span className="tag-chip" style={{ borderColor: 'var(--accent-2)', color: 'var(--accent-2)' }}>
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--accent-2)' }}>{edu.field_of_study}</p>
                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                  {edu.institution}
                  <span className="mx-2" style={{ color: 'var(--text-faint)' }}>·</span>
                  <span style={{ color: 'var(--text-faint)' }}>
                    {edu.start_year} — {edu.is_current ? 'Present' : (edu.end_year ?? '')}
                  </span>
                </p>
                {edu.description && (
                  <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>{edu.description}</p>
                )}
              </div>
            </motion.div>
          ))}

          {educations.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-sm" style={{ color: 'var(--text-faint)' }}>No education entries yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
