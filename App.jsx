import React, { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Design tokens
// bg: #10132A   deep indigo-navy (not pure black — avoids the acid-on-black default)
// surface: #1B2049
// border: #2A2F5C
// text: #EDEFFB / muted: #9AA3C9
// accent (signal/cyan): #5EEAD4
// accent (spark/amber): #F5B843
// display/mono face: JetBrains Mono — a "terminal" register fitting an AI/ML coder
// body face: Inter
// Signature element: an animated neural-net graph in the hero — pulses travel
// along synapses, echoing "AI & ML" without resorting to a generic circuit-board cliché.
// ---------------------------------------------------------------------------

const GITHUB_URL = "https://github.com/owaisansari1509-ship-it";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const SKILLS = [
  { name: "Python", note: "core language" },
  { name: "Machine Learning", note: "supervised & unsupervised" },
  { name: "Deep Learning", note: "neural networks" },
  { name: "Data Analysis", note: "pandas, numpy" },
  { name: "Git & GitHub", note: "version control" },
  { name: "Problem Solving", note: "applied AI" },
];

function NeuralField() {
  // A small fixed layout of nodes + edges, animated with staggered pulses.
  const nodes = [
    { id: 0, x: 60, y: 80 },
    { id: 1, x: 60, y: 220 },
    { id: 2, x: 60, y: 340 },
    { id: 3, x: 220, y: 40 },
    { id: 4, x: 220, y: 150 },
    { id: 5, x: 220, y: 260 },
    { id: 6, x: 220, y: 380 },
    { id: 7, x: 380, y: 100 },
    { id: 8, x: 380, y: 220 },
    { id: 9, x: 380, y: 330 },
    { id: 10, x: 520, y: 170 },
    { id: 11, x: 520, y: 280 },
  ];
  const edges = [
    [0, 3], [0, 4], [1, 3], [1, 4], [1, 5], [2, 5], [2, 6],
    [3, 7], [4, 7], [4, 8], [5, 8], [5, 9], [6, 9],
    [7, 10], [8, 10], [8, 11], [9, 11],
  ];

  return (
    <svg
      className="neural-field"
      viewBox="0 0 580 420"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => {
        const na = nodes[a];
        const nb = nodes[b];
        return (
          <line
            key={`e-${i}`}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            className="edge"
            style={{ animationDelay: `${(i % 9) * 0.35}s` }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <circle
          key={`n-${n.id}`}
          cx={n.x}
          cy={n.y}
          r={i === 10 || i === 11 ? 6 : 4.5}
          className="node"
          style={{ animationDelay: `${(i % 6) * 0.5}s` }}
        />
      ))}
    </svg>
  );
}

function Section({ id, eyebrow, title, children, className = "" }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section-inner">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && <h2 className="section-title">{title}</h2>}
        {children}
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const fullLine = "print(f\"Hi, I'm Owais — building with AI & ML.\")";
  const idxRef = useRef(0);

  useEffect(() => {
    idxRef.current = 0;
    setTyped("");
    const t = setInterval(() => {
      idxRef.current += 1;
      setTyped(fullLine.slice(0, idxRef.current));
      if (idxRef.current >= fullLine.length) clearInterval(t);
    }, 35);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="portfolio-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .portfolio-root {
          --bg: #10132A;
          --bg-alt: #151934;
          --surface: #1B2049;
          --surface-hover: #212657;
          --border: #2A2F5C;
          --text: #EDEFFB;
          --text-muted: #9AA3C9;
          --accent: #5EEAD4;
          --accent-dim: rgba(94, 234, 212, 0.14);
          --spark: #F5B843;

          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
          position: relative;
        }

        .portfolio-root * { box-sizing: border-box; }
        .portfolio-root a { color: inherit; text-decoration: none; }
        .portfolio-root ::selection { background: var(--accent); color: #0A0C1E; }

        .mono { font-family: 'JetBrains Mono', monospace; }

        /* ---------- Nav ---------- */
        .nav {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 6vw;
          background: rgba(16, 19, 42, 0.82);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.02em;
          color: var(--text);
        }
        .nav-logo span { color: var(--accent); }
        .nav-links {
          display: flex;
          gap: 28px;
        }
        .nav-links a {
          font-size: 14px;
          color: var(--text-muted);
          transition: color 0.2s ease;
          position: relative;
        }
        .nav-links a:hover { color: var(--text); }
        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 1px solid var(--accent);
          border-radius: 6px;
          color: var(--accent);
          font-size: 13px;
          font-family: 'JetBrains Mono', monospace;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .nav-cta:hover { background: var(--accent); color: #0A0C1E; }
        .nav-toggle { display: none; background: none; border: none; color: var(--text); font-size: 22px; cursor: pointer; }
        .nav-mobile {
          display: none;
          flex-direction: column;
          gap: 4px;
          padding: 12px 6vw 20px;
          background: var(--bg-alt);
          border-bottom: 1px solid var(--border);
        }
        .nav-mobile a { padding: 10px 0; font-size: 15px; color: var(--text-muted); border-bottom: 1px solid var(--border); }

        /* ---------- Hero ---------- */
        .hero {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 88vh;
          padding: 6vw;
          overflow: hidden;
        }
        .neural-field {
          position: absolute;
          right: -6%;
          top: 50%;
          transform: translateY(-50%);
          width: min(58vw, 640px);
          height: auto;
          opacity: 0.85;
          pointer-events: none;
        }
        .neural-field .node {
          fill: var(--accent);
          filter: drop-shadow(0 0 6px rgba(94,234,212,0.6));
          animation: pulse-node 3.2s ease-in-out infinite;
        }
        .neural-field .edge {
          stroke: var(--accent);
          stroke-width: 1;
          opacity: 0.18;
          animation: pulse-edge 3.2s ease-in-out infinite;
        }
        @keyframes pulse-node {
          0%, 100% { opacity: 0.55; r: 4.5; }
          50% { opacity: 1; }
        }
        @keyframes pulse-edge {
          0%, 100% { opacity: 0.1; stroke: var(--accent); }
          50% { opacity: 0.55; stroke: var(--spark); }
        }

        .hero-content { position: relative; z-index: 2; max-width: 640px; }
        .eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          margin: 0 0 16px;
        }
        .hero-name {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 800;
          font-size: clamp(34px, 5.4vw, 58px);
          line-height: 1.08;
          margin: 0 0 18px;
          letter-spacing: -0.01em;
        }
        .hero-name .accent { color: var(--accent); }
        .hero-desc {
          font-size: 16.5px;
          line-height: 1.65;
          color: var(--text-muted);
          margin: 0 0 28px;
          max-width: 520px;
        }
        .terminal {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 16px 18px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13.5px;
          color: var(--accent);
          max-width: 480px;
          margin-bottom: 32px;
        }
        .terminal .dots { display: flex; gap: 6px; margin-bottom: 12px; }
        .terminal .dot { width: 9px; height: 9px; border-radius: 50%; background: var(--border); }
        .terminal .cursor {
          display: inline-block;
          width: 7px;
          height: 14px;
          background: var(--accent);
          margin-left: 2px;
          vertical-align: middle;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }

        .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 22px;
          border-radius: 7px;
          font-size: 14.5px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          transition: transform 0.15s ease, background 0.2s ease, border-color 0.2s ease;
          cursor: pointer;
        }
        .btn-primary { background: var(--accent); color: #0A0C1E; border: 1px solid var(--accent); }
        .btn-primary:hover { transform: translateY(-2px); background: #7FF3E0; }
        .btn-ghost { background: transparent; color: var(--text); border: 1px solid var(--border); }
        .btn-ghost:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

        /* ---------- Sections ---------- */
        .section { padding: 96px 6vw; border-top: 1px solid var(--border); }
        .section-inner { max-width: 980px; margin: 0 auto; }
        .section-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 700;
          margin: 0 0 28px;
        }
        .section-alt { background: var(--bg-alt); }

        .about-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .about-text { font-size: 16px; line-height: 1.85; color: var(--text-muted); }
        .about-text strong { color: var(--text); font-weight: 600; }
        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 14px;
        }
        .stat-card .label { font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: var(--accent); text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 6px; }
        .stat-card .value { font-size: 15px; color: var(--text); font-weight: 600; margin: 0; }

        /* ---------- Timeline (education + experience) ---------- */
        .timeline-card {
          display: flex;
          gap: 20px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 26px 28px;
          margin-bottom: 20px;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .timeline-card:hover { border-color: var(--accent); transform: translateX(4px); }
        .timeline-icon {
          flex-shrink: 0;
          width: 46px;
          height: 46px;
          border-radius: 9px;
          background: var(--accent-dim);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
        }
        .timeline-role { font-size: 17px; font-weight: 700; margin: 0 0 4px; }
        .timeline-org { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--accent); margin: 0 0 10px; }
        .timeline-desc { font-size: 14.5px; line-height: 1.7; color: var(--text-muted); margin: 0; }

        /* ---------- Skills ---------- */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .skill-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 20px;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .skill-card:hover { border-color: var(--spark); transform: translateY(-3px); }
        .skill-name { font-weight: 600; font-size: 15px; margin: 0 0 4px; }
        .skill-note { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--text-muted); margin: 0; }

        /* ---------- GitHub / contact ---------- */
        .contact-card {
          background: linear-gradient(135deg, var(--surface), var(--bg-alt));
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 48px;
          text-align: center;
        }
        .contact-card h3 { font-family: 'JetBrains Mono', monospace; font-size: 24px; margin: 0 0 12px; }
        .contact-card p { color: var(--text-muted); font-size: 15px; margin: 0 0 26px; }

        footer {
          padding: 32px 6vw;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: var(--text-muted);
          font-family: 'JetBrains Mono', monospace;
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 860px) {
          .neural-field { opacity: 0.35; right: -20%; }
          .about-grid { grid-template-columns: 1fr; }
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .nav-links, .nav-cta { display: none; }
          .nav-toggle { display: block; }
          .nav-mobile { display: ${menuOpen ? "flex" : "none"}; }
          .hero { min-height: auto; padding-top: 48px; padding-bottom: 64px; }
          .skills-grid { grid-template-columns: 1fr 1fr; }
          .section { padding: 64px 6vw; }
          .timeline-card { flex-direction: column; }
          .contact-card { padding: 32px 20px; }
        }

        :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .neural-field .node, .neural-field .edge, .terminal .cursor { animation: none !important; }
        }
      `}</style>

      {/* Nav */}
      <nav className="nav">
        <div className="nav-logo">moa<span>.</span>ai</div>
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>
        <a className="nav-cta" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
        <button className="nav-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          ☰
        </button>
      </nav>
      <div className="nav-mobile">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      </div>

      {/* Hero */}
      <header className="hero">
        <NeuralField />
        <div className="hero-content">
          <p className="eyebrow">AI &amp; ML Diploma Student · Maharashtra</p>
          <h1 className="hero-name">
            Mohammed Owais<br /><span className="accent">Ansari</span>
          </h1>
          <p className="hero-desc">
            I train models, wrangle data, and turn machine learning theory into
            things that actually run. Currently interning at Elite Forums while
            completing my diploma in AI &amp; Machine Learning.
          </p>
          <div className="terminal mono">
            <div className="dots">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
            <span>&gt;&gt;&gt; {typed}</span>
            <span className="cursor" />
          </div>
          <div className="hero-actions">
            <a className="btn btn-primary" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              View GitHub
            </a>
            <a className="btn btn-ghost" href="#experience">See Experience</a>
          </div>
        </div>
      </header>

      {/* About */}
      <Section id="about" eyebrow="About" title="A little about me">
        <div className="about-grid">
          <p className="about-text">
            I'm <strong>Mohammed Owais Ansari</strong>, a diploma student in{" "}
            <strong>Artificial Intelligence &amp; Machine Learning</strong>{" "}
            from Maharashtra. I'm drawn to the part of AI/ML where a math
            concept on a whiteboard turns into a model that predicts, classifies,
            or generates something useful. Alongside my studies, I'm currently
            interning at <strong>Elite Forums</strong>, where I'm getting
            hands-on exposure to how AI concepts are applied outside the
            classroom. I like clean code, well-labeled datasets, and figuring
            out why a model isn't converging at 2am.
          </p>
          <div>
            <div className="stat-card">
              <p className="label">Field</p>
              <p className="value">Artificial Intelligence &amp; Machine Learning</p>
            </div>
            <div className="stat-card">
              <p className="label">Based in</p>
              <p className="value">Maharashtra, India</p>
            </div>
            <div className="stat-card">
              <p className="label">Currently</p>
              <p className="value">Interning at Elite Forums</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Education */}
      <Section id="education" eyebrow="Education" title="Where I'm learning" className="section-alt">
        <div className="timeline-card">
          <div className="timeline-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3L1 9l11 6 9-4.9V17h2V9L12 3z" />
              <path d="M5 13.18v4L12 21l7-3.82v-4" />
            </svg>
          </div>
          <div>
            <p className="timeline-role">Diploma in Artificial Intelligence &amp; Machine Learning</p>
            <p className="timeline-org mono">Viva Institute of Technology · Maharashtra</p>
            <p className="timeline-desc">
              Building a foundation in AI &amp; ML — covering core programming,
              data handling, statistics, and the fundamentals of machine
              learning models — as part of a diploma program in Maharashtra.
            </p>
          </div>
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" eyebrow="Experience" title="Where I've worked">
        <div className="timeline-card">
          <div className="timeline-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <div>
            <p className="timeline-role">Intern</p>
            <p className="timeline-org mono">Elite Forums</p>
            <p className="timeline-desc">
              Gaining practical, real-world experience alongside my diploma —
              applying core AI &amp; ML concepts, sharpening my problem-solving,
              and learning how technical work gets done in a professional
              setting.
            </p>
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" eyebrow="Skills" title="What I work with" className="section-alt">
        <div className="skills-grid">
          {SKILLS.map((s) => (
            <div className="skill-card" key={s.name}>
              <p className="skill-name">{s.name}</p>
              <p className="skill-note mono">{s.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact / GitHub */}
      <Section id="contact" eyebrow="Get in touch" title="">
        <div className="contact-card">
          <h3>Let's build something intelligent.</h3>
          <p>The best way to see my work in progress is on GitHub.</p>
          <a className="btn btn-primary" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            github.com/owaisansari1509-ship-it
          </a>
        </div>
      </Section>

      <footer>
        <span>© {new Date().getFullYear()} Mohammed Owais Ansari</span>
        <span>Built with React</span>
      </footer>
    </div>
  );
}