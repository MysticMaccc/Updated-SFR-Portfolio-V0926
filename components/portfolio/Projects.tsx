'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, Images } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { Project, ProjectImage } from '@/types';

const ProjectGallery = dynamic(() => import('./ProjectGallery'), { ssr: false });

const FILTERS = ['All', 'Web', 'Mobile'];

const CATEGORY_BADGE: Record<string, { bg: string; text: string }> = {
  web:    { bg: 'rgba(96,165,250,0.12)',  text: '#60A5FA' },
  mobile: { bg: 'rgba(74,222,128,0.1)',   text: '#4ADE80' },
  other:  { bg: 'rgba(200,168,106,0.1)',  text: '#C8A86A' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

interface Props {
  projects: Project[];
  projectImages?: Record<string, ProjectImage[]>;
}

interface GalleryState {
  project: Project;
  images: ProjectImage[];
  initialIndex: number;
}

export default function Projects({ projects, projectImages = {} }: Props) {
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [gallery, setGallery] = useState<GalleryState | null>(null);

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  const visible = showAll ? filtered : filtered.slice(0, 6);

  function openGallery(project: Project, initialIndex = 0) {
    const images = projectImages[project.id] ?? [];
    if (images.length === 0) return;
    setGallery({ project, images, initialIndex });
  }

  return (
    <>
      <div className="min-h-[calc(100vh-56px)] py-14 sm:py-20 px-4 sm:px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto">

          {/* Page header */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-8 sm:mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--accent)' }}>Projects</p>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Portfolio</h1>
            <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>
              {projects.length} project{projects.length !== 1 ? 's' : ''}
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }} className="mb-8 sm:mb-10">
            <div className="inline-flex p-1 rounded-xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => { setFilter(f); setShowAll(false); }}
                  className="relative px-5 py-1.5 rounded-[9px] text-sm font-medium transition-colors"
                  style={{ color: filter === f ? '#0D0C0A' : 'var(--text-muted)' }}
                >
                  {filter === f && (
                    <motion.span
                      layoutId="filter-segment"
                      className="absolute inset-0 rounded-[9px]"
                      style={{ background: 'var(--accent)' }}
                      transition={{ type: 'spring', stiffness: 480, damping: 34 }}
                    />
                  )}
                  <span className="relative" style={{ fontWeight: filter === f ? 600 : 500 }}>{f}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Grid */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {visible.map(project => {
                const badge = CATEGORY_BADGE[project.category] ?? CATEGORY_BADGE.other;
                const images = projectImages[project.id] ?? [];
                const hasImages = images.length > 0;
                const coverImage = images[0]?.url;

                return (
                  <motion.div
                    key={project.id}
                    variants={fadeUp}
                    layout
                    className="card flex flex-col transition-all duration-200 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Image banner */}
                    {hasImages && (
                      <div
                        className="relative w-full aspect-video overflow-hidden cursor-pointer group"
                        onClick={() => openGallery(project, 0)}
                      >
                        <img
                          src={coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 rounded-xl px-3 py-1.5"
                            style={{ background: 'rgba(13,12,10,0.7)', border: '1px solid rgba(200,168,106,0.3)' }}>
                            <Images className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                            <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>View Photos</span>
                          </div>
                        </div>
                        {images.length > 1 && (
                          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-lg px-2 py-0.5"
                            style={{ background: 'rgba(13,12,10,0.7)', border: '1px solid var(--border)' }}>
                            <Images className="w-3 h-3" style={{ color: 'var(--accent)' }} />
                            <span className="text-[10px] font-semibold" style={{ color: 'var(--accent)' }}>{images.length}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-5 flex flex-col flex-1">
                      {/* Top row */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider rounded-lg px-2.5 py-1"
                          style={{ background: badge.bg, color: badge.text }}>
                          {project.category}
                        </span>
                        {project.featured && (
                          <Star className="w-3.5 h-3.5" style={{ fill: 'var(--accent)', color: 'var(--accent)' }} />
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-sm sm:text-base mb-2 leading-snug" style={{ color: 'var(--text)' }}>
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm leading-relaxed flex-1 mb-4 line-clamp-3" style={{ color: 'var(--text-muted)' }}>
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      {project.tech_stack.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.tech_stack.map(t => (
                            <span key={t} className="text-[10px] font-medium rounded-md px-2 py-0.5"
                              style={{ background: 'var(--surface-2)', color: 'var(--text-faint)', border: '1px solid var(--border)' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Bottom row */}
                      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                        <div className="flex gap-4">
                          {project.url && (
                            <a href={project.url} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                              style={{ color: 'var(--accent)' }}>
                              <ExternalLink className="w-3.5 h-3.5" />
                              Live
                            </a>
                          )}
                          {project.github_url && (
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                              style={{ color: 'var(--text-muted)' }}
                              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                              <Github className="w-3.5 h-3.5" />
                              Source
                            </a>
                          )}
                        </div>

                        {hasImages && (
                          <button
                            onClick={() => openGallery(project, 0)}
                            className="flex items-center gap-1 text-xs font-medium transition-colors"
                            style={{ color: 'var(--text-faint)' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}>
                            <Images className="w-3.5 h-3.5" />
                            {images.length} photo{images.length > 1 ? 's' : ''}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filtered.length > 6 && (
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.4 }} className="mt-8 text-center">
              <button onClick={() => setShowAll(!showAll)} className="ios-btn-secondary text-sm">
                {showAll ? 'Show Less' : `Show All ${filtered.length}`}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Lightbox gallery */}
      <AnimatePresence>
        {gallery && (
          <ProjectGallery
            images={gallery.images}
            initialIndex={gallery.initialIndex}
            projectTitle={gallery.project.title}
            onClose={() => setGallery(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
