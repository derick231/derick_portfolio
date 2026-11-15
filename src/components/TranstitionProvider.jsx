"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";

export default function TransitionProvider({ children }) {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#070709] text-[#f4f4f5] selection:bg-white selection:text-black">
        {/* Fullscreen Cinematic Preloader */}
        <Preloader />

        {/* Subtle noise and ambient grain */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-noise opacity-40" />

        {/* Custom interactive cursor */}
        <CustomCursor />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="relative z-10">{children}</main>

        {/* Global Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
