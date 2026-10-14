'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { Profile } from '@/types';
import ParticleField from './ParticleField';

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
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', latest => {
    const previous = scrollY.getPrevious() ?? 0;
    if (open) { setHidden(false); return; }
    setHidden(latest > previous && latest > 140);
  });

  const initials = (profile?.name ?? 'SR').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  const displayName = (profile?.name ?? 'Sherwin Roxas').split(' ').slice(0, 2).join(' ').toUpperCase();
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <ParticleField />

      <motion.nav
        animate={{ y: hidden ? -48 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 36 }}
        className="fixed top-0 left-0 right-0 z-40 ios-nav"
        style={{ height: 48 }}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 h-full flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div
              className="w-7 h-7 flex items-center justify-center font-bold text-xs flex-shrink-0"
              style={{ background: 'var(--text)', color: 'var(--bg)' }}
            >
              {initials}
            </div>
            <span className="hidden sm:block text-xs font-medium tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
              {displayName} — PORTFOLIO
            </span>
          </Link>

          {/* Desktop center nav */}
          <div className="hidden xl:flex items-center gap-7 flex-1 justify-center">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-medium tracking-wider uppercase transition-colors"
                style={{
                  color: isActive(link.href) ? 'var(--text)' : 'var(--text-muted)',
                  paddingBottom: 3,
                  borderBottom: `1px solid ${isActive(link.href) ? 'var(--accent-2)' : 'transparent'}`,
                }}
                onMouseEnter={e => { if (!isActive(link.href)) (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                onMouseLeave={e => { if (!isActive(link.href)) (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-5 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ADE80', boxShadow: '0 0 6px #4ADE80' }} />
              <span className="text-xs font-medium tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>Available</span>
            </div>

            <Link
              href="/resume"
              className="hidden sm:block text-xs font-medium tracking-wider uppercase transition-colors"
              style={{ color: 'var(--text-muted)', paddingBottom: 2, borderBottom: '1px solid transparent' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
            >
              CV
            </Link>

            <Link
              href="/contact"
              className="hidden sm:block text-xs font-semibold tracking-wider uppercase transition-colors"
              style={{ color: 'var(--text)', paddingBottom: 2, borderBottom: '1px solid var(--border-light)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--text)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--border-light)'; }}
            >
              Contact
            </Link>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setOpen(!open)}
              className="xl:hidden w-7 h-7 flex items-center justify-center"
              style={{ color: 'var(--text-muted)' }}
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
          <div className="fixed inset-0 z-30 xl:hidden pt-12">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 480, damping: 34 }}
              className="mx-3 mt-1 border"
              style={{ background: 'rgba(8,8,8,0.98)', borderColor: 'var(--border)', backdropFilter: 'blur(20px)' }}
            >
              {[...NAV_LINKS, { label: 'Resume / CV', href: '/resume' }].map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-5 py-4 text-sm font-medium border-b transition-colors"
                    style={{
                      borderColor: 'var(--border)',
                      color: isActive(link.href) ? 'var(--accent-2)' : 'var(--text-muted)',
                    }}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="w-1 h-1" style={{ background: 'var(--accent-2)' }} />
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 -z-10"
              style={{ background: 'rgba(0,0,0,0.6)' }}
              onClick={() => setOpen(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
