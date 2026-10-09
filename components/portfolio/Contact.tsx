'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Github } from 'lucide-react';
import type { Profile } from '@/types';

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
  ].filter(Boolean) as { icon: React.ElementType; label: string; href: string; desc: string; external?: boolean }[];

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
          <p className="text-xs font-semibold text-[#8E8E93] uppercase tracking-widest mb-3">Contact</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#1C1C1E] tracking-tight">Get in Touch</h1>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {contacts.map(({ icon: Icon, label, href, desc, external }) => (
            <motion.a
              key={label}
              variants={fadeUp}
              whileTap={{ scale: 0.98 }}
              href={href}
              target={external ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="card p-5 flex items-center gap-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors"
                style={{ background: '#F2F2F7' }}
              >
                <Icon className="w-5 h-5 text-[#636366] group-hover:text-[#007AFF] transition-colors" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#1C1C1E] truncate">{label}</p>
                <p className="text-xs text-[#8E8E93] mt-0.5">{desc}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
