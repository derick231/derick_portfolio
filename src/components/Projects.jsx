"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";

const projects = [
  {
    id: "smart-school",
    number: "01",
    title: "Smart School Management System",
    category: "Full-Stack Enterprise Architecture",
    description:
      "A comprehensive, enterprise-level education management platform built during my MERN Stack Developer internship at Index IT Hub. Features end-to-end teacher lifecycle management, examination and grading workflows, secure role-based access control (RBAC), and high-performance REST APIs.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth", "Tailwind CSS"],
    github: "https://github.com/derick231",
    demo: null,
    highlight: "Internship Showcase Project",
  },
  {
    id: "task-management",
    number: "02",
    title: "Task Management System",
    category: "Full-Stack Web Application",
    description:
      "An intuitive productivity application engineered with the MERN stack. Enables task creation, status transitions, category filtering, deadline tracking, and Kanban-style board organization.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "State Management"],
    github: "https://github.com/derick231",
    demo: "https://dericksubedi.com.np",
    highlight: "Interactive Productivity Tool",
  },
  {
    id: "blog-application",
    number: "03",
    title: "Full-Stack Blog Application",
    category: "Content Publication Platform",
    description:
      "A modern publishing platform crafted with React and Node.js. Incorporates rich text authoring, multi-category organization, author management, user comments, and secure session management.",
    tags: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS", "REST APIs"],
    github: "https://github.com/derick231",
    demo: null,
    highlight: "Editorial Publishing Platform",
  },
  {
    id: "bookstore-ecommerce",
    number: "04",
    title: "Modern Bookstore & eCommerce",
    category: "E-Commerce System",
    description:
      "A fully featured digital bookstore web application with dynamic catalog search, categorized collections, interactive shopping cart management, and order submission flows.",
    tags: ["React.js", "Node.js", "MongoDB", "Express.js", "Responsive Design"],
    github: "https://github.com/derick231",
    demo: null,
    highlight: "Digital Retail Platform",
  },
];

