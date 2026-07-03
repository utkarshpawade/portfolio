import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import LeetCodeStats from "@/components/LeetCodeStats";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

/* ── Themeable color roles (resolved per theme in globals.css) ─────── */
const INK = "var(--text)"; /* primary text                 */
const PAPER = "var(--bg)"; /* page background              */
const SURFACE = "var(--surface)"; /* surface / card / image bg    */
const ACCENT = "var(--accent)"; /* accent / action              */
const MUTED = "var(--muted)"; /* secondary / muted text       */
const INK_SOFT = "var(--soft)"; /* body text (soft)             */
const LINE = "var(--border)"; /* borders & dividers           */
const LINE_STRONG = "var(--border-strong)";

/* Inverted feature bands (stats / experience / skills / awards) */
const INV_BG = "var(--inv-bg)";
const INV_TEXT = "var(--inv-text)";
const INV_SOFT = "var(--inv-soft)";
const INV_MUTED = "var(--inv-muted)";
const INV_LINE = "color-mix(in srgb, var(--inv-text) 16%, transparent)";
const INV_LINE_SOFT = "color-mix(in srgb, var(--inv-text) 8%, transparent)";
const INV_LINE_STRONG = "color-mix(in srgb, var(--inv-text) 22%, transparent)";

const MONO = "var(--font-jetbrains-mono), monospace";

/* ── Content ──────────────────────────────────────────────────────── */
const NAME = "Utkarsh Pawade";
const TAGLINE = "Portfolio";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#awards", label: "Awards" },
  { href: "#contact", label: "Contact" },
];

type Project = {
  num: string;
  short: string;
  img: string;
  title: string;
  desc: string;
  tags: string[];
  code: string;
  demo: string;
  demoLabel: string;
};

const projects: Project[] = [
  {
    num: "01",
    short: "AI Cloud IDE",
    img: "/assets/Screenshot 2026-07-03 155628.webp",
    title: "AI-Powered Cloud IDE",
    desc: "Browser-based AI coding platform where an autonomous agent scaffolds, edits, and runs full projects from plain-English prompts — inspired by Cursor, Bolt, and Lovable.",
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Convex",
      "Inngest AgentKit",
      "Claude Sonnet 4",
      "WebContainers",
      "CodeMirror 6",
    ],
    code: "https://github.com/utkarshpawade/IDEce",
    demo: "",
    demoLabel: "Live demo",
  },
  {
    num: "02",
    short: "Nextable",
    img: "/assets/nextable.webp",
    title: "Nextable — Agentic App Generator",
    desc: "AI-powered Next.js 15 application generator with multi-model LLM support (GPT, Grok, Gemini) using Inngest Agent Kit for autonomous code generation.",
    tags: [
      "Next.js",
      "tRPC",
      "Prisma",
      "Inngest Agent Kit",
      "E2B",
      "PostgreSQL",
      "Clerk",
    ],
    code: "https://github.com/utkarshpawade/Nextable",
    demo: "",
    demoLabel: "Live demo",
  },
  {
    num: "03",
    short: "BrightSync",
    img: "/assets/brightysync.webp",
    title: "BrightSync — Brightness Synchronizer",
    desc: "A Windows desktop application that synchronizes brightness across laptop internal displays and external monitors using native Windows APIs and hardware-level control.",
    tags: [
      "Electron",
      "TypeScript",
      "React",
      "Node.js",
      "C++",
      "N-API",
      "Windows WMI",
      "DDC/CI",
    ],
    code: "https://github.com/utkarshpawade/BrightSync",
    demo: "https://youtu.be/4yxZ5b1Is8E",
    demoLabel: "Watch demo",
  },
  {
    num: "04",
    short: "Ticket Booking",
    img: "/assets/Screenshot 2026-05-05 155113.png",
    title: "Scalable Ticket Booking",
    desc: "Full-stack MERN movie ticket booking platform with seat selection, real-time availability, background jobs, and an admin dashboard for managing movies and bookings.",
    tags: ["MERN Stack", "REST APIs", "Clerk Auth", "Inngest", "MongoDB"],
    code: "https://github.com/utkarshpawade/Scalable-Ticket-Booking-System",
    demo: "https://scalable-ticket-booking-system.vercel.app/",
    demoLabel: "Live demo",
  },
];

