"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId;

    // Use GSAP quickTo for ultra-fluid interpolation
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      setDotX(mouseX);
      setDotY(mouseY);
    };

    // Physics render loop for trailing ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    // Magnetic interaction listener
    const magneticElements = document.querySelectorAll("[data-magnetic='true']");
    const magneticCleanups = [];

    magneticElements.forEach((el) => {
      const onElMouseMove = (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.35;
        const deltaY = (e.clientY - centerY) * 0.35;

        gsap.to(el, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const onElMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      };

      el.addEventListener("mousemove", onElMouseMove);
      el.addEventListener("mouseleave", onElMouseLeave);

      magneticCleanups.push(() => {
        el.removeEventListener("mousemove", onElMouseMove);
        el.removeEventListener("mouseleave", onElMouseLeave);
      });
    });

    // Hover detection for interactive targets and context labels
    const updateHoverState = (e) => {
      const target = e.target;
      const textTrigger = target.closest("[data-cursor-text]");
      if (textTrigger) {
        setCursorText(textTrigger.getAttribute("data-cursor-text") || "");
        setIsHovered(true);
      } else {
        setCursorText("");
        const isClickable =
          target.closest("a") ||
          target.closest("button") ||
          target.closest("[role='button']") ||
          target.closest("input") ||
          target.closest("textarea");
        setIsHovered(!!isClickable);
      }
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", updateHoverState);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", updateHoverState);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      magneticCleanups.forEach((cleanup) => cleanup());
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 hidden md:block ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 rounded-full bg-white transition-transform duration-100 ${
          cursorText ? "w-0 h-0 opacity-0" : "w-2 h-2 opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Trailing Ring with Context Label */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-4 -mt-4 rounded-full border border-white/30 transition-[width,height,margin,background-color,border-color] duration-200 ease-out flex items-center justify-center backdrop-blur-[1px] ${
          cursorText
            ? "w-20 h-20 -ml-10 -mt-10 bg-white text-black border-transparent scale-100 shadow-2xl"
            : isHovered
            ? "w-14 h-14 -ml-7 -mt-7 bg-white/10 border-white/60 scale-105"
            : "w-8 h-8 bg-transparent"
        }`}
        style={{ willChange: "transform" }}
      >
        {cursorText && (
          <span
            ref={labelRef}
            className="text-[10px] font-mono font-bold tracking-widest text-black uppercase animate-fadeIn"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
