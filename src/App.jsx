import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Bookmark, Github, Mail, Menu, MoveRight, Sparkles } from 'lucide-react';
import { SectionHeading } from './components/SectionHeading';

const projects = [
  {
    id: 'aurora-ops',
    title: 'Aurora Ops Dashboard',
    category: 'Product',
    summary: 'A dense ops interface with high-contrast cards, fast scan paths, and strong hierarchy.',
    impact: 'Reduced internal review time by 40%.',
    accent: 'Warm graphite / electric blue',
    featured: true,
  },
  {
    id: 'studio-refresh',
    title: 'Studio Refresh System',
    category: 'Brand',
    summary: 'A modular identity system built to handle social, web, and pitch material without drift.',
    impact: 'Cut asset production from days to hours.',
    accent: 'Ink / pearl / copper',
    featured: false,
  },
  {
    id: 'portfolio-shell',
    title: 'Portfolio Shell',
    category: 'Web',
    summary: 'A portfolio shell designed like a curated gallery feed with a strong first impression.',
    impact: 'Improved contact conversion with clearer navigation.',
    accent: 'Slate / moss / frost',
    featured: false,
  },
  {
    id: 'launch-gallery',
    title: 'Launch Gallery Page',
    category: 'Web',
    summary: 'A product launch page with editorial spacing, bold cards, and focused calls to action.',
    impact: 'Increased demo requests without adding noise.',
    accent: 'Charcoal / cyan / ivory',
    featured: false,
  },
  {
    id: 'motion-study',
    title: 'Motion Study',
    category: 'Motion',
    summary: 'A motion-focused concept with layered surfaces and smooth reveal pacing.',
    impact: 'Gave the page a more premium, gallery-like rhythm.',
    accent: 'Graphite / violet / mist',
    featured: false,
  },
  {
    id: 'identity-kit',
    title: 'Identity Kit',
    category: 'Brand',
    summary: 'A small identity kit designed to feel crisp in a dark UI and flexible across formats.',
    impact: 'Kept the brand consistent across touchpoints.',
    accent: 'Charcoal / sand / blue',
    featured: false,
  },
];

const filters = ['All', 'Product', 'Brand', 'Web', 'Motion'];

const heroStats = [
  { value: '12+', label: 'featured projects' },
  { value: '8', label: 'years designing and coding' },
  { value: '3', label: 'core focus areas' },
  { value: '1', label: 'clear point of contact' },
];

const experience = [
  {
    role: 'Frontend Developer',
    place: 'Independent',
    period: '2023 - Present',
    detail: 'Builds polished React interfaces with a strong editorial structure and practical maintainability.',
  },
  {
    role: 'Product Designer',
    place: 'Studio work',
    period: '2020 - 2023',
    detail: 'Shaped websites and dashboards for teams that needed clarity, rhythm, and hierarchy.',
  },
  {
    role: 'Visual Systems',
    place: 'Freelance',
    period: '2018 - 2020',
    detail: 'Defined component libraries and brand systems for small teams with limited design support.',
  },
];

