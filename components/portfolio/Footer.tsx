'use client';

import Link from 'next/link';
import type { Profile } from '@/types';

const NAV_COL = [
  { label: 'Index',      href: '/' },
  { label: 'About',      href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Training',   href: '/training' },
  { label: 'Education',  href: '/education' },
];

const TECH_COL = [
  'Next.js 14', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion', 'Vercel',
];

export default function Footer({ profile }: { profile: Profile | null }) {
  const year = new Date().getFullYear();
  const name = profile?.name ?? 'Sherwin Christopher F. Roxas';
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-14">

        {/* 4-column grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Navigate */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--text-faint)' }}>Navigate</p>
            <ul className="space-y-3">
              {NAV_COL.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm font-medium transition-colors"
                    style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Elsewhere */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--text-faint)' }}>Elsewhere</p>
            <ul className="space-y-3">
              {profile?.github && (
                <li>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer"
                    className="text-sm font-medium transition-colors" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                    GitHub
                  </a>
                </li>
              )}
              {profile?.linkedin && (
                <li>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                    className="text-sm font-medium transition-colors" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                    LinkedIn
                  </a>
                </li>
              )}
              <li>
                <Link href="/resume" className="text-sm font-medium transition-colors"
                  style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  Read.cv
                </Link>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--text-faint)' }}>Location</p>
            <ul className="space-y-3">
              <li className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Philippines</li>
              <li className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>GMT+8</li>
              <li className="text-sm font-medium" style={{ color: '#4ADE80' }}>Available for work</li>
            </ul>
          </div>

          {/* Built with */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--text-faint)' }}>Built with</p>
            <ul className="space-y-3">
              {TECH_COL.map(t => (
                <li key={t} className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center font-bold text-xs flex-shrink-0"
              style={{ background: 'var(--text)', color: 'var(--bg)' }}>
              {initials}
            </div>
            <p className="text-xs font-medium" style={{ color: 'var(--text-faint)' }}>
              © {year} {name} · All rights reserved · V2.0
            </p>
          </div>
          <button
            onClick={scrollTop}
            className="text-xs font-semibold uppercase tracking-wider transition-colors"
            style={{ color: 'var(--text-faint)', cursor: 'pointer', background: 'none', border: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}
          >
            Back to top ↑
          </button>
        </div>
      </div>

      {/* Giant watermark name */}
      <div className="overflow-hidden select-none pointer-events-none" style={{ height: '14vw', maxHeight: 160 }}>
        <p
          className="heading-bold whitespace-nowrap text-center leading-none"
          style={{
            fontSize: 'clamp(4rem, 18vw, 14rem)',
            color: 'transparent',
            WebkitTextStroke: '1px var(--border-light)',
            opacity: 0.5,
          }}
        >
          {name.split(' ').slice(0, 2).join(' ').toUpperCase()}
        </p>
      </div>
    </footer>
  );
}
