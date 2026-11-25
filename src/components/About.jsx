"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Database,
  Layout,
  Terminal,
  Server,
  User,
  Briefcase,
  GraduationCap,
  MapPin,
} from "lucide-react";

const highlights = [
  {
    icon: Layout,
    title: "Frontend Engineering",
    desc: "React.js, Next.js, Tailwind CSS, Responsive Web Design, GSAP animations, and accessible UI systems.",
  },
  {
    icon: Server,
    title: "Backend Architecture",
    desc: "Node.js, Express.js, RESTful APIs, Secure Authentication (JWT, RBAC), and robust server architecture.",
  },
  {
    icon: Database,
    title: "Database Design",
    desc: "MongoDB schemas with Mongoose, PostgreSQL relational modeling, indexing, aggregation, and Prisma ORM.",
  },
  {
    icon: Terminal,
    title: "Development & Versioning",
    desc: "Git, GitHub workflows, Postman API testing, clean code principles, performance profiling, and CI/CD.",
  },
];

export default function About() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const terminalCardRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Kinetic typography reveal for headline words
      gsap.from(".about-word", {
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 80%",
        },
        yPercent: 120,
        opacity: 0,
        rotateX: -20,
        stagger: 0.05,
        duration: 0.9,
        ease: "power4.out",
      });

      // Left side text reveal
      gsap.from(".about-fade-in", {
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 75%",
        },
        y: 35,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      });

      // Right side card reveal
      gsap.from(rightColRef.current, {
        scrollTrigger: {
          trigger: rightColRef.current,
          start: "top 80%",
        },
        scale: 0.92,
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
      });

      // Highlight cards stagger
      gsap.from(".about-highlight-card", {
        scrollTrigger: {
          trigger: ".about-highlights-grid",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      // 3D Card tilt on mousemove for terminal card
      const card = terminalCardRef.current;
      if (card) {
        const onMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          const rotX = -(y / (rect.height / 2)) * 6;
          const rotY = (x / (rect.width / 2)) * 6;

          gsap.to(card, {
            rotateX: rotX,
            rotateY: rotY,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power1.out",
          });
        };

        const onMouseLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        };

        card.addEventListener("mousemove", onMouseMove);
        card.addEventListener("mouseleave", onMouseLeave);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-transparent border-t border-[var(--border)] z-10"
    >
      <div className="py-28 md:py-36 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
      {/* Section Label */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-6 h-0.5 bg-[var(--accent)] shrink-0" />
        <span className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--accent)]">
          About Me
        </span>
      </div>

      {/* Split Screen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Typography & Philosophy (7 Cols) */}
        <div ref={leftColRef} className="lg:col-span-7 flex flex-col items-start">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-[-0.02em] text-[var(--text)] uppercase leading-[1.05] mb-8">
            <span className="inline-block overflow-hidden py-1">
              <span className="about-word inline-block mr-3">Full-Stack</span>
              <span className="about-word inline-block mr-3">Engineering</span>
            </span>{" "}
            <span className="inline-block overflow-hidden py-1">
              <span className="about-word inline-block text-[var(--accent)] mr-3">&amp;</span>
              <span className="about-word inline-block text-[var(--accent)]">MERN Systems.</span>
            </span>
          </h2>

          <div className="about-fade-in space-y-6 text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed mb-10">
            <p>
              I am a <strong className="text-[var(--text)] font-semibold">Full-Stack MERN Developer</strong> based in Lalitpur, Nepal. I graduated with a Bachelor in Computer Application (BCA) from Tribhuvan University and currently work as a Junior MERN Developer at Legacy IT.
            </p>
            <p>
              My work focuses on architecting RESTful APIs with Node.js and Express, schema design and data modeling with MongoDB and PostgreSQL, and developing responsive, high-performance web applications using React, Next.js, and Tailwind CSS.
            </p>
          </div>

          {/* Highlight Grid */}
          <div className="about-highlights-grid grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="about-highlight-card p-5 rounded-2xl bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all duration-300 group shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:text-white group-hover:bg-[var(--accent)] transition-all mb-3.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text)] tracking-tight mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Authentic Signature Element */}
          <div className="about-fade-in flex items-center justify-between w-full pt-6 border-t border-[var(--border)]">
            <div>
              <p className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--text-muted)]">
                Current Role
              </p>
              <p className="text-sm text-[var(--text)] mt-1 font-mono">
                Junior MERN Developer @ Legacy IT
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Professional Profile & Overview (5 Cols) */}
        <div ref={rightColRef} className="lg:col-span-5">
          <div
            ref={terminalCardRef}
            data-cursor-text="PROFILE"
            className="rounded-3xl bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] shadow-2xl overflow-hidden will-change-transform"
          >
            {/* Profile Header */}
            <div className="p-6 sm:p-7 bg-[#12121c]/70 border-b border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[var(--accent)]">
                  <User className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text)] tracking-tight">
                    Derick Subedi
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Full-Stack MERN Developer
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[11px] text-[var(--accent)] font-medium">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <span>Available</span>
              </div>
            </div>

            {/* Profile Content Body - Clean, Human-Readable */}
            <div className="p-6 sm:p-7 space-y-5 text-sm">
              {/* Current Role */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shrink-0 mt-0.5">
                  <Briefcase className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--text-muted)]">
                    Current Position
                  </p>
                  <p className="text-sm font-semibold text-[var(--text)] mt-0.5">
                    Junior MERN Developer
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Legacy IT • Commercial Web Development
                  </p>
                </div>
              </div>

              {/* Education */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shrink-0 mt-0.5">
                  <GraduationCap className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--text-muted)]">
                    Education
                  </p>
                  <p className="text-sm font-semibold text-[var(--text)] mt-0.5">
                    Bachelor in Computer Application (BCA)
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Tribhuvan University
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--text-muted)]">
                    Location
                  </p>
                  <p className="text-sm font-medium text-[var(--text)] mt-0.5">
                    Lalitpur, Kathmandu, Nepal
                  </p>
                </div>
              </div>

              {/* Primary Technologies */}
              <div className="pt-4 border-t border-[var(--border)]">
                <p className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--text-muted)] mb-2.5">
                  Core Technologies
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Next.js", "Tailwind CSS"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-[var(--border)] text-xs text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats Footer */}
            <div className="grid grid-cols-2 divide-x divide-[var(--border)] bg-[#09090e]/80 border-t border-[var(--border)] text-center py-4">
              <div>
                <p className="text-xl font-bold text-[var(--text)] tracking-tight">Legacy IT</p>
                <p className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--text-muted)] mt-0.5">
                  Commercial Experience
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-[var(--accent)] tracking-tight">BCA</p>
                <p className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--text-muted)] mt-0.5">
                  Tribhuvan University
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
