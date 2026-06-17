import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Github, Mail, Menu, MoveRight, Sparkles, SquareTerminal } from 'lucide-react';
import { ProjectCard } from './components/ProjectCard';
import { SectionHeading } from './components/SectionHeading';

const projects = [
  {
    id: 'strategy-dashboard',
    title: 'Strategy Dashboard',
    category: 'Product',
    summary: 'A dense operational dashboard for internal planning, review, and launch coordination.',
    impact: 'Reduced weekly status meeting time by 40%.',
    accent: 'Warm white / slate / cobalt',
  },
  {
    id: 'brand-refresh',
    title: 'Brand Refresh System',
    category: 'Brand',
    summary: 'A modular identity system for a small studio that needed consistent output across channels.',
    impact: 'Cut asset production time from days to hours.',
    accent: 'Stone / ink / copper',
  },
  {
    id: 'developer-portfolio',
    title: 'Developer Portfolio',
    category: 'Web',
    summary: 'A focused portfolio with a strong first viewport signal and clear entry points.',
    impact: 'Improved contact conversion by making the next action obvious.',
    accent: 'Charcoal / moss / paper',
  },
  {
    id: 'launch-page',
    title: 'Launch Page',
    category: 'Web',
    summary: 'A concise product page with fast scanning, social proof, and direct conversion paths.',
    impact: 'Raised demo requests without adding visual noise.',
    accent: 'Graphite / ivory / cyan',
  },
];

const capabilities = [
  'Product thinking',
  'Frontend implementation',
  'Design systems',
  'Content structure',
  'Motion and interaction',
  'Responsive layouts',
];

const experience = [
  {
    role: 'Frontend Developer',
    place: 'Independent',
    period: '2023 - Present',
    detail: 'Builds polished React interfaces with an emphasis on clarity, speed, and maintainability.',
  },
  {
    role: 'Product Designer',
    place: 'Studio work',
    period: '2020 - 2023',
    detail: 'Shaped websites and dashboards for early-stage teams that needed crisp information hierarchy.',
  },
  {
    role: 'Visual Systems',
    place: 'Freelance',
    period: '2018 - 2020',
    detail: 'Defined component libraries and brand systems for small teams with limited design support.',
  },
];

const filters = ['All', 'Product', 'Brand', 'Web'];

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

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealTargets = document.querySelectorAll('[data-reveal]');

    revealTargets.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index, 10) * 90}ms`);
    });

    if (reducedMotion) {
      revealTargets.forEach((element) => {
        element.classList.add('is-visible');
      });
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

  return (
    <div className="app-shell">
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
            <small>Portfolio for thoughtful builders</small>
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
          <a href="#work">Work</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home" data-reveal>
          <div className="hero-copy" data-reveal>
            <span className="eyebrow">
              <Sparkles size={14} />
              Available for select freelance work
            </span>
            <h1>Product design and frontend work that stays legible under pressure.</h1>
            <p className="hero-text">
              I design and build clear, fast portfolio and product experiences for teams that care about structure,
              polish, and maintainability.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#work">
                View selected work
                <MoveRight size={16} />
              </a>
              <a className="secondary-button" href="mailto:hello@yourname.com">
                <Mail size={16} />
                hello@yourname.com
              </a>
            </div>

            <div className="hero-stats" aria-label="Highlights">
              <div>
                <strong>12+</strong>
                <span>projects launched</span>
              </div>
              <div>
                <strong>8</strong>
                <span>years designing and coding</span>
              </div>
              <div>
                <strong>1</strong>
                <span>clear point of contact</span>
              </div>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Profile summary" data-reveal>
            <div className="profile-card">
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
                  <span>Location</span>
                  <strong>Remote / Pacific Time</strong>
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
            overline="Selected work"
            title="A short list of projects with real constraints."
            description="This portfolio is built around scanning, comparison, and an obvious next step."
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

          <div className="project-grid">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section className="section split-section" id="capabilities" data-reveal>
          <div>
            <SectionHeading
              overline="Capabilities"
              title="I keep the scope narrow and the output usable."
              description="The site is structured for clarity first, with enough visual tension to feel intentional."
            />
          </div>

          <div className="capability-list" aria-label="Capabilities list">
            {capabilities.map((item) => (
              <div key={item} className="capability-item" data-reveal>
                <SquareTerminal size={16} />
                <span>{item}</span>
              </div>
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
          <div className="contact-card">
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
