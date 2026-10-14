'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Github } from 'lucide-react';
import type { Profile } from '@/types';
import type { ElementType } from 'react';

export default function Contact({ profile }: { profile: Profile | null }) {
  const contacts = [
    profile?.email  && { icon: Mail,   label: profile.email,  href: `mailto:${profile.email}`,  desc: 'Email' },
    profile?.phone  && { icon: Phone,  label: profile.phone,  href: `tel:${profile.phone}`,      desc: 'Phone' },
    profile?.github && { icon: Github, label: profile.github.replace('https://github.com/', 'github.com/'), href: profile.github, desc: 'GitHub', external: true },
  ].filter(Boolean) as { icon: ElementType; label: string; href: string; desc: string; external?: boolean }[];

  return (
    <div className="min-h-[calc(100vh-48px)] py-14 sm:py-20 px-5 sm:px-10 relative z-10" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1400px] mx-auto">

        {/* Section marker */}
        <div className="flex items-center justify-between mb-12 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="section-meta" style={{ color: 'var(--text-faint)' }}>[ 08 ] — Contact</span>
          <span className="section-meta" style={{ color: 'var(--text-faint)' }}>End of Index</span>
        </div>

        {/* Giant heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
            Let&apos;s make something
          </p>
          <span className="heading-bold text-[clamp(4rem,14vw,11rem)]">SAY</span>
          <span className="heading-outline text-[clamp(4rem,14vw,11rem)]">HELLO</span>
        </motion.div>

        {/* Contact rows */}
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {contacts.map(({ icon: Icon, label, href, desc, external }, i) => (
            <motion.a
              key={label}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              href={href}
              target={external ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-5 py-6 group transition-all"
              style={{ borderBottom: '1px solid var(--border)', textDecoration: 'none' }}
            >
              <span className="text-base font-medium w-5" style={{ color: 'var(--accent-2)' }}>→</span>
              <span className="text-xs font-semibold uppercase tracking-wider w-20 sm:w-28 flex-shrink-0" style={{ color: 'var(--text-faint)' }}>
                {desc}
              </span>
              <div className="flex items-center gap-3 min-w-0">
                <Icon className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                <span
                  className="text-base sm:text-xl font-medium transition-colors truncate"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {label}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
