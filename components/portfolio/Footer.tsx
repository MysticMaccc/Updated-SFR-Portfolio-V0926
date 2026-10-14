'use client';

import type { Profile } from '@/types';

export default function Footer({ profile }: { profile: Profile | null }) {
  return (
    <footer className="py-8 px-5" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
          © {new Date().getFullYear()} {profile?.name ?? 'Sherwin Christopher F. Roxas'}
        </p>
        <div className="flex items-center gap-4">
          {profile?.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors"
              style={{ color: 'var(--text-faint)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}
            >
              GitHub
            </a>
          )}
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="text-xs transition-colors"
              style={{ color: 'var(--text-faint)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}
            >
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
