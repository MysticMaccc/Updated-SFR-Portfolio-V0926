'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Images } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { Project, ProjectImage } from '@/types';

const ProjectGallery = dynamic(() => import('./ProjectGallery'), { ssr: false });

const FILTERS = ['All', 'Web', 'Mobile'];

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
      <div className="min-h-[calc(100vh-48px)] py-14 sm:py-20 px-5 sm:px-10 relative z-10" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1400px] mx-auto">

          {/* Section marker */}
          <div className="flex items-center justify-between mb-12 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <span className="section-meta" style={{ color: 'var(--text-faint)' }}>[ 06 ] — Selected Work</span>
            <span className="section-meta" style={{ color: 'var(--text-faint)' }}>Chapter Three</span>
          </div>

          {/* Heading + filter row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
            >
              <span className="heading-bold text-[clamp(2.5rem,7vw,6rem)]">PASSION</span>
              <span className="heading-outline text-[clamp(2.5rem,7vw,6rem)]">PROJECTS</span>
              <p className="text-base mt-4 max-w-sm leading-relaxed" style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                A curated selection of work spanning web apps, mobile interfaces, and SaaS dashboards.
              </p>
            </motion.div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => { setFilter(f); setShowAll(false); }}
                  className="text-xs font-semibold uppercase tracking-wider px-4 py-2 transition-colors"
                  style={{
                    color: filter === f ? 'var(--text)' : 'var(--text-faint)',
                    borderBottom: `2px solid ${filter === f ? 'var(--accent-2)' : 'transparent'}`,
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { if (filter !== f) (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
                  onMouseLeave={e => { if (filter !== f) (e.currentTarget as HTMLElement).style.color = 'var(--text-faint)'; }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Project grid — 2 columns */}
          <div className="grid sm:grid-cols-2 gap-px" style={{ background: 'var(--border)' }}>
            <AnimatePresence mode="popLayout">
              {visible.map((project) => {
                const images = projectImages[project.id] ?? [];
                const hasImages = images.length > 0;
                const coverImage = images[0]?.url;
                const displayIndex = filtered.indexOf(project);

                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: 'var(--bg)' }}
                  >
                    {/* Number + line */}
                    <div className="flex items-center gap-3 px-5 pt-5 pb-3">
                      <span className="section-meta" style={{ color: 'var(--accent-2)' }}>
                        # {String(displayIndex + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 h-px" style={{ background: 'var(--border-light)' }} />
                      {hasImages && (
                        <button
                          onClick={() => openGallery(project, 0)}
                          className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                          style={{ color: 'var(--text-faint)', cursor: 'pointer' }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-2)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}
                        >
                          <Images className="w-3.5 h-3.5" />
                          {images.length} photo{images.length > 1 ? 's' : ''}
                        </button>
                      )}
                    </div>

                    {/* Project image */}
                    {hasImages && (
                      <div
                        className="w-full aspect-video overflow-hidden cursor-pointer relative group"
                        onClick={() => openGallery(project, 0)}
                        style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
                      >
                        <img
                          src={coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold uppercase tracking-wider px-4 py-2"
                            style={{ border: '1px solid var(--accent-2)', color: 'var(--accent-2)' }}>
                            View Photos
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Card body */}
                    <div className="p-5">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight" style={{ color: 'var(--text)' }}>
                        {project.title}
                      </h3>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="tag-chip">{project.category}</span>
                        {project.tech_stack.slice(0, 3).map(t => (
                          <span key={t} className="tag-chip">{t}</span>
                        ))}
                      </div>

                      <p className="text-sm leading-relaxed mb-5 line-clamp-2" style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                        {project.description}
                      </p>

                      {/* Links */}
                      <div className="flex flex-wrap gap-3">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-4 py-2 transition-colors"
                            style={{ border: '1px solid var(--accent-2)', color: 'var(--accent-2)', textDecoration: 'none' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,221,179,0.06)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                          >
                            Live Demo
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-4 py-2 transition-colors"
                            style={{ border: '1px solid var(--border-light)', color: 'var(--text-muted)', textDecoration: 'none' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-muted)'; (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
                          >
                            <Github className="w-3.5 h-3.5" />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Show All / Less */}
          {filtered.length > 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex justify-center"
            >
              <button onClick={() => setShowAll(!showAll)} className="ios-btn-secondary">
                {showAll ? 'Show Less' : `Show All ${filtered.length} Projects →`}
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
