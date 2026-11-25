"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "./SmoothScroll";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const metaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let ctx;

    const runEntrance = () => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        // 1. Meta line fade & slide down
        tl.fromTo(
          metaRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, delay: 0.1 }
        )
          // 2. Kinetic word & line reveals with 3D rotation & mask
          .fromTo(
            ".hero-char",
            {
              yPercent: 130,
              opacity: 0,
              rotateX: -45,
            },
            {
              yPercent: 0,
              opacity: 1,
              rotateX: 0,
              stagger: 0.025,
              duration: 1.1,
              ease: "power4.out",
            },
            "-=0.4"
          )
          // 3. Subtext smooth reveal
          .fromTo(
            subtextRef.current,
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
            "-=0.7"
          )
          // 4. CTAs stagger
          .fromTo(
            ctaRef.current?.children || [],
            { y: 25, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7 },
            "-=0.6"
          )
          // 5. Bottom metadata line
          .fromTo(
            scrollIndicatorRef.current,
            { opacity: 0, y: -15 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.5"
          );

        // Scroll-based exit parallax
        gsap.to(headlineRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 140,
          opacity: 0.15,
          ease: "none",
        });

        gsap.to(subtextRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 100,
          opacity: 0.2,
          ease: "none",
        });
      }, containerRef);
    };

    // If preloader has already finished or session already seen
    const hasSeen = sessionStorage.getItem("derick_preloader_seen");
    let hasRun = false;

    const safeRunEntrance = () => {
      if (hasRun) return;
      hasRun = true;
      runEntrance();
    };

    if (hasSeen) {
      safeRunEntrance();
    } else {
      window.addEventListener("preloaderFinished", safeRunEntrance, { once: true });
      // Fallback timer ensures hero never remains unrevealed
      const fallbackTimer = setTimeout(safeRunEntrance, 3800);

      return () => {
        window.removeEventListener("preloaderFinished", safeRunEntrance);
        clearTimeout(fallbackTimer);
        if (ctx) ctx.revert();
      };
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const scrollToProjects = (e) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) {
      if (lenis) {
        lenis.scrollTo(el, { offset: -60, duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      if (lenis) {
        lenis.scrollTo(el, { offset: -60, duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToAbout = (e) => {
    e.preventDefault();
    const el = document.getElementById("about");
    if (el) {
      if (lenis) {
        lenis.scrollTo(el, { offset: -60, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Helper to split string into animated characters with clipping mask
  const renderKineticText = (text, className = "") => {
    return (
      <span className={`inline-block overflow-hidden py-0.5 ${className}`}>
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="hero-char inline-block"
            style={{ willChange: "transform, opacity" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Hero Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* Main Typography Column (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col items-start z-10">
          {/* Factual location and role with 24px orange line */}
          <div
            ref={metaRef}
            className="flex items-center gap-2.5 mb-6"
          >
            <span className="w-6 h-0.5 bg-[var(--accent)] shrink-0" />
            <span className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[var(--accent)]">
              Kathmandu, Nepal • Available for Opportunities
            </span>
          </div>

          {/* Large Animated Typography Headline with Kinetic Letter Masks */}
          <div ref={headlineRef} className="mb-6 perspective-1000">
            <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold tracking-[-0.03em] leading-[0.9] uppercase text-white flex flex-col gap-1 sm:gap-2">
              <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
                {renderKineticText("DERICK", "text-white")}
                {renderKineticText("SUBEDI", "text-white")}
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
                {renderKineticText("MERN", "text-white")}
                {renderKineticText("DEVELOPER", "text-[var(--accent)]")}
              </div>
            </h1>
          </div>

          {/* Supporting Text - Concrete & Factual */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] font-normal max-w-2xl mb-10 leading-relaxed"
          >
            Full-stack developer based in Kathmandu, Nepal. I build web applications using React, Node.js, Express, MongoDB, and PostgreSQL, focusing on reliable backend systems and clean, responsive user interfaces.
          </p>

          {/* Action CTAs with Magnetic Attributes */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              onClick={scrollToProjects}
              data-magnetic="true"
              data-cursor-text="EXPLORE"
              className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[var(--accent)] text-white font-medium text-sm tracking-wide hover:bg-[var(--accent-dark)] transition-all duration-300 shadow-lg shadow-[var(--accent)]/25"
            >
              <span>View Projects</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#contact"
              onClick={scrollToContact}
              data-magnetic="true"
              data-cursor-text="TALK"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-transparent border border-white/20 text-white font-medium text-sm tracking-wide hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Factual Technical Overview (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="p-6 rounded-2xl bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] shadow-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)] mb-3">
              Core Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {["React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Next.js", "Tailwind CSS", "REST APIs"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-[var(--border)] text-xs font-mono text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] shadow-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)] mb-2">
              Education
            </p>
            <p className="text-sm font-semibold text-white">
              Bachelor in Computer Application (BCA)
            </p>
            <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
              Tribhuvan University
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Scroll-down Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="flex items-center justify-between pt-8 border-t border-[var(--border)] mt-12 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]"
      >
        <div className="flex items-center gap-6">
          <span>FULL-STACK DEVELOPER</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">KATHMANDU, NEPAL</span>
        </div>

        <a
          href="#about"
          onClick={scrollToAbout}
          data-magnetic="true"
          className="group inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] group-hover:translate-y-0.5 transition-all">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </a>
      </div>
    </section>
  );
}
