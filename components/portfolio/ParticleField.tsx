'use client';

import { useMemo } from 'react';

const COLORS = ['#4ADE80', '#FACC15', '#F472B6', '#00DDB3', '#E8703A', '#60A5FA'];

export default function ParticleField() {
  const particles = useMemo(() =>
    Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: (i * 137.508) % 100,
      y: (i * 97.643 + 13.1) % 100,
      color: COLORS[i % COLORS.length],
      size: i % 5 === 0 ? 2 : 1.5,
      opacity: 0.35 + (i % 3) * 0.1,
    })), []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
