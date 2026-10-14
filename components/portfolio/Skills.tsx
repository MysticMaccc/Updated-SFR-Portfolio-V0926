'use client';

import { motion } from 'framer-motion';
import type { Skill } from '@/types';

const LEVEL_COLOR: Record<string, { bg: string; text: string; border: string }> = {
  advanced:     { bg: 'rgba(74,222,128,0.08)',  text: '#4ADE80', border: 'rgba(74,222,128,0.2)' },
  intermediate: { bg: 'rgba(200,168,106,0.1)',  text: '#C8A86A', border: 'rgba(200,168,106,0.25)' },
  beginner:     { bg: 'rgba(251,146,60,0.08)',  text: '#FB923C', border: 'rgba(251,146,60,0.2)' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Skills({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  const categories = Object.entries(grouped);

  return (
    <div className="min-h-[calc(100vh-56px)] py-14 sm:py-20 px-4 sm:px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto">

        <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-10 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--accent)' }}>Skills</p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Technical Skills</h1>
          <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>
            {skills.length} skills across {categories.length} categories
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 320, damping: 28, delay: (i % 3) * 0.06 }}
              className="card p-5 transition-all duration-200 hover:-translate-y-0.5"
              style={{ cursor: 'default' }}
            >
              <div className="flex items-baseline justify-between mb-3.5">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {category}
                </p>
                <span className="text-[10px] font-medium tabular-nums" style={{ color: 'var(--text-faint)' }}>{items.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map(skill => {
                  const style = LEVEL_COLOR[skill.level] ?? LEVEL_COLOR.intermediate;
                  return (
                    <motion.span
                      key={skill.id}
                      whileHover={{ scale: 1.06, y: -1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                      className="skill-pill cursor-default"
                      style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
                    >
                      {skill.name}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        {skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 mt-10 pt-6"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <p className="text-xs font-medium" style={{ color: 'var(--text-faint)' }}>Proficiency:</p>
            {Object.entries(LEVEL_COLOR).map(([level, s]) => (
              <span key={level} className="flex items-center gap-1.5 text-xs" style={{ color: s.text }}>
                <span className="w-2 h-2 rounded-sm" style={{ background: s.bg, border: `1px solid ${s.border}` }} />
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
