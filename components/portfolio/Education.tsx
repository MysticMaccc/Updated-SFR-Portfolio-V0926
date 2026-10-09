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
    <div className="min-h-[calc(100vh-56px)] py-14 sm:py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Page header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-10 sm:mb-14"
        >
          <p className="text-xs font-semibold text-[#8E8E93] uppercase tracking-widest mb-3">Background</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#1C1C1E] tracking-tight">Education</h1>
          <p className="text-sm text-[#8E8E93] mt-3">
            {educations.length} qualification{educations.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Education list */}
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
              {/* Color bar + icon */}
              <div
                className="px-5 sm:px-6 py-4 border-b flex items-start gap-4"
                style={{ background: '#FAFAFA', borderColor: 'var(--border)' }}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#007AFF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5 text-[#007AFF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-[#1C1C1E] leading-snug">{edu.degree}</p>
                      <p className="text-sm text-[#007AFF] font-medium mt-0.5">{edu.field_of_study}</p>
                    </div>
                    {edu.is_current && (
                      <span
                        className="text-[10px] font-semibold rounded-full px-2 py-0.5 flex-shrink-0"
                        style={{ background: 'rgba(52,199,89,0.1)', color: '#1A7A38' }}
                      >
                        Current
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-5 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#1C1C1E]">{edu.institution}</p>
                  <p className="text-xs text-[#8E8E93] flex-shrink-0 ml-3">
                    {edu.start_year} — {edu.is_current ? 'Present' : (edu.end_year ?? '')}
                  </p>
                </div>
                {edu.description && (
                  <p className="text-sm text-[#636366] mt-2 leading-relaxed">{edu.description}</p>
                )}
              </div>
            </motion.div>
          ))}

          {educations.length === 0 && (
            <div className="card p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#F2F2F7] flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-[#8E8E93]" />
              </div>
              <p className="text-sm text-[#8E8E93]">No education entries yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