const experience = [
  {
    role: "Full Stack Developer Intern",
    company: "Marvedge",
    location: "Remote · June 2026 – Present",
    period: "June 2026 — Now",
    points: [
      "Developed AI-powered demo generation workflows that transformed 500+ product URLs, recordings, and web pages into interactive product demos, reducing manual demo creation effort by 85%.",
      "Built web scraping, content extraction, and LLM-based product understanding pipelines that processed 10,000+ pages of product content, improving automated feature discovery.",
      "Engineered AI-driven demo features — automated script creation, voiceovers, subtitles, and personalization — producing 1,000+ interactive demos and cutting turnaround from hours to under 2 minutes.",
    ],
  },
  {
    role: "Machine Learning Research Intern",
    company: "NIT Calicut",
    location: "Kozhikode, Kerala · June 2025 – Aug 2025",
    period: "Jun – Aug 2025",
    points: [
      "Studied and reproduced a Gaussian Deformation Field Network with HexPlane Encoding, implementing the full pipeline from the paper's theoretical foundations in Google Colab.",
      "Implemented training and inference workflows in PyTorch, gaining hands-on experience with neural field representations and memory–compute trade-offs.",
      "Recreated a state-of-the-art 3D vision research model, analyzing architectural choices, optimization strategies, and limitations for real-world deployment.",
    ],
  },
  {
    role: "Open Source Contributor",
    company: "Stan",
    location: "",
    period: "Feb – May 2026",
    points: [
      "Contributed to stan-dev/bayesplot, an R package for Bayesian MCMC visualization with 112K+ monthly CRAN downloads — merged 29 PRs across 72 commits and 4,070+ lines of code.",
      "Modernized the codebase by replacing deprecated dplyr, tidyselect, and reshape2 APIs and migrating error handling to rlang::abort() with descriptive diagnostics.",
      "Fixed silent-failure bugs in core MCMC data pipelines and expanded unit-test coverage for data helpers and tidy parameter selection.",
    ],
  },
];

const education = [
  {
    period: "Aug 2023 — May 2027",
    institution: "Indian Institute of Information Technology, Sonepat",
    degree: "Bachelor of Technology — Computer Science & Engineering",
  },
];

const skillGroups = [
  {
    label: "Languages",
    items: ["Java", "Python", "R", "TypeScript", "JavaScript", "SQL"],
  },
  { label: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "Express.js"] },
  { label: "Databases", items: ["MongoDB", "PostgreSQL"] },
  { label: "DevOps", items: ["Docker", "Kubernetes"] },
  { label: "Tools", items: ["GitHub", "Linux"] },
  { label: "Analytics", items: ["Matplotlib", "Pandas", "NumPy", "SeaBorn"] },
];

const dsaStats = [
  { value: "700+", label: "Problems solved" },
  { value: "1868", label: "Peak rating" },
  { value: "Top 5.5%", label: "LeetCode percentile" },
];

const dsaPlatforms = [
  { name: "LeetCode", url: "https://leetcode.com/u/utkarshpawade/" },
  {
    name: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/profile/utkarshpawade",
  },
  { name: "Codeforces", url: "https://codeforces.com/profile/utkarsh134" },
  { name: "CodeChef", url: "https://www.codechef.com/users/utkarshpawade" },
];

const achievements = [
  {
    title: "Reliance Foundation Scholarship",
    year: "2024",
    detail:
      "Awarded after clearing a competitive national-level entrance exam with a low acceptance rate, recognized for academic excellence.",
  },
  {
    title: "Top 1% — Maharashtra State Board",
    year: "",
    detail:
      "Ranked among the top 1 percentile of Grade 12 students in Maharashtra.",
  },
  {
    title: "Pariksha Pe Charcha",
    year: "2020",
    detail:
      "Selected among 1,050 students from 2,60,000 applicants nationwide; interacted with the Hon. Prime Minister at Talkatora Stadium, New Delhi.",
  },
  {
    title: "700+ DSA problems solved",
    year: "",
    detail: "Across LeetCode, GeeksforGeeks, Codeforces and CodeChef.",
  },
  {
    title: "Peak LeetCode rating 1868",
    year: "",
    detail: "Ranked in the top 5.51 percentile by contest rating.",
  },
];

