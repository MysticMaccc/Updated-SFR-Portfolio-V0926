'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import type { Profile } from '@/types';

const NAV_LINKS = [
  { label: 'About',      href: '/about' },
  { label: 'Skills',     href: '/skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Training',   href: '/training' },
  { label: 'Contact',    href: '/contact' },
];

export default function Navigation({ profile }: { profile: Profile | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const initials = (profile?.name ?? 'SR')
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 ios-nav">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: 'var(--ios-blue)' }}
            >
              {initials}
            </motion.div>
            <span className="font-semibold text-[#1C1C1E] text-sm hidden sm:block truncate max-w-[160px]">
              {profile?.name ?? ''}
            </span>
          </Link>

          {/* Desktop nav — sliding pill */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(link => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative px-3 py-1.5 rounded-lg text-sm transition-colors"
                  style={{
                    color: active ? '#007AFF' : '#636366',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(0,122,255,0.08)' }}
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              href="/resume"
              title="Resume"
              className="hidden sm:flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: isActive('/resume') ? 'rgba(0,122,255,0.08)' : '#F2F2F7',
                color: isActive('/resume') ? '#007AFF' : '#636366',
              }}
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </Link>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setOpen(!open)}
              className="md:hidden w-8 h-8 rounded-lg bg-[#F2F2F7] flex items-center justify-center text-[#636366]"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-30 md:hidden pt-14">
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 480, damping: 34 }}
              className="mx-3 mt-2 rounded-2xl overflow-hidden border shadow-lg"
              style={{ background: 'rgba(255,255,255,0.98)', borderColor: 'var(--border)', backdropFilter: 'blur(16px)' }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-5 py-4 text-sm border-b transition-colors active:bg-[#F2F2F7]"
                    style={{
                      borderColor: 'var(--border)',
                      color: isActive(link.href) ? '#007AFF' : '#1C1C1E',
                      fontWeight: isActive(link.href) ? 600 : 500,
                      background: isActive(link.href) ? 'rgba(0,122,255,0.04)' : 'transparent',
                    }}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF]" />
                    )}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/resume"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-5 py-4 text-sm transition-colors active:bg-[#F2F2F7]"
                style={{
                  color: isActive('/resume') ? '#007AFF' : '#636366',
                }}
              >
                <FileText className="w-4 h-4" />
                Resume / CV
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 -z-10 bg-black/10"
              onClick={() => setOpen(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
