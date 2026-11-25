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
    <footer className="w-full bg-[#050508]/85 backdrop-blur-md border-t border-[var(--border)]">
      <div className="py-12 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto text-xs font-mono text-zinc-400">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand & Copyright */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-white text-sm tracking-tighter">
              DERICK®
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">© {new Date().getFullYear()} Derick Subedi.</span>
          </div>

          {/* Center: Live Local Time in Kathmandu, Nepal */}
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            <span>Lalitpur, Nepal:</span>
            <span className="text-white font-medium">{nepalTime || "NPT"}</span>
          </div>

          {/* Right: Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-zinc-400 hover:text-[var(--accent)] transition-colors"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">BACK TO TOP</span>
            <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] group-hover:-translate-y-0.5 transition-all">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-[11px] text-zinc-500 font-normal">
          Built with Next.js, Tailwind CSS, Lenis &amp; GSAP.
        </div>
      </div>
    </footer>
  );
}
