"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layout, Server, Database, Wrench } from "lucide-react";

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    icon: Layout,
    accent: "from-sky-500/20 to-transparent",
    description: "Architecting responsive, high-performance user interfaces with modern React paradigms.",
    skills: [
      { name: "React", level: "Advanced Component Architecture & Hooks" },
      { name: "JavaScript", level: "ES6+, Async, DOM, Engine Internals" },
      { name: "HTML5 & CSS3", level: "Semantic Markup, Modern Flex & Grid" },
      { name: "Tailwind CSS", level: "Design Systems, Utility Architecture" },
      { name: "Next.js", level: "App Router, SSR, SSG & Hybrid Rendering" },
    ],
  },
  {
    id: "backend",
    title: "Backend Architecture",
    icon: Server,
    accent: "from-indigo-500/20 to-transparent",
    description: "Building scalable, secure APIs and micro-services with clean business logic.",
    skills: [
      { name: "Node.js", level: "Event Loop, Streams, Server Optimization" },
      { name: "Express.js", level: "Routing, Middleware, Error Handling" },
      { name: "REST APIs", level: "Stateless Resource Design & Validation" },
      { name: "Authentication", level: "JWT, Session Security, Role-Based Access (RBAC)" },
    ],
  },
  {
    id: "database",
    title: "Database & Storage",
    icon: Database,
    accent: "from-emerald-500/20 to-transparent",
    description: "Designing efficient data models, relational constraints, and flexible document stores.",
    skills: [
      { name: "MongoDB", level: "Schema Design, Aggregation Framework, Mongoose" },
      { name: "PostgreSQL", level: "Relational Modeling, Normalization, Queries" },
      { name: "Prisma", level: "Type-Safe Querying, Migrations, Relations" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Ecosystem",
    icon: Wrench,
    accent: "from-purple-500/20 to-transparent",
    description: "Leveraging modern tooling for streamlined developer workflows and reliable testing.",
    skills: [
      { name: "Git", level: "Branching Strategies, Rebasing, Conflict Resolution" },
      { name: "GitHub", level: "Repositories, Code Reviews, Actions & CI" },
      { name: "VS Code", level: "Configured Workflow & Productivity Tooling" },
      { name: "Postman", level: "API Testing, Automated Test Suites, Docs" },
    ],
  },
];

export default function Skills() {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Kinetic typography reveal for section title
      gsap.fromTo(
        ".skills-word",
        { yPercent: 120, opacity: 0, rotateX: -25 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Staggered category cards entrance
      gsap.fromTo(
        ".skills-category-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3D Card tilt micro-interaction handlers
  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 6;
    const rotY = (x / (rect.width / 2)) * 6;

    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const handleCardLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  // Safe category filtering that doesn't corrupt ScrollTrigger
  const handleCategorySelect = (catId) => {
    if (catId === activeCategory) return;
    setActiveCategory(catId);
    gsap.fromTo(
      ".skills-category-card",
      { opacity: 0.4, y: 15 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out" }
    );
  };

  const filteredCategories =
    activeCategory === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeCategory);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative w-full bg-[#070709] border-t border-white/[0.06] z-20"
    >
      <div className="py-28 md:py-36 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
                03 // Technical Stack
              </span>
              <div className="h-px w-16 bg-sky-400/40" />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none perspective-1000">
              <span className="inline-block overflow-hidden py-1">
                <span className="skills-word inline-block mr-3">Skills</span>
                <span className="skills-word inline-block mr-3">&amp;</span>
                <span className="skills-word inline-block text-metallic">Expertise.</span>
              </span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategorySelect("all")}
              data-magnetic="true"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${activeCategory === "all"
                ? "bg-white text-black font-semibold"
                : "bg-white/[0.04] text-zinc-400 border border-white/10 hover:text-white hover:border-white/20"
                }`}
            >
              All
            </button>
            {skillCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => handleCategorySelect(c.id)}
                data-magnetic="true"
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${activeCategory === c.id
                  ? "bg-white text-black font-semibold"
                  : "bg-white/[0.04] text-zinc-400 border border-white/10 hover:text-white hover:border-white/20"
                  }`}
              >
                {c.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Modern Editorial Skills Grid */}
        <div className="skills-grid-container grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.id}
                data-cursor-text="SKILL"
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
                className="skills-category-card group relative p-8 rounded-3xl bg-[#0c0c12] border border-white/[0.08] hover:border-white/20 transition-colors duration-300 overflow-hidden will-change-transform"
              >
                {/* Subtle Ambient Glow */}
                <div
                  className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${category.accent} rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-700`}
                />

                {/* Category Header */}
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-white">
                        {category.title}
                      </h3>
                      <p className="text-xs text-zinc-500 font-mono mt-0.5">
                        {category.skills.length} Core Technologies
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-normal relative z-10">
                  {category.description}
                </p>

                {/* Skills List without Percentage Bars */}
                <div className="flex flex-col gap-3 relative z-10">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-xl bg-[#121218]/80 border border-white/[0.05] hover:border-white/20 hover:bg-[#181822] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-1 group/skill"
                    >
                      <span className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80 group-hover/skill:bg-sky-400 group-hover/skill:scale-125 transition-all" />
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono text-zinc-400 group-hover/skill:text-zinc-300">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
