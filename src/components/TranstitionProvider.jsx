"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";
import SpaceBackground from "./SpaceBackground";

export default function TransitionProvider({ children }) {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-white">
        {/* Fullscreen Cinematic Preloader */}
        <Preloader />

        {/* Deep Space & Solar System Background Canvas */}
        <SpaceBackground />

        {/* Subtle noise and ambient grain */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-noise opacity-30" />

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
