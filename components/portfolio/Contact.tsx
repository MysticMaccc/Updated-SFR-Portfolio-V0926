'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Github, ExternalLink } from 'lucide-react';
import type { Profile } from '@/types';
import type { ElementType } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function Contact({ profile }: { profile: Profile | null }) {
  const contacts = [
    profile?.email  && { icon: Mail,   label: profile.email,  href: `mailto:${profile.email}`,  desc: 'Send an email' },
    profile?.phone  && { icon: Phone,  label: profile.phone,  href: `tel:${profile.phone}`,      desc: 'Call or message' },
    profile?.github && { icon: Github, label: profile.github.replace('https://github.com/', 'github.com/'), href: profile.github, desc: 'View my work', external: true },
  ].filter(Boolean) as { icon: ElementType; label: string; href: string; desc: string; external?: boolean }[];

  return (
    <div className="min-h-[calc(100vh-56px)] py-14 sm:py-20 px-4 sm:px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto">

        <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-10 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--accent)' }}>Contact</p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Get in Touch</h1>
          <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>
            Open to full-time roles, freelance, and collaborations.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
          {contacts.map(({ icon: Icon, label, href, desc, external }) => (
            <motion.a
              key={label}
              variants={fadeUp}
              whileTap={{ scale: 0.99 }}
              href={href}
              target={external ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="card p-5 flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors"
                style={{ background: 'var(--accent-dim)', border: '1px solid rgba(200,168,106,0.15)' }}>
                <Icon className="w-5 h-5 transition-colors" style={{ color: 'var(--accent)' }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate transition-colors"
                  style={{ color: 'var(--text)' }}>
                  {label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{desc}</p>
              </div>
              {external && (
                <ExternalLink className="w-4 h-4 flex-shrink-0 transition-opacity opacity-0 group-hover:opacity-100"
                  style={{ color: 'var(--accent)' }} />
              )}
            </motion.a>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
