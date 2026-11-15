"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Database, Layout, Terminal, Server } from "lucide-react";

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
      className="relative w-full bg-[#070709] border-t border-white/[0.06] z-10"
    >
      <div className="py-28 md:py-36 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        {/* Section Header Tag */}
      <div className="flex items-center gap-3 mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
          01 // About Me
        </span>
        <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-sky-400/40 to-transparent" />
      </div>

      {/* Split Screen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Typography & Philosophy (7 Cols) */}
        <div ref={leftColRef} className="lg:col-span-7 flex flex-col items-start">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white uppercase leading-[1.05] mb-8">
            <span className="inline-block overflow-hidden py-1">
              <span className="about-word inline-block mr-3">Turning</span>
              <span className="about-word inline-block mr-3">Complex</span>
              <span className="about-word inline-block mr-3">Ideas</span>
              <span className="about-word inline-block mr-3">Into</span>
            </span>{" "}
            <span className="inline-block overflow-hidden py-1">
              <span className="about-word inline-block text-metallic mr-3">Intuitive</span>
              <span className="about-word inline-block text-metallic">Digital Realities.</span>
            </span>
          </h2>

          <div className="about-fade-in space-y-6 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed mb-10">
            <p>
              I am a <strong className="text-white font-medium">MERN Stack Developer</strong> and creative technologist based in Lalitpur, Nepal. I hold a Bachelor in Computer Application (BCA) from Tribhuvan University, and I dedicate my work to engineering scalable web products where technical rigor meets refined visual craft.
            </p>
            <p>
              Whether architecting robust Node.js and Express REST APIs, modeling data with MongoDB and PostgreSQL, or building fluid, interactive user interfaces in React and Next.js, my focus remains constant: <span className="text-zinc-200">building clean, scalable solutions with purpose</span> that perform flawlessly across devices.
            </p>
          </div>

          {/* Highlight Grid */}
          <div className="about-highlights-grid grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="about-highlight-card p-5 rounded-2xl bg-[#0f0f15]/70 border border-white/[0.07] hover:border-white/20 hover:bg-[#14141e]/90 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:bg-sky-500/10 group-hover:border-sky-500/30 transition-all mb-3.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-tight mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Authentic Signature Element */}
          <div className="about-fade-in flex items-center justify-between w-full pt-6 border-t border-white/[0.06]">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                Philosophy
              </p>
              <p className="text-sm italic text-zinc-300 mt-1">
                &ldquo;Building clean, scalable solutions with purpose.&rdquo;
              </p>
            </div>

            <div className="text-right">
              <svg
                width="140"
                height="65"
                viewBox="0 0 285 163"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-zinc-300 opacity-80"
              >
                <path
                  d="M80.0003 32.3892C75.3803 42.9492 66.8953 58.6192 55.9128 75.6867C44.4089 93.5644 26.5803 97.3592 13.8753 97.7292C11.1453 97.8087 8.88028 96.5692 7.03028 94.9092C5.18028 93.2492 3.86028 90.6092 3.59278 88.6717C3.32528 86.7342 4.15028 85.5792 5.56528 84.4892C6.98028 83.3992 8.96028 82.4092 10.8053 82.0642C12.6503 81.7192 14.3003 82.0492 25.7103 86.9217C37.1203 91.7942 58.2403 101.199 73.5753 107.199C108.208 120.75 114.49 118.224 116.485 117.479C118.864 116.591 122.965 108.784 129.37 96.8942C135.179 86.1118 137.495 76.9242 138.163 69.9417C138.827 62.9908 136.185 53.9442 132.198 43.7142C128.601 34.4871 123.02 29.0742 117.463 25.4992C109.61 20.4476 98.2203 19.3992 87.8278 17.8992C78.0188 16.4834 65.7403 18.2142 53.0903 20.1242C44.1747 21.4703 37.7003 25.7042 30.1428 31.0117C19.729 38.3251 12.8603 49.1792 8.11778 57.9892C3.46369 66.6349 2.50528 78.1592 2.25028 90.5467C2.00421 102.5 6.81028 111.194 12.4553 116.847C19.1624 123.563 29.6153 125.884 41.6553 126.139C48.5829 126.286 57.1603 124.909 68.3453 122.254C79.5303 119.599 93.0603 115.309 103.825 111.284C114.59 107.259 122.18 103.629 130.215 98.2942C138.25 92.9592 146.5 86.0292 153.143 78.2517C166.014 63.1812 171.315 48.2742 174.478 37.7192C177.71 26.9314 177.335 18.5792 176.838 14.4192C176.449 11.1661 173.85 8.23916 169.288 5.32666C156.853 -2.61118 141.57 2.21916 133.108 5.28916C129.133 6.73124 126.685 14.5092 123.523 24.6442C119.953 36.0837 120.665 47.1792 121.823 58.8767C123.597 76.8116 126.335 90.5242 125.343 96.9242C123.226 110.576 109.205 115.204 103.62 116.552C101.822 116.986 102.16 113.279 103.32 110.762C105.673 105.656 110.315 103.229 114.055 102.229C121.235 100.31 128.13 105.369 140.95 110.289C143.909 111.425 145.96 111.549 148.053 110.894C156.343 108.299 158.81 102.569 174.018 101.642C187.497 100.82 197.29 92.9292 212.84 90.4767C226.074 88.3895 237.795 87.0692 244.288 84.1617C249.209 81.958 251.155 76.4142 253.318 68.9517C260.137 45.42 255.01 31.2692 252.438 24.9292C251.028 21.4553 240.56 35.9542 229.663 55.4942C224.454 64.8335 220.91 73.5492 216.15 89.5192C211.39 105.489 205.78 128.589 202.808 142.057C199.835 155.524 199.67 158.659 199.5 161.389"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M1.00027 145.389C1.99027 145.059 3.49027 144.229 33.6178 137.454C62.6646 130.922 120.01 119.789 150.413 113.757C180.815 107.724 182.63 107.559 199.57 104.257C216.51 100.954 248.52 94.5192 283.5 87.3892"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Code & Architecture Inspector (5 Cols) */}
        <div ref={rightColRef} className="lg:col-span-5">
          <div
            ref={terminalCardRef}
            data-cursor-text="CONFIG"
            className="rounded-3xl bg-[#0c0c12] border border-white/[0.09] shadow-2xl overflow-hidden will-change-transform"
          >
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#121218] border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[11px] font-mono text-zinc-500 tracking-wider">
                derick_subedi.config.ts
              </span>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-400">ACTIVE</span>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-6 font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-300 overflow-x-auto">
              <p className="text-zinc-500">&#47;&#47; Creative Developer &amp; MERN Stack Profile</p>
              <p className="mt-2">
                <span className="text-purple-400">export const</span>{" "}
                <span className="text-sky-300">developer</span> = &#123;
              </p>
              <div className="pl-4 space-y-1 my-1">
                <p>
                  <span className="text-zinc-400">name:</span>{" "}
                  <span className="text-emerald-300">&quot;Derick Subedi&quot;</span>,
                </p>
                <p>
                  <span className="text-zinc-400">role:</span>{" "}
                  <span className="text-emerald-300">&quot;Junior MERN Developer @ Legacy IT&quot;</span>,
                </p>
                <p>
                  <span className="text-zinc-400">origin:</span>{" "}
                  <span className="text-emerald-300">&quot;Lalitpur, Nepal&quot;</span>,
                </p>
                <p>
                  <span className="text-zinc-400">education:</span> &#123;
                </p>
                <div className="pl-4">
                  <p>
                    <span className="text-zinc-400">degree:</span>{" "}
                    <span className="text-emerald-300">&quot;BCA (Computer Application)&quot;</span>,
                  </p>
                  <p>
                    <span className="text-zinc-400">university:</span>{" "}
                    <span className="text-emerald-300">&quot;Tribhuvan University&quot;</span>,
                  </p>
                </div>
                <p>&#125;,</p>
                <p>
                  <span className="text-zinc-400">stack:</span> [
                </p>
                <div className="pl-4 text-sky-300">
                  <p>&quot;MongoDB&quot;, &quot;Express.js&quot;, &quot;React.js&quot;, &quot;Node.js&quot;,</p>
                  <p>&quot;PostgreSQL&quot;, &quot;Next.js&quot;, &quot;TailwindCSS&quot;, &quot;GSAP&quot;</p>
                </div>
                <p>],</p>
                <p>
                  <span className="text-zinc-400">passions:</span> [
                </p>
                <div className="pl-4 text-amber-200">
                  <p>&quot;Scalable Architecture&quot;,</p>
                  <p>&quot;Awwwards-Level Micro-Interactions&quot;,</p>
                  <p>&quot;High-Performance Web Applications&quot;</p>
                </div>
                <p>],</p>
              </div>
              <p>&#125;;</p>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-zinc-500">
                <span>&#47;&#47; git status: clean</span>
                <span className="text-emerald-400">build: passing</span>
              </div>
            </div>

            {/* Quick Stats Footer */}
            <div className="grid grid-cols-2 divide-x divide-white/[0.06] bg-[#09090e] border-t border-white/[0.06] text-center py-4">
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">100%</p>
                <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mt-0.5">
                  Responsive Craft
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-400 tracking-tight">BCA</p>
                <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mt-0.5">
                  Tribhuvan Univ.
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
