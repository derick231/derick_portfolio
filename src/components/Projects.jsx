"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import Image from "next/image";

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
    image: "https://images.pexels.com/photos/877971/pexels-photo-877971.jpeg",
  },
  {
    id: "task-management",
    number: "02",
    title: "Task Management System",
    category: "Full-Stack Web Application",
    description:
      "An intuitive productivity application engineered with the MERN stack. Enables seamless task creation, real-time status transitions, category filtration, deadline tracking, and interactive Kanban-style board organization.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "State Management"],
    github: "https://github.com/derick231",
    demo: "https://dericksubedi.com.np",
    highlight: "Interactive Productivity Tool",
    image: "https://images.pexels.com/photos/6804091/pexels-photo-6804091.jpeg",
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
    image: "https://images.pexels.com/photos/29502370/pexels-photo-29502370.jpeg",
  },
  {
    id: "bookstore-ecommerce",
    number: "04",
    title: "Modern Bookstore & eCommerce",
    category: "E-Commerce System",
    description:
      "A fully featured digital bookstore web application with dynamic catalog search, categorized collections, interactive shopping cart management, and seamless order submission flows.",
    tags: ["React.js", "Node.js", "MongoDB", "Express.js", "Responsive Design"],
    github: "https://github.com/derick231",
    demo: null,
    highlight: "Digital Retail Platform",
    image: "https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg",
  },
];

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
      className="relative w-full bg-[#070709] border-t border-white/[0.06] z-10"
    >
      <div className="py-28 md:py-36 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
                02 // Selected Projects
              </span>
              <div className="h-px w-16 bg-sky-400/40" />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none perspective-1000">
              <span className="inline-block overflow-hidden py-1">
                <span className="project-word inline-block mr-3">Featured</span>
                <span className="project-word inline-block text-metallic">Projects.</span>
              </span>
            </h2>
          </div>

          <p className="text-sm font-mono text-zinc-400 max-w-xs">
            A curated selection of production MERN applications, enterprise systems, and interactive digital products.
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
              className="project-showcase-card group rounded-3xl bg-[#0c0c12] border border-white/[0.08] hover:border-white/20 transition-colors duration-300 overflow-hidden shadow-2xl will-change-transform"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Visual Image Preview Column (7 Cols on desktop) */}
                <div
                  className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] lg:col-span-7 overflow-hidden bg-[#08080c] ${
                    index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="project-img-inner absolute inset-0 will-change-transform">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c12] via-transparent to-transparent lg:hidden" />
                </div>

                {/* Content Details Column (5 Cols on desktop) */}
                <div
                  className={`p-8 sm:p-10 lg:p-12 lg:col-span-5 flex flex-col justify-between ${
                    index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div>
                    {/* Top category & index indicator */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-bold text-sky-400">
                          {project.number}
                        </span>
                        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                          {project.category}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500 uppercase">
                        {project.highlight}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                      {project.title}
                    </h3>

                    <p className="text-sm text-zinc-400 leading-relaxed font-normal mb-8">
                      {project.description}
                    </p>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.03] border border-white/[0.08] text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links & CTA Actions */}
                  <div className="flex items-center gap-3 pt-6 border-t border-white/[0.06]">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-magnetic="true"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
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
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 text-white text-xs uppercase tracking-widest font-semibold hover:bg-white/10 hover:border-white/40 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* GitHub Repositories Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0c12]/80 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-1">
                More Open Source
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Explore More Projects &amp; Experiments
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-lg">
                View utilities, backend architectures, full repositories, and code samples on GitHub.
              </p>
            </div>

            <a
              href="https://github.com/derick231"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic="true"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-colors shrink-0"
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
