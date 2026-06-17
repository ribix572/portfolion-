import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function ProjectCard({ project }) {
  return (
    <article className="project-card" data-reveal>
      <div className="project-topline">
        <span>{project.category}</span>
        <ArrowUpRight size={16} />
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="project-footer">
        <span className="project-impact">{project.impact}</span>
        <span className="project-accent">{project.accent}</span>
      </div>
    </article>
  );
}