const groupMembers = [
  { name: 'Lead', role: 'Direction and planning' },
  { name: 'Design', role: 'Visual systems and layout' },
  { name: 'Code', role: 'Frontend implementation' },
  { name: 'Motion', role: 'Interaction and polish' },
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const [bubble, setBubble] = useState({
    x: 0,
    y: 0,
    visible: false,
    size: 132,
  });

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const handleTiltMove = (event) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.setProperty('--tilt-x', `${(x * 10).toFixed(2)}deg`);
    element.style.setProperty('--tilt-y', `${(-y * 10).toFixed(2)}deg`);
    element.style.setProperty('--shine-x', `${((x + 0.5) * 100).toFixed(2)}%`);
    element.style.setProperty('--shine-y', `${((y + 0.5) * 100).toFixed(2)}%`);
  };

  const resetTilt = (event) => {
    const element = event.currentTarget;
    element.style.setProperty('--tilt-x', '0deg');
    element.style.setProperty('--tilt-y', '0deg');
    element.style.setProperty('--shine-x', '50%');
    element.style.setProperty('--shine-y', '50%');
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealTargets = document.querySelectorAll('[data-reveal]');

    revealTargets.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index, 10) * 90}ms`);
    });

    if (reducedMotion) {
      revealTargets.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    revealTargets.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [activeFilter]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    if (reducedMotion || !finePointer) {
      setBubble((current) => ({ ...current, visible: false }));
      return undefined;
    }

    let frameId = 0;
    const target = { x: 0, y: 0 };

    const syncBubble = () => {
      frameId = 0;
      setBubble((current) => ({
        ...current,
        x: target.x,
        y: target.y,
        visible: true,
      }));
    };

    const handlePointerMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!frameId) {
        frameId = window.requestAnimationFrame(syncBubble);
      }
    };

    const handlePointerLeave = () => {
      setBubble((current) => ({ ...current, visible: false }));
    };

    const handlePointerDown = () => {
      setBubble((current) => ({ ...current, size: 98 }));
    };

    const handlePointerUp = () => {
      setBubble((current) => ({ ...current, size: 132 }));
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      document.documentElement.style.setProperty('--scroll-progress', '0');
      document.documentElement.style.setProperty('--pointer-x', '50vw');
      document.documentElement.style.setProperty('--pointer-y', '30vh');
      return undefined;
    }

    const updateScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
    };

    const updatePointer = (event) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
    };

    const resetPointer = () => {
      document.documentElement.style.setProperty('--pointer-x', '50vw');
      document.documentElement.style.setProperty('--pointer-y', '30vh');
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('pointerleave', resetPointer);
    window.addEventListener('blur', resetPointer);

    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerleave', resetPointer);
      window.removeEventListener('blur', resetPointer);
    };
  }, []);

  return (
    <div className="app-shell">
      <div className="mouse-spotlight" aria-hidden="true" />
      <div
        className={`cursor-bubble ${bubble.visible ? 'visible' : ''}`}
        aria-hidden="true"
        style={{
          '--bubble-x': `${bubble.x}px`,
          '--bubble-y': `${bubble.y}px`,
          '--bubble-size': `${bubble.size}px`,
        }}
      >
        <span className="cursor-bubble-core" />
      </div>

      <header className="topbar">
        <a className="brand" href="#home" aria-label="Portfolion home">
          <span className="brand-mark">P</span>
          <span>
            <strong>Portfolion</strong>
            <small>Gallery-first portfolio</small>
          </span>
        </a>

        <button
          className="icon-button mobile-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          <Menu size={18} />
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary">
          <a href="#work">Gallery</a>
          <a href="#about">About</a>
          <a href="#group">My group</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero hero-gallery" id="home" data-reveal>
          <div className="hero-copy" data-reveal>
            <span className="eyebrow">
              <Sparkles size={14} />
              Inspired by the ArtStation profile feel
            </span>
            <h1>Dark, dense, gallery-first portfolio presentation.</h1>
            <p className="hero-text">
              I reshaped the site so it feels more like a curated showcase: compact navigation, strong thumbnails,
              and a premium dark surface with layered cards.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#work">
                View gallery
                <MoveRight size={16} />
              </a>
              <a className="secondary-button" href="mailto:hello@yourname.com">
                <Mail size={16} />
                hello@yourname.com
              </a>
            </div>

            <div className="hero-stats" aria-label="Highlights">
              {heroStats.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="hero-panel" aria-label="Profile summary" data-reveal>
            <div
              className="profile-card profile-card-gallery"
              onPointerMove={handleTiltMove}
              onPointerLeave={resetTilt}
            >
              <div className="profile-top">
                <span className="avatar">YN</span>
                <div>
                  <h2>Your Name</h2>
                  <p>Designer-developer focused on practical interfaces</p>
                </div>
              </div>

              <div className="profile-grid">
                <div>
                  <span>Focus</span>
                  <strong>Portfolio, product, and brand sites</strong>
                </div>
                <div>
                  <span>Stack</span>
                  <strong>React, Vite, CSS, Node</strong>
                </div>
                <div>
                  <span>Style</span>
                  <strong>Editorial, dark, gallery-like</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>Open to projects</strong>
                </div>
              </div>

              <div className="profile-footer">
                <a href="#contact">
                  Start a project
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </aside>
        </section>

        <section className="section" id="work" data-reveal>
          <SectionHeading
            overline="Gallery"
            title="Selected work presented like a feed of featured pieces."
            description="Use the grid to make each project feel like a thumbnail-led ArtStation entry instead of a generic card."
          />

          <div className="filter-row" role="tablist" aria-label="Project filters">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
                role="tab"
                aria-selected={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {visibleProjects.map((project, index) => (
              <article
                key={project.id}
                className={`project-card project-card-gallery ${index === 0 ? 'featured' : ''}`}
                data-reveal
                onPointerMove={handleTiltMove}
                onPointerLeave={resetTilt}
                style={{
                  '--preview-a': project.featured ? 'rgba(25, 31, 45, 0.96)' : 'rgba(18, 23, 32, 0.96)',
                  '--preview-b': project.featured ? 'rgba(48, 83, 168, 0.94)' : 'rgba(35, 56, 79, 0.94)',
                  '--preview-c': project.featured ? 'rgba(127, 176, 255, 0.92)' : 'rgba(106, 167, 123, 0.9)',
                }}
              >
                <div className="project-preview" aria-hidden="true">
                  <div className="project-preview-glow" />
                  <div className="project-preview-card">
                    <span className="project-preview-label">{project.category}</span>
                    <strong>{project.title}</strong>
                  </div>
                  <span className="project-preview-badge">{project.accent}</span>
                </div>

                <div className="project-meta">
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
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section split-section" id="about" data-reveal>
          <div>
            <SectionHeading
              overline="About"
              title="The structure stays compact and high-contrast."
              description="This part is now closer to the profile-and-details rhythm you see on ArtStation."
            />
          </div>

          <div className="capability-list capability-list-gallery" aria-label="Capabilities list">
            {[
              'Curated presentation',
              'Strong visual hierarchy',
              'Dark UI systems',
              'Fast scanning content',
              'Motion polish',
              'Responsive layout',
            ].map((item) => (
              <div key={item} className="capability-item" data-reveal>
                <Bookmark size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="group" data-reveal>
          <SectionHeading
            overline="My group"
            title="A small team structure for focused work."
            description="Use this section to show how the project is organized and who handles each part of the workflow."
          />

          <div className="group-grid">
            {groupMembers.map((member) => (
              <article key={member.name} className="group-card" data-reveal>
                <span className="group-role">{member.name}</span>
                <h3>{member.role}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="experience" data-reveal>
          <SectionHeading
            overline="Experience"
            title="The work is organized around outcomes, not decoration."
            description="Use this section to show how you think and how you ship."
          />

          <div className="timeline">
            {experience.map((item) => (
              <article key={`${item.role}-${item.place}`} className="timeline-item" data-reveal>
                <div className="timeline-meta">
                  <span>{item.period}</span>
                </div>
                <div className="timeline-body">
                  <h3>{item.role}</h3>
                  <p className="timeline-place">{item.place}</p>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact" data-reveal>
          <div
            className="contact-card contact-card-gallery"
            onPointerMove={handleTiltMove}
            onPointerLeave={resetTilt}
          >
            <SectionHeading
              overline="Contact"
              title="Send a short brief and I'll respond with a concrete next step."
              description="Keep the message simple: goals, timeline, and what part you want handled."
            />

            <div className="contact-actions">
              <a className="primary-button" href="mailto:hello@yourname.com">
                <Mail size={16} />
                hello@yourname.com
              </a>
              <a className="secondary-button" href="https://github.com/" target="_blank" rel="noreferrer">
                <Github size={16} />
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
