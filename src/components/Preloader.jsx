"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const counterRef = useRef(null);
  const brandRef = useRef(null);
  const statusRef = useRef(null);

  const [counter, setCounter] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Only run on the client
    if (typeof window === "undefined") return;

    // Check if session has already seen the preloader
    const hasSeen = sessionStorage.getItem("derick_preloader_seen");
    if (hasSeen) {
      setIsDone(true);
      if (onComplete) onComplete();
      window.dispatchEvent(new CustomEvent("preloaderFinished"));
      return;
    }

    const counterObj = { val: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        sessionStorage.setItem("derick_preloader_seen", "true");
        setIsDone(true);
        if (onComplete) onComplete();
        window.dispatchEvent(new CustomEvent("preloaderFinished"));
      },
    });

    // 1. Initial reveal of brand and status
    tl.fromTo(
      brandRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        statusRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.4"
      )
      // 2. Count from 0 to 100 with progress bar
      .to(
        counterObj,
        {
          val: 100,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            setCounter(Math.floor(counterObj.val));
          },
        },
        "-=0.2"
      )
      .to(
        progressBarRef.current,
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "<"
      )
      // 3. Status text change at halfway
      .to(
        statusRef.current,
        {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            if (statusRef.current) {
              statusRef.current.innerText = "PORTFOLIO READY";
            }
          },
        },
        "-=0.8"
      )
      .to(
        statusRef.current,
        {
          opacity: 1,
          duration: 0.3,
        },
        "-=0.6"
      )
      // 4. Curtain exit animation
      .to(
        [brandRef.current, counterRef.current, statusRef.current, progressBarRef.current],
        {
          y: -40,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.in",
        },
        "+=0.2"
      )
      .to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        },
        "-=0.1"
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#050508] text-white p-8 sm:p-14 select-none pointer-events-auto"
      style={{ willChange: "transform" }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.08em] text-white/50">
        <span>CREATIVE DEVELOPER</span>
        <span>KATHMANDU, NEPAL</span>
      </div>

      {/* Center Brand */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div ref={brandRef} className="text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] uppercase text-white">
              DERICK
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 text-[var(--accent)] font-semibold">
              ®
            </span>
          </div>
          <p className="text-[11px] uppercase tracking-[0.08em] font-semibold text-white/60 mt-3">
            Full-Stack MERN Developer
          </p>
        </div>

        {/* Counter Number */}
        <div ref={counterRef} className="mt-8">
          <span className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-[-0.03em] text-white tabular-nums">
            {counter < 10 ? `00${counter}` : counter < 100 ? `0${counter}` : counter}
          </span>
          <span className="text-xl sm:text-2xl font-mono text-[var(--accent)] ml-1">%</span>
        </div>

        <p
          ref={statusRef}
          className="text-[11px] uppercase tracking-[0.08em] font-semibold text-white/50 mt-4 transition-opacity"
        >
          LOADING...
        </p>
      </div>

      {/* Bottom Progress Bar */}
      <div className="w-full">
        <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="w-full h-full bg-[var(--accent)] origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
