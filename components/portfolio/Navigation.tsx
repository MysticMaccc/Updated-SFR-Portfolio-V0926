'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import type { Profile } from '@/types';

const NAV_LINKS = [
  { label: 'About',      href: '/about' },
  { label: 'Skills',     href: '/skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Education',  href: '/education' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Training',   href: '/training' },
  { label: 'Contact',    href: '/contact' },
];

export default function Navigation({ profile }: { profile: Profile | null }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', latest => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 8);
    if (open) { setHidden(false); return; }
    setHidden(latest > previous && latest > 140);
  });

  const initials = (profile?.name ?? 'SR')
    .split(' ').map(n => n[0]).slice(0, 2).join('');

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <motion.nav
        animate={{ y: hidden ? -56 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 36 }}
        className="fixed top-0 left-0 right-0 z-40 ios-nav"
        style={{ boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.4)' : 'none' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: 'var(--accent)', color: '#0D0C0A' }}
            >
              {initials}
            </motion.div>
            <span className="font-semibold text-sm hidden sm:block truncate max-w-[160px]"
              style={{ color: 'var(--text)' }}>
              {profile?.name ?? ''}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(link => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative px-3 py-1.5 rounded-lg text-sm transition-colors"
                  style={{
                    color: active ? 'var(--accent)' : 'var(--text-muted)',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'var(--accent-dim)' }}
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
              className="hidden sm:flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-medium transition-all"
              style={{
                background: isActive('/resume') ? 'var(--accent-dim)' : 'var(--surface-2)',
                color: isActive('/resume') ? 'var(--accent)' : 'var(--text-muted)',
                border: '1px solid var(--border)',
              }}
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </Link>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setOpen(!open)}
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--surface-2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-30 md:hidden pt-14">
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 480, damping: 34 }}
              className="mx-3 mt-2 rounded-2xl overflow-hidden border"
              style={{ background: 'rgba(20,18,16,0.98)', borderColor: 'var(--border)', backdropFilter: 'blur(20px)' }}
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
                    className="flex items-center justify-between px-5 py-4 text-sm border-b transition-colors"
                    style={{
                      borderColor: 'var(--border)',
                      color: isActive(link.href) ? 'var(--accent)' : 'var(--text)',
                      fontWeight: isActive(link.href) ? 600 : 500,
                      background: isActive(link.href) ? 'var(--accent-dim)' : 'transparent',
                    }}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                    )}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/resume"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-5 py-4 text-sm transition-colors"
                style={{ color: isActive('/resume') ? 'var(--accent)' : 'var(--text-muted)' }}
              >
                <FileText className="w-4 h-4" />
                Resume / CV
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 -z-10 bg-black/40"
              onClick={() => setOpen(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
