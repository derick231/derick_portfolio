"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, MapPin, CheckCircle } from "lucide-react";

const experiences = [
  {
    role: "Junior MERN Developer",
    company: "Legacy IT",
    location: "Kathmandu, Nepal",
    period: "2025 — Present",
    status: "Current Position",
    summary:
      "Working across the MERN stack to build responsive web applications, modern interfaces, and scalable REST APIs.",
    deliverables: [
      "Developing responsive web applications and UI components using React.js and Tailwind CSS.",
      "Building backend REST APIs and managing database integration with Node.js and MongoDB.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
  },
  {
    role: "MERN Stack Developer Intern",
    company: "Index IT Hub",
    location: "Jyatha, Kathmandu, Nepal",
    period: "2024-12 — 2025-03",
    status: "Completed Internship",
    summary:
      "Spearheaded full-stack feature development on enterprise web applications, focusing on the Smart School Management System.",
    deliverables: [
      "Engineered comprehensive Teacher Management modules with role-specific dashboards, profile updates, and scheduling.",
      "Developed end-to-end Examination Management functionality, including exam scheduling, subject allocations, and grading workflows.",
      "Implemented secure authentication and authorization mechanisms utilizing JWT and Role-Based Access Control (RBAC).",
      "Designed and documented modular, high-throughput RESTful APIs with Node.js and Express.js, connecting to MongoDB databases.",
      "Collaborated actively with senior developers and fellow interns, participating in code reviews and agile sprint cycles.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "JWT", "Git"],
  },
];

export default function Experience() {
  const containerRef = useRef(null);

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
        ".exp-word",
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

      // Staggered reveal for timeline items
      gsap.fromTo(
        ".experience-timeline-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
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
    const rotX = -(y / (rect.height / 2)) * 5;
    const rotY = (x / (rect.width / 2)) * 5;

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

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-[#070709] border-t border-white/[0.06] z-20"
    >
      <div className="py-28 md:py-36 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
              04 // Professional Experience
            </span>
            <div className="h-px w-16 bg-sky-400/40" />
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none perspective-1000">
            <span className="inline-block overflow-hidden py-1">
              <span className="exp-word inline-block mr-3">Work</span>
              <span className="exp-word inline-block text-metallic">Experience.</span>
            </span>
          </h2>
        </div>

        <p className="text-sm font-mono text-zinc-400 max-w-xs">
          Professional hands-on experience delivering production web solutions and enterprise software.
        </p>
      </div>

      {/* Editorial Timeline */}
      <div className="experience-list-container flex flex-col gap-10">
        {experiences.map((exp) => (
          <div
            key={exp.role + exp.company}
            data-cursor-text="CAREER"
            onMouseMove={handleCardMove}
            onMouseLeave={handleCardLeave}
            className="experience-timeline-item p-8 sm:p-10 rounded-3xl bg-[#0c0c12] border border-white/[0.08] hover:border-white/20 transition-colors duration-300 relative overflow-hidden group will-change-transform"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              {/* Left Meta Column (4 Cols) */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">
                    {exp.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
                  {exp.company}
                </h3>

                <div className="flex flex-col gap-1.5 text-xs font-mono text-zinc-400 mt-2">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Right Content Column (8 Cols) */}
              <div className="lg:col-span-8 flex flex-col">
                <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-white/[0.06]">
                  <h4 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    {exp.role}
                  </h4>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">
                    {exp.status}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed mb-6">
                  {exp.summary}
                </p>

                {/* Bullet Deliverables */}
                <div className="flex flex-col gap-3 mb-8">
                  {exp.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                      <span className="text-sm text-zinc-400 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.03] border border-white/[0.07] text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