const certifications = [
  {
    title: "Complete Data Science, ML, DL & NLP Bootcamp",
    provider: "Udemy",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Data Science",
      "Data Analysis",
    ],
  },
  {
    title: "Complete Full-Stack Web Development Bootcamp",
    provider: "Udemy",
    skills: ["React", "Express.js", "Node.js", "MongoDB"],
  },
];

const marquee = [
  "Full-Stack Development",
  "Machine Learning",
  "AI Agents",
  "TypeScript",
  "React",
  "Next.js",
  "Distributed Systems",
  "Open Source",
  "MERN",
  "Research",
];

/* ── Shared style fragments ───────────────────────────────────────── */
const wrap: React.CSSProperties = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "0 clamp(20px,5vw,40px)",
};

const eyebrow: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 12,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: ACCENT,
};

const heading: React.CSSProperties = {
  marginTop: 16,
  fontSize: "clamp(36px,5vw,66px)",
  lineHeight: 0.97,
  letterSpacing: "-0.03em",
  fontWeight: 600,
};

/* ── Small helpers ────────────────────────────────────────────────── */
function Reveal({
  children,
  className,
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function useCountUp(target: number, run: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const dur = 1300;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return val;
}

/* ── Header ───────────────────────────────────────────────────────── */
function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "var(--header-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid ${LINE}`,
      }}
    >
      <div
        style={{
          ...wrap,
          height: 66,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <a
          href="#top"
          style={{
            fontFamily: MONO,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: INK,
            textDecoration: "none",
          }}
        >
          {NAME}
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <nav className="ed-nav" style={{ display: "flex", gap: 30 }}>
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="ed-navlink"
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="top" style={{ padding: "138px 0 60px" }}>
      <div style={wrap}>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 13,
              marginBottom: 30,
            }}
          >
            <span style={{ width: 36, height: 1, background: ACCENT }} />
            <span
              style={{
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              {TAGLINE}
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(58px,9.2vw,144px)",
              lineHeight: 0.9,
              letterSpacing: "-0.038em",
              fontWeight: 600,
            }}
          >
            Utkarsh
            <br />
            Pawade<span style={{ color: ACCENT }}>.</span>
          </h1>
          <p
            style={{
              marginTop: 32,
              maxWidth: 560,
              fontSize: 19,
              lineHeight: 1.55,
              color: INK_SOFT,
            }}
          >
            A pre-final-year CSE student at IIIT Sonepat, building scalable
            full-stack applications with{" "}
            <span style={{ color: INK, fontWeight: 600 }}>
              TypeScript, React, Next.js and the MERN stack
            </span>{" "}
            — with a strong pull toward AI and research.
          </p>
          <div
            style={{
              marginTop: 38,
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <a href="#work" className="ed-btn ed-btn-solid">
              View selected work
            </a>
            <a href="#contact" className="ed-btn ed-btn-ghost">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stats band (animated counters) ───────────────────────────────── */
function StatsBand() {
  const ref = useRef<HTMLElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setRun(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRun(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dsa = useCountUp(700, run);
  const proj = useCountUp(5, run);
  const intern = useCountUp(3, run);
  const rating = useCountUp(1868, run);

  const items = [
    { v: `${dsa}+`, l: "DSA problems solved" },
    { v: `${proj}+`, l: "Projects shipped" },
    { v: `${intern}`, l: "Internships & research" },
    { v: `${rating}`, l: "Peak LeetCode · top 5.5%" },
  ];

  return (
    <section ref={ref} style={{ background: INV_BG, color: INV_TEXT }}>
      <div
        style={{
          ...wrap,
          padding: "54px clamp(20px,5vw,40px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 36,
        }}
      >
        {items.map((it) => (
          <div key={it.l}>
            <div
              style={{
                fontSize: "clamp(42px,5vw,76px)",
                fontWeight: 600,
                letterSpacing: "-0.035em",
                lineHeight: 1,
                color: ACCENT,
              }}
            >
              {it.v}
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: INV_MUTED,
              }}
            >
              {it.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Marquee ──────────────────────────────────────────────────────── */
function Marquee() {
  return (
    <div
      style={{
        borderBottom: `1px solid ${LINE}`,
        overflow: "hidden",
        padding: "18px 0",
      }}
    >
      <div className="ed-marquee-track">
        {marquee.concat(marquee).map((item, i) => (
          <span
            key={i}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <span
              style={{
                fontSize: 23,
                fontWeight: 500,
                padding: "0 28px",
                color: INK,
              }}
            >
              {item}
            </span>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: ACCENT,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Selected work (carousel) ─────────────────────────────────────── */
function Work() {
  const [current, setCurrent] = useState(0);
  const total = projects.length;
  const go = (i: number) => setCurrent(((i % total) + total) % total);

  return (
    <section id="work" style={{ padding: "96px 0" }}>
      <div style={wrap}>
        <Reveal className="ed-head-split" style={{ marginBottom: 46 }}>
          <div>
            <span style={eyebrow}>01 — Selected Work</span>
            <h2 style={heading}>
              Things I&apos;ve
              <br />
              built.
            </h2>
          </div>
          <p
            style={{
              maxWidth: 330,
              color: MUTED,
              fontSize: 15,
              lineHeight: 1.55,
            }}
          >
            AI tooling, native desktop apps, and scalable platforms — selected
            full-stack and systems work.
          </p>
        </Reveal>

        {/* counter + arrows */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 22,
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 14,
              letterSpacing: "0.1em",
              color: INK,
            }}
          >
            {String(current + 1).padStart(2, "0")}{" "}
            <span style={{ color: MUTED }}>
              / {String(total).padStart(2, "0")}
            </span>
          </span>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              aria-label="Previous project"
              className="ed-arrow"
              onClick={() => go(current - 1)}
            >
              ←
            </button>
            <button
              aria-label="Next project"
              className="ed-arrow"
              onClick={() => go(current + 1)}
            >
              →
            </button>
          </div>
        </div>

        {/* track */}
        <div
          style={{
            overflow: "hidden",
            borderTop: `1px solid ${LINE}`,
          }}
        >
          <div
            style={{
              display: "flex",
              transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {projects.map((p) => (
              <div key={p.num} style={{ minWidth: "100%", padding: "42px 0" }}>
                <div className="ed-slide">
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "4 / 3",
                      border: `1px solid ${LINE_STRONG}`,
                      background: SURFACE,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      quality={85}
                      sizes="(max-width: 860px) 100vw, 45vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        right: 18,
                        bottom: -14,
                        fontSize: "clamp(96px,13vw,196px)",
                        fontWeight: 600,
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        color: "rgba(255,255,255,0.16)",
                        pointerEvents: "none",
                      }}
                    >
                      {p.num}
                    </span>
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "clamp(27px,3vw,42px)",
                        letterSpacing: "-0.022em",
                        fontWeight: 600,
                        lineHeight: 1.04,
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        marginTop: 18,
                        fontSize: 16,
                        lineHeight: 1.6,
                        color: INK_SOFT,
                        maxWidth: 550,
                      }}
                    >
                      {p.desc}
                    </p>
                    <div
                      style={{
                        marginTop: 22,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: MONO,
                            fontSize: 11,
                            letterSpacing: "0.04em",
                            padding: "6px 11px",
                            border: `1px solid ${LINE_STRONG}`,
                            color: INK_SOFT,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div style={{ marginTop: 28, display: "flex", gap: 22 }}>
                      <a
                        href={p.code}
                        target="_blank"
                        rel="noreferrer"
                        className="ed-link"
                      >
                        Code →
                      </a>
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="ed-link ed-link-muted"
                        >
                          {p.demoLabel} →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* index buttons */}
        <div
          style={{
            marginTop: 8,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          }}
        >
          {projects.map((p, i) => {
            const active = i === current;
            return (
              <button
                key={p.num}
                className="ed-proj-nav"
                onClick={() => go(i)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                  textAlign: "left",
                  padding: "18px 16px 18px 0",
                  background: "none",
                  cursor: "pointer",
                  border: "none",
                  borderTop: `2px solid ${active ? ACCENT : LINE}`,
                  color: active ? INK : MUTED,
                  transition: "color 0.2s,border-color 0.2s",
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: "0.08em",
                  }}
                >
                  {p.num}
                </span>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.short}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Experience ───────────────────────────────────────────────────── */
function Experience() {
  return (
    <section
      id="experience"
      style={{ padding: "96px 0", background: INV_BG, color: INV_TEXT }}
    >
      <div style={wrap}>
        <Reveal style={{ marginBottom: 38 }}>
          <span style={eyebrow}>02 — Experience</span>
          <h2 style={heading}>
            Where I&apos;ve
            <br />
            worked.
          </h2>
        </Reveal>
        {experience.map((e) => (
          <Reveal
            key={e.company}
            className="ed-exp"
            style={{
              padding: "38px 0",
              borderTop: `1px solid ${INV_LINE}`,
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  color: ACCENT,
                }}
              >
                {e.period}
              </span>
              <h3
                style={{
                  marginTop: 14,
                  fontSize: "clamp(24px,3vw,34px)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.06,
                }}
              >
                {e.company}
              </h3>
              {e.location && (
                <span
                  style={{
                    display: "block",
                    marginTop: 8,
                    fontFamily: MONO,
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    color: INV_MUTED,
                  }}
                >
                  {e.location}
                </span>
              )}
            </div>
            <div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  marginBottom: 16,
                }}
              >
                {e.role}
              </div>
              <div>
                {e.points.map((pt, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 15,
                      padding: "11px 0",
                      fontSize: 15,
                      lineHeight: 1.58,
                      color: INV_SOFT,
                      borderBottom: `1px solid ${INV_LINE_SOFT}`,
                    }}
                  >
                    <span
                      style={{
                        marginTop: 9,
                        width: 6,
                        height: 6,
                        flex: "0 0 auto",
                        background: ACCENT,
                      }}
                    />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Education ────────────────────────────────────────────────────── */
function Education() {
  return (
    <section id="education" style={{ padding: "96px 0" }}>
      <div style={wrap}>
        <Reveal className="ed-head-split" style={{ marginBottom: 46 }}>
          <div>
            <span style={eyebrow}>03 — Education</span>
            <h2 style={heading}>
              Where I
              <br />
              studied.
            </h2>
          </div>
          <p
            style={{
              maxWidth: 330,
              color: MUTED,
              fontSize: 15,
              lineHeight: 1.55,
            }}
          >
            Pursuing a Bachelor of Technology in Computer Science &amp;
            Engineering, with a research-driven focus.
          </p>
        </Reveal>
        {education.map((ed) => (
          <Reveal
            key={ed.institution}
            className="ed-edu"
            style={{
              padding: "40px 0",
              borderTop: `1px solid ${LINE}`,
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: 13,
                letterSpacing: "0.08em",
                color: ACCENT,
              }}
            >
              {ed.period}
            </span>
            <div>
              <h3
                style={{
                  fontSize: "clamp(26px,3.2vw,44px)",
                  fontWeight: 600,
                  letterSpacing: "-0.024em",
                  lineHeight: 1.04,
                }}
              >
                {ed.institution}
              </h3>
              <p style={{ marginTop: 14, fontSize: 18, color: INK_SOFT }}>
                {ed.degree}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Skills ───────────────────────────────────────────────────────── */
function Skills() {
  return (
    <section
      id="skills"
      style={{ padding: "96px 0", background: INV_BG, color: INV_TEXT }}
    >
      <div style={wrap}>
        <Reveal className="ed-head-split" style={{ marginBottom: 44 }}>
          <div>
            <span style={eyebrow}>04 — Capabilities</span>
            <h2 style={heading}>
              Tools &amp;
              <br />
              technologies.
            </h2>
          </div>
          <p
            style={{
              maxWidth: 330,
              color: INV_MUTED,
              fontSize: 15,
              lineHeight: 1.55,
            }}
          >
            From frontend frameworks to native systems work, data tooling, and
            infrastructure.
          </p>
        </Reveal>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
            gap: 1,
            background: INV_LINE,
            border: `1px solid ${INV_LINE}`,
          }}
        >
          {skillGroups.map((g) => (
            <div
              key={g.label}
              style={{ background: INV_BG, padding: "26px 24px", minHeight: 210 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: ACCENT,
                  }}
                >
                  {g.label}
                </span>
                <span
                  style={{ fontFamily: MONO, fontSize: 12, color: INV_MUTED }}
                >
                  {String(g.items.length).padStart(2, "0")}
                </span>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 11 }}
              >
                {g.items.map((it) => (
                  <span
                    key={it}
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      color: INV_TEXT,
                    }}
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Problem solving / DSA ────────────────────────────────────────── */
function Dsa() {
  return (
    <section id="dsa" style={{ padding: "96px 0" }}>
      <div style={wrap}>
        <Reveal className="ed-head-split" style={{ marginBottom: 46 }}>
          <div>
            <span style={eyebrow}>05 — Problem Solving</span>
            <h2 style={heading}>
              Problem Solving & DSA
              <br />
              Profile
            </h2>
          </div>
          <p
            style={{
              maxWidth: 330,
              color: MUTED,
              fontSize: 15,
              lineHeight: 1.55,
            }}
          >
            Consistent algorithmic practice across the major
            competitive-programming platforms.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: 1,
            background: LINE,
            border: `1px solid ${LINE}`,
          }}
        >
          {dsaStats.map((s) => (
            <div
              key={s.label}
              style={{ background: PAPER, padding: "34px 26px" }}
            >
              <div
                style={{
                  fontSize: "clamp(40px,4.6vw,68px)",
                  fontWeight: 600,
                  letterSpacing: "-0.035em",
                  lineHeight: 1,
                  color: ACCENT,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontFamily: MONO,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: MUTED,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: MUTED,
              marginRight: 8,
            }}
          >
            Platforms —
          </span>
          {dsaPlatforms.map((pf) => (
            <a
              key={pf.name}
              href={pf.url}
              target="_blank"
              rel="noreferrer"
              className="ed-chip"
              style={{
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.04em",
                padding: "8px 14px",
                border: `1px solid ${LINE_STRONG}`,
                color: INK_SOFT,
                textDecoration: "none",
              }}
            >
              {pf.name}
            </a>
          ))}
          <a
            href="https://leetcode.com/u/utkarshpawade"
            target="_blank"
            rel="noreferrer"
            className="ed-link"
            style={{ marginLeft: "auto" }}
          >
            View LeetCode →
          </a>
        </div>

        {/* live data: Codolio card + LeetCode stats */}
        <div className="ed-dsa-live" style={{ marginTop: 36 }}>
          <div style={{ width: "100%" }}>
            <iframe
              src="https://codolio.com/profile/utkarshpawade/card"
              width="100%"
              height="700"
              style={{ border: `1px solid ${LINE}` }}
              loading="lazy"
              title="Utkarsh Pawade Codolio Card"
            />
          </div>
          <LeetCodeStats />
        </div>
      </div>
    </section>
  );
}

/* ── Awards & certifications ──────────────────────────────────────── */
function Awards() {
  return (
    <section
      id="awards"
      style={{ padding: "96px 0", background: INV_BG, color: INV_TEXT }}
    >
      <div style={wrap}>
        <Reveal style={{ marginBottom: 46 }}>
          <span style={eyebrow}>06 — Recognition</span>
          <h2 style={heading}>
            Awards &amp;
            <br />
            certifications.
          </h2>
        </Reveal>
        <div className="ed-awards">
          <div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: 6,
              }}
            >
              Achievements
            </div>
            {achievements.map((a, i) => (
              <Reveal
                key={a.title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "48px 1fr",
                  gap: 18,
                  padding: "24px 0",
                  borderTop: `1px solid ${INV_LINE}`,
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    color: INV_MUTED,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 21,
                        fontWeight: 600,
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {a.title}
                    </h3>
                    {a.year && (
                      <span
                        style={{
                          fontFamily: MONO,
                          fontSize: 12,
                          color: ACCENT,
                        }}
                      >
                        {a.year}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      marginTop: 8,
                      fontSize: 15,
                      lineHeight: 1.58,
                      color: INV_SOFT,
                    }}
                  >
                    {a.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: 6,
              }}
            >
              Certifications
            </div>
            {certifications.map((c) => (
              <Reveal
                key={c.title}
                style={{
                  padding: "24px 0",
                  borderTop: `1px solid ${INV_LINE}`,
                }}
              >
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    letterSpacing: "-0.015em",
                    lineHeight: 1.18,
                  }}
                >
                  {c.title}
                </h3>
                <span
                  style={{
                    display: "block",
                    marginTop: 8,
                    fontFamily: MONO,
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    color: INV_MUTED,
                  }}
                >
                  {c.provider}
                </span>
                <div
                  style={{
                    marginTop: 14,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  {c.skills.map((sk) => (
                    <span
                      key={sk}
                      style={{
                        fontFamily: MONO,
                        fontSize: 11,
                        letterSpacing: "0.04em",
                        padding: "6px 11px",
                        border: `1px solid ${INV_LINE_STRONG}`,
                        color: INV_SOFT,
                      }}
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────────────────── */
function Contact() {
  return (
    <section
      id="contact"
      style={{
        background: PAPER,
        color: INK,
        padding: "112px 0 52px",
        borderTop: `1px solid ${LINE}`,
      }}
    >
      <div style={wrap}>
        <span style={{ ...eyebrow, letterSpacing: "0.16em" }}>
          07 — Contact
        </span>
        <h2
          style={{
            marginTop: 20,
            fontSize: "clamp(46px,7.4vw,116px)",
            lineHeight: 0.9,
            letterSpacing: "-0.038em",
            fontWeight: 600,
          }}
        >
          Let&apos;s build
          <br />
          something<span style={{ color: ACCENT }}>.</span>
        </h2>
        <p
          style={{
            marginTop: 26,
            maxWidth: 520,
            fontSize: 18,
            lineHeight: 1.55,
            color: INK_SOFT,
          }}
        >
          Currently looking for internships and open to discussing new projects
          and research.
        </p>
        <a
          href="mailto:utkarshpawade2@gmail.com"
          style={{
            display: "inline-block",
            marginTop: 34,
            fontSize: "clamp(22px,3vw,38px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: INK,
            textDecoration: "none",
            borderBottom: `2px solid ${ACCENT}`,
            paddingBottom: 6,
          }}
        >
          utkarshpawade2@gmail.com →
        </a>

        <div
          style={{ marginTop: 40, display: "flex", gap: 26, flexWrap: "wrap" }}
        >
          <a
            href="https://www.linkedin.com/in/utkarsh-pawade-4398831b0/"
            target="_blank"
            rel="noreferrer"
            className="ed-social"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/utkarshpawade"
            target="_blank"
            rel="noreferrer"
            className="ed-social"
          >
            GitHub ↗
          </a>
        </div>

        <ContactForm />

        <div
          style={{
            marginTop: 84,
            paddingTop: 24,
            borderTop: `1px solid ${LINE}`,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontFamily: MONO,
            fontSize: 12,
            letterSpacing: "0.06em",
            color: MUTED,
          }}
        >
          <span>© 2026 {NAME}</span>
          <span>B.Tech CSE · IIIT Sonepat</span>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "7f92dbbd-1c9e-4ebc-a6a3-eaa4ccd18c08",
          subject: `Portfolio Contact from ${email}`,
          email,
          message,
          from_name: email,
          to_email: "utkarshpawade2@gmail.com",
        }),
      });

      const data = (await response.json()) as { success?: boolean };

      if (data.success) {
        setStatus("success");
        setEmail("");
        setMessage("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: 48,
        maxWidth: 520,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 12,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: ACCENT,
        }}
      >
        Or send a message
      </div>
      {status === "success" && (
        <div
          style={{
            border: "1px solid #1F8A5B",
            color: "#1F6F4C",
            padding: "12px 16px",
            fontSize: 14,
          }}
        >
          Message sent — I&apos;ll get back to you soon.
        </div>
      )}
      {status === "error" && (
        <div
          style={{
            border: "1px solid #C0392B",
            color: "#A02B20",
            padding: "12px 16px",
            fontSize: 14,
          }}
        >
          Failed to send. Please email utkarshpawade2@gmail.com directly.
        </div>
      )}
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === "loading"}
        className="ed-input"
      />
      <textarea
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={4}
        disabled={status === "loading"}
        className="ed-input"
        style={{ resize: "none" }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="ed-btn ed-btn-solid ed-submit"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Head>
        <title>Utkarsh Pawade</title>
        <meta name="robots" content="follow, index" />
        <meta name="theme-color" content="#EFEAE0" />
        <meta
          name="description"
          content="Pre-Final Year CSE student at IIIT Sonepat | Full-Stack Developer"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Utkarsh Pawade" />
        <meta
          property="og:description"
          content="Pre-Final Year CSE student at IIIT Sonepat | Full-Stack Developer"
        />
        <meta property="og:title" content="Utkarsh Pawade" />
        <meta
          property="og:image"
          content="https://www.Utkarsh.codes/assets/logo.webp"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Utkarsh Pawade" />
        <meta
          name="twitter:description"
          content="Pre-Final Year CSE student at IIIT Sonepat | Full-Stack Developer"
        />
        <meta
          name="twitter:image"
          content="https://www.Utkarsh.codes/assets/logo.webp"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>

      <Header />
      <main style={{ background: PAPER, color: INK, overflowX: "hidden" }}>
        <Hero />
        <StatsBand />
        <Marquee />
        <Work />
        <Experience />
        <Education />
        <Skills />
        <Dsa />
        <Awards />
        <Contact />
      </main>

      <style jsx global>{`
        .ed-head-split {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .ed-slide {
          display: grid;
          grid-template-columns: 0.92fr 1.08fr;
          gap: 50px;
          align-items: center;
        }
        .ed-exp {
          display: grid;
          grid-template-columns: 0.78fr 1.22fr;
          gap: 44px;
        }
        .ed-edu {
          display: grid;
          grid-template-columns: 0.42fr 1.58fr;
          gap: 44px;
          align-items: start;
        }
        .ed-awards {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 56px;
          align-items: start;
        }
        .ed-dsa-live {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 36px;
          align-items: stretch;
        }
        @media (max-width: 980px) {
          .ed-dsa-live {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 860px) {
          .ed-slide,
          .ed-exp,
          .ed-awards {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
        @media (max-width: 680px) {
          .ed-edu {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
        @media (max-width: 720px) {
          .ed-nav {
            display: none !important;
          }
        }

        .ed-marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }

        .ed-navlink {
          color: ${MUTED};
          transition: color 0.2s;
        }
        .ed-navlink:hover {
          color: ${INK};
        }

        .ed-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 15px 26px;
          font-family: ${MONO};
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition:
            background 0.2s,
            border-color 0.2s,
            color 0.2s;
        }
        .ed-btn-solid {
          background: ${INK};
          color: ${PAPER};
          border: 1px solid ${INK};
        }
        .ed-btn-solid:hover {
          background: ${ACCENT};
          border-color: ${ACCENT};
        }
        .ed-btn-ghost {
          background: transparent;
          color: ${INK};
          border: 1px solid ${LINE_STRONG};
        }
        .ed-btn-ghost:hover {
          border-color: ${INK};
        }
        .ed-submit {
          width: 100%;
        }
        .ed-submit:disabled {
          opacity: 0.5;
          cursor: default;
        }

        .ed-arrow {
          width: 48px;
          height: 48px;
          border: 1px solid ${LINE_STRONG};
          background: transparent;
          color: ${INK};
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            background 0.2s,
            color 0.2s,
            border-color 0.2s;
        }
        .ed-arrow:hover {
          background: ${INK};
          color: ${PAPER};
          border-color: ${INK};
        }

        .ed-link {
          font-family: ${MONO};
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${INK};
          text-decoration: none;
          border-bottom: 2px solid ${ACCENT};
          padding-bottom: 4px;
        }
        .ed-link-muted {
          color: ${MUTED};
          border-bottom-color: ${LINE_STRONG};
        }

        .ed-proj-nav:hover {
          color: ${INK};
        }

        .ed-chip {
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .ed-chip:hover {
          background: ${INK};
          color: ${PAPER};
          border-color: ${INK};
        }

        .ed-social {
          font-family: ${MONO};
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${MUTED};
          text-decoration: none;
          transition: color 0.2s;
        }
        .ed-social:hover {
          color: ${INK};
        }

        .ed-input {
          width: 100%;
          padding: 14px 16px;
          background: transparent;
          border: 1px solid ${LINE_STRONG};
          color: ${INK};
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }
        .ed-input::placeholder {
          color: ${MUTED};
        }
        .ed-input:focus {
          border-color: ${ACCENT};
        }
        .ed-input:disabled {
          opacity: 0.5;
        }
      `}</style>
    </>
  );
}
