'use client';

import { motion } from 'framer-motion';
import type { Skill } from '@/types';

export default function Skills({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  const categories = Object.entries(grouped);

  return (
    <div className="min-h-[calc(100vh-48px)] py-14 sm:py-20 px-5 sm:px-10 relative z-10" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1400px] mx-auto">

        {/* Section marker */}
        <div className="flex items-center justify-between mb-12 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="section-meta" style={{ color: 'var(--text-faint)' }}>[ 03 ] — Skills</span>
          <span className="section-meta" style={{ color: 'var(--text-faint)' }}>Chapter Two</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="heading-bold text-[clamp(3rem,8vw,7rem)]">TOOLS</span>
            <span className="heading-outline-orange text-[clamp(3rem,8vw,7rem)]">OF THE</span>
            <span className="heading-bold text-[clamp(3rem,8vw,7rem)]">TRADE</span>
            <p className="text-base mt-6 max-w-sm leading-relaxed" style={{ color: 'var(--text-muted)', lineHeight: '1.75' }}>
              A curated set of languages, frameworks, and tools I reach for to make things that feel considered and fast.
            </p>
            <p className="text-sm mt-3 font-medium" style={{ color: 'var(--text-faint)' }}>
              {skills.length} skills across {categories.length} categories
            </p>
          </motion.div>

          {/* Right: category grids */}
          <div className="space-y-8">
            {categories.map(([category, items], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                {/* Category header */}
                <div className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-3">
                    <span className="section-meta" style={{ color: 'var(--accent-2)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      {category}
                    </span>
                  </div>
                  <span className="text-xs font-medium" style={{ color: 'var(--text-faint)' }}>{items.length}</span>
                </div>

                {/* Skill grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
                  {items.map(skill => (
                    <motion.div
                      key={skill.id}
                      whileHover={{ background: 'var(--surface-2)' }}
                      className="flex items-center px-4 py-3.5"
                      style={{ background: 'var(--surface)' }}
                    >
                      <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{skill.name}</span>
                    </motion.div>
                  ))}
                  {items.length % 3 !== 0 && Array.from({ length: 3 - (items.length % 3) }).map((_, i) => (
                    <div key={`empty-${i}`} style={{ background: 'var(--surface)' }} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
