"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "./SmoothScroll";

export default function Footer() {
  const [nepalTime, setNepalTime] = useState("");
  const lenis = useLenis();

  useEffect(() => {
    const updateTime = () => {
      try {
        const options = {
          timeZone: "Asia/Kathmandu",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        };
        const formatter = new Intl.DateTimeFormat([], options);
        setNepalTime(formatter.format(new Date()));
      } catch (err) {
        setNepalTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative py-12 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08] text-xs font-mono text-zinc-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Copyright */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-white text-sm tracking-tighter">
            DERICK®
          </span>
          <span>•</span>
          <span>© {new Date().getFullYear()} Derick Subedi.</span>
        </div>

        {/* Center: Live Local Time in Kathmandu, Nepal */}
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Lalitpur, Nepal:</span>
          <span className="text-white font-medium">{nepalTime || "NPT"}</span>
        </div>

        {/* Right: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <span>BACK TO TOP</span>
          <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white group-hover:-translate-y-0.5 transition-all">
            <ArrowUp className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-white/[0.04] text-center text-[11px] text-zinc-600">
        Crafted with Next.js, Tailwind CSS, Lenis &amp; GSAP. Built for high performance &amp; cinematic motion.
      </div>
    </footer>
  );
}
