"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "./SmoothScroll";
import HeroCanvas from "./HeroCanvas";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const visualRef = useRef(null);
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

        // 1. Availability badge fade & slide down
        tl.fromTo(
          badgeRef.current,
          { y: -25, opacity: 0 },
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
          // 5. 3D Canvas visual entrance
          .fromTo(
            visualRef.current,
            { scale: 0.8, opacity: 0, rotateY: 15 },
            { scale: 1, opacity: 1, rotateY: 0, duration: 1.4, ease: "power3.out" },
            "-=1.1"
          )
          // 6. Bottom metadata line
          .fromTo(
            scrollIndicatorRef.current,
            { opacity: 0, y: -15 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.5"
          );

        // 7. Scroll-based exit parallax
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

        gsap.to(visualRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 80,
          scale: 0.88,
          opacity: 0.1,
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
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* Left Typography Column (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Availability & Location Indicator */}
          <div
            ref={badgeRef}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                Available for new opportunities
              </span>
            </div>

            <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
              Nepal • Kathmandu (NPT)
            </span>
          </div>

          {/* Large Animated Typography Headline with Kinetic Letter Masks */}
          <div ref={headlineRef} className="mb-6 perspective-1000">
            <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] uppercase text-white flex flex-col">
              {renderKineticText("BUILDING", "text-white")}
              {renderKineticText("DIGITAL", "text-metallic")}
              {renderKineticText("EXPERIENCES", "text-white/95")}
              {renderKineticText("THAT MATTER.", "text-zinc-400 font-light")}
            </h1>
          </div>

          {/* Supporting Text */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg md:text-xl text-zinc-400 font-normal max-w-xl mb-10 leading-relaxed"
          >
            I&apos;m <span className="text-white font-medium">Derick Subedi</span>,
            a MERN Stack Developer &amp; Creative Web Specialist passionate about building
            modern, interactive, and scalable digital experiences that unite robust engineering
            with refined visual design.
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
              className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm tracking-wide hover:bg-zinc-200 transition-all duration-300 shadow-xl shadow-white/10"
            >
              <span>View My Work</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#contact"
              onClick={scrollToContact}
              data-magnetic="true"
              data-cursor-text="TALK"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm tracking-wide hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
            >
              <span>Contact Me</span>
              <Sparkles className="w-3.5 h-3.5 text-sky-400 opacity-80 group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right 3D Visual Column (5 Cols) */}
        <div
          ref={visualRef}
          data-cursor-text="INTERACT"
          className="lg:col-span-5 h-[340px] sm:h-[420px] lg:h-[500px] w-full flex items-center justify-center relative cursor-grab active:cursor-grabbing"
        >
          <div className="w-full h-full relative">
            <HeroCanvas />

            {/* Subtle decorative badges */}
            <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-[#101017]/80 border border-white/[0.08] backdrop-blur-md hidden sm:block">
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                Core Specialty
              </p>
              <p className="text-xs font-semibold text-white mt-0.5">
                MERN Stack Architecture
              </p>
            </div>

            <div className="absolute top-6 right-4 p-3 rounded-xl bg-[#101017]/80 border border-white/[0.08] backdrop-blur-md hidden sm:block">
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                Experience Craft
              </p>
              <p className="text-xs font-semibold text-sky-300 mt-0.5">
                Creative GSAP &amp; Interactive UI
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll-down Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="flex items-center justify-between pt-8 border-t border-white/[0.06] mt-12 text-xs font-mono text-zinc-500"
      >
        <div className="flex items-center gap-6">
          <span>CREATIVE ENGINEER</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">FULL-STACK SOLUTIONS</span>
        </div>

        <a
          href="#about"
          onClick={scrollToAbout}
          data-magnetic="true"
          className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:translate-y-0.5 transition-all">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </a>
      </div>
    </section>
  );
}