function ProjectGraphic({ id }) {
  if (id === "smart-school") {
    return (
      <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between font-sans select-none">
        {/* Mock Window Top bar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 text-xs text-zinc-400 font-medium">
              School Management Portal
            </span>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-medium">
            Administrative Portal
          </span>
        </div>

        {/* Dashboard Content Mock */}
        <div className="my-auto py-4 flex flex-col gap-3">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Teachers</p>
              <p className="text-sm sm:text-base font-bold text-white mt-0.5">48 Active</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Exams</p>
              <p className="text-sm sm:text-base font-bold text-sky-400 mt-0.5">12 Scheduled</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Security</p>
              <p className="text-sm sm:text-base font-bold text-emerald-400 mt-0.5">Verified</p>
            </div>
          </div>

          {/* Teacher Directory */}
          <div className="p-3.5 rounded-xl bg-[#0e0e16] border border-white/[0.06] flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-white/[0.04]">
              <span className="font-semibold text-zinc-300">Staff &amp; Faculty Directory</span>
              <span className="text-emerald-400 font-mono text-[11px]">● Active Term</span>
            </div>
            <div className="space-y-1.5 text-xs text-zinc-300">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                <span className="text-white font-medium">Dr. R. Sharma</span>
                <span className="text-zinc-400">Department Head (Mathematics)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Assigned</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                <span className="text-white font-medium">Sunita Shrestha</span>
                <span className="text-zinc-400">Senior Faculty (Computer Science)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Assigned</span>
              </div>
            </div>
          </div>

          {/* Examination Workflow */}
          <div className="p-3.5 rounded-xl bg-[#0e0e16] border border-white/[0.06] flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white">Term Examination Module</p>
              <p className="text-xs text-zinc-400 mt-0.5">Student grading, score allocation &amp; reports</p>
            </div>
            <span className="text-xs font-medium text-sky-400 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
              Grading In Progress
            </span>
          </div>
        </div>

        {/* Footer Status */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
          <span>School Administration Platform</span>
          <span className="text-emerald-400 font-medium">System Online</span>
        </div>
      </div>
    );
  }

  if (id === "task-management") {
    return (
      <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between font-sans select-none">
        {/* Mock Window Top bar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 text-xs text-zinc-400 font-medium">
              Project Task Board
            </span>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            Kanban Board
          </span>
        </div>

        {/* Kanban Board Columns Mock */}
        <div className="my-auto py-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Column 1: TO DO */}
          <div className="p-3 rounded-xl bg-[#0e0e16] border border-white/[0.06] flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs pb-1.5 border-b border-white/[0.04]">
              <span className="text-zinc-300 font-semibold">To Do</span>
              <span className="text-[10px] text-zinc-500 font-mono">2</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs">
              <p className="text-zinc-200 font-medium">User Login &amp; Security</p>
              <div className="flex items-center justify-between mt-2 text-[10px]">
                <span className="text-amber-400">High Priority</span>
                <span className="text-zinc-500">Feature</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs">
              <p className="text-zinc-200 font-medium">Database Optimization</p>
              <div className="flex items-center justify-between mt-2 text-[10px]">
                <span className="text-sky-400">Medium</span>
                <span className="text-zinc-500">Database</span>
              </div>
            </div>
          </div>

          {/* Column 2: IN PROGRESS */}
          <div className="p-3 rounded-xl bg-[#0e0e16] border border-white/[0.06] flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs pb-1.5 border-b border-white/[0.04]">
              <span className="text-sky-400 font-semibold">In Progress</span>
              <span className="text-[10px] text-sky-400 font-mono">1</span>
            </div>
            <div className="p-2.5 rounded-lg bg-sky-500/[0.06] border border-sky-500/20 text-xs">
              <p className="text-white font-medium">Interactive Dashboard</p>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-sky-400 h-full w-3/4 rounded-full" />
              </div>
              <div className="flex items-center justify-between mt-2 text-[10px]">
                <span className="text-sky-300">75% completed</span>
                <span className="text-zinc-400">Frontend</span>
              </div>
            </div>
          </div>

          {/* Column 3: COMPLETED */}
          <div className="p-3 rounded-xl bg-[#0e0e16] border border-white/[0.06] flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs pb-1.5 border-b border-white/[0.04]">
              <span className="text-emerald-400 font-semibold">Completed</span>
              <span className="text-[10px] text-emerald-400 font-mono">2</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs opacity-90">
              <p className="text-zinc-300">Mobile Responsive Design</p>
              <span className="inline-block mt-1 text-[10px] text-emerald-400 font-medium">✓ Completed</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs opacity-90">
              <p className="text-zinc-300">Email Notifications</p>
              <span className="inline-block mt-1 text-[10px] text-emerald-400 font-medium">✓ Completed</span>
            </div>
          </div>
        </div>

        {/* Footer Status */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
          <span>Team Workspace Organizer</span>
          <span className="text-emerald-400 font-medium">Real-time Updates</span>
        </div>
      </div>
    );
  }

  if (id === "blog-application") {
    return (
      <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between font-sans select-none">
        {/* Mock Window Top bar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 text-xs text-zinc-400 font-medium">
              Publishing Platform
            </span>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
            Article Editor
          </span>
        </div>

        {/* Editor Mock */}
        <div className="my-auto py-4 flex flex-col gap-3">
          {/* Formatting Toolbar */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-400">
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">Bold</span>
            <span className="px-2 py-0.5 rounded hover:bg-white/5 italic">Italic</span>
            <span className="px-2 py-0.5 rounded hover:bg-white/5">Quote</span>
            <span className="px-2 py-0.5 rounded hover:bg-white/5">Heading</span>
            <span className="ml-auto text-[11px] text-zinc-400">Draft Auto-Saved</span>
          </div>

          {/* Article Preview Card - No code syntax, clean readable preview */}
          <div className="p-4 rounded-xl bg-[#0e0e16] border border-white/[0.06] flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="text-sky-400 font-medium">Web Engineering</span>
              <span>•</span>
              <span>5 min read</span>
              <span>•</span>
              <span>By Derick Subedi</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Building Modern Web Applications with Scalable Architecture
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed p-3 rounded-lg bg-[#08080c] border border-white/[0.04]">
              A comprehensive guide exploring clean backend architecture, responsive user interface design, and secure data storage for modern web platforms.
            </p>
          </div>

          {/* Reader Engagement Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-zinc-500 block text-[10px] uppercase font-mono">Views</span>
              <span className="text-white font-bold">1,840</span>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-zinc-500 block text-[10px] uppercase font-mono">Comments</span>
              <span className="text-sky-400 font-bold">42</span>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-zinc-500 block text-[10px] uppercase font-mono">Status</span>
              <span className="text-emerald-400 font-bold">Published</span>
            </div>
          </div>
        </div>

        {/* Footer Status */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
          <span>Content Publishing &amp; Community</span>
          <span className="text-sky-400 font-medium">Reader Friendly</span>
        </div>
      </div>
    );
  }

  if (id === "bookstore-ecommerce") {
    return (
      <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between font-sans select-none">
        {/* Mock Window Top bar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 text-xs text-zinc-400 font-medium">
              Online Bookstore Storefront
            </span>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            Digital Store
          </span>
        </div>

        {/* Storefront Mock */}
        <div className="my-auto py-4 flex flex-col gap-3">
          {/* Catalog & Cart Split Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Book Item 1 */}
            <div className="p-3.5 rounded-xl bg-[#0e0e16] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-medium text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">
                  Architecture
                </span>
                <p className="text-xs font-semibold text-white mt-2">
                  Clean Architecture in Practice
                </p>
                <p className="text-xs text-zinc-400 mt-1 font-medium">$28.00</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-emerald-400">★ 4.9 (128 reviews)</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[11px]">In Cart</span>
              </div>
            </div>

            {/* Book Item 2 */}
            <div className="p-3.5 rounded-xl bg-[#0e0e16] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  Web Development
                </span>
                <p className="text-xs font-semibold text-white mt-2">
                  Modern React Design Patterns
                </p>
                <p className="text-xs text-zinc-400 mt-1 font-medium">$34.50</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-emerald-400">★ 4.8 (94 reviews)</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[11px]">In Cart</span>
              </div>
            </div>
          </div>

          {/* Cart & Checkout Summary */}
          <div className="p-3.5 rounded-xl bg-[#0e0e16] border border-white/[0.06] flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-white/[0.04]">
              <span className="text-zinc-300 font-medium">Cart Total (2 Books)</span>
              <span className="text-white font-bold text-sm">$62.50</span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Checkout Flow</span>
              <span className="text-emerald-400 font-medium">1. Cart → 2. Shipping → 3. Done</span>
            </div>
          </div>
        </div>

        {/* Footer Status */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
          <span>Shopping Cart &amp; Order Checkout</span>
          <span className="text-emerald-400 font-medium">Instant Delivery</span>
        </div>
      </div>
    );
  }

  return null;
}

export default function Projects() {
  const sectionRef = useRef(null);

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
        ".project-word",
        { yPercent: 120, opacity: 0, rotateX: -25 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Clean, sequential card reveal animations
      const cards = gsap.utils.toArray(".project-showcase-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );

        const img = card.querySelector(".project-img-inner");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Card tilt micro-interaction
  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 4;
    const rotY = (x / (rect.width / 2)) * 4;

    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 1000,
      duration: 0.35,
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

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-transparent border-t border-[var(--border)] z-10"
    >
      <div className="py-28 md:py-36 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-0.5 bg-[var(--accent)] shrink-0" />
              <span className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--accent)]">
                Selected Work
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-[-0.02em] uppercase text-[var(--text)] leading-none perspective-1000">
              <span className="inline-block overflow-hidden py-1">
                <span className="project-word inline-block mr-3">Featured</span>
                <span className="project-word inline-block text-[var(--accent)]">Projects.</span>
              </span>
            </h2>
          </div>

          <p className="text-sm font-normal text-[var(--text-muted)] max-w-xs">
            Selected full-stack web applications built with React, Node.js, Express, MongoDB, and Tailwind CSS.
          </p>
        </div>

        {/* Vertical Editorial Project Showcases */}
        <div className="flex flex-col gap-12 lg:gap-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              data-cursor-text="VIEW"
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              className="project-showcase-card group rounded-3xl bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] hover:border-[var(--accent)]/40 transition-colors duration-300 overflow-hidden shadow-2xl will-change-transform"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Creative Software Interface Graphic Preview (7 Cols on desktop) */}
                <div
                  className={`relative min-h-[360px] sm:min-h-[400px] lg:min-h-[440px] lg:col-span-7 overflow-hidden bg-[#07070D]/90 flex items-stretch border-b lg:border-b-0 border-[var(--border)] ${
                    index % 2 === 1
                      ? "lg:order-2 lg:border-l lg:border-[var(--border)]"
                      : "lg:order-1 lg:border-r lg:border-[var(--border)]"
                  }`}
                >
                  <div className="project-img-inner w-full h-full flex flex-col will-change-transform group-hover:scale-[1.01] transition-transform duration-500">
                    <ProjectGraphic id={project.id} />
                  </div>
                </div>

                {/* Content Details Column (5 Cols on desktop) */}
                <div
                  className={`p-8 sm:p-10 lg:p-12 lg:col-span-5 flex flex-col justify-between ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                    }`}
                >
                  <div>
                    {/* Top category & index indicator */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border)]">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-bold text-[var(--accent)]">
                          {project.number}
                        </span>
                        <span className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--text-muted)]">
                          {project.category}
                        </span>
                      </div>
                      <span className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--text-muted)]">
                        {project.highlight}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text)] mb-4">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[var(--text-muted)] leading-relaxed font-normal mb-8">
                      {project.description}
                    </p>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-[var(--border)] text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links & CTA Actions */}
                  <div className="flex items-center gap-3 pt-6 border-t border-[var(--border)]">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-magnetic="true"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--accent)] text-white text-xs uppercase tracking-[0.08em] font-medium hover:bg-[var(--accent-dark)] transition-colors shadow-md shadow-[var(--accent)]/20"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-magnetic="true"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-transparent border border-[var(--border)] text-white text-xs uppercase tracking-[0.08em] font-medium hover:bg-white/10 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* GitHub Repositories Banner (Dark Cosmic Section) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[var(--dark)]/90 backdrop-blur-md border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
            <div>
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white">
                Explore More Projects &amp; Repositories
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-lg font-normal">
                View utilities, backend architectures, full repositories, and code samples on GitHub.
              </p>
            </div>

            <a
              href="https://github.com/derick231"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic="true"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-white text-xs uppercase tracking-[0.08em] font-medium hover:bg-[var(--accent-dark)] transition-colors shrink-0 shadow-md shadow-[var(--accent)]/20"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Visit GitHub Profile</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
