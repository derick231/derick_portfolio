"use client";

import { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Handle high DPI displays crisply
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    // Mouse parallax tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 40;
      targetMouseY = (e.clientY / height - 0.5) * 40;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Scroll parallax tracking
    let scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Generate layered starfield
    const starCount = Math.floor(Math.min(width, 1600) * 0.16);
    const stars = [];
    const starColors = ["#FFFFFF", "#FDFBF7", "#E0EDFF", "#FFF3E0", "#A8D4FF"];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 1.5,
        size: Math.random() < 0.8 ? Math.random() * 1.2 + 0.4 : Math.random() * 1.8 + 1.2,
        baseAlpha: Math.random() * 0.7 + 0.25,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        depth: Math.random() * 0.6 + 0.4, // parallax depth multiplier
      });
    }

    // Solar system configuration
    // Planetary definitions with real astronomical proportions and orbital ratios
    const planets = [
      {
        name: "Mercury",
        r: 68,
        speed: 0.024,
        size: 2.4,
        color: "#D4D4D8",
        glow: "rgba(212, 212, 216, 0.4)",
        angle: Math.random() * Math.PI * 2,
      },
      {
        name: "Venus",
        r: 110,
        speed: 0.016,
        size: 3.6,
        color: "#FDE68A",
        glow: "rgba(253, 230, 138, 0.45)",
        angle: Math.random() * Math.PI * 2,
      },
      {
        name: "Earth",
        r: 165,
        speed: 0.011,
        size: 4.2,
        color: "#60A5FA",
        glow: "rgba(96, 165, 250, 0.6)",
        angle: Math.random() * Math.PI * 2,
        hasMoon: true,
      },
      {
        name: "Mars",
        r: 220,
        speed: 0.0085,
        size: 3.2,
        color: "#FB923C",
        glow: "rgba(251, 146, 60, 0.5)",
        angle: Math.random() * Math.PI * 2,
      },
      {
        name: "Jupiter",
        r: 340,
        speed: 0.0042,
        size: 9.0,
        color: "#FBBF24",
        glow: "rgba(251, 191, 36, 0.4)",
        hasBands: true,
        angle: Math.random() * Math.PI * 2,
      },
      {
        name: "Saturn",
        r: 440,
        speed: 0.0028,
        size: 7.5,
        color: "#FDE047",
        glow: "rgba(253, 224, 71, 0.4)",
        hasRings: true,
        angle: Math.random() * Math.PI * 2,
      },
      {
        name: "Uranus",
        r: 540,
        speed: 0.0018,
        size: 4.8,
        color: "#67E8F9",
        glow: "rgba(103, 232, 249, 0.4)",
        angle: Math.random() * Math.PI * 2,
      },
      {
        name: "Neptune",
        r: 640,
        speed: 0.0012,
        size: 4.5,
        color: "#38BDF8",
        glow: "rgba(56, 189, 248, 0.5)",
        angle: Math.random() * Math.PI * 2,
      },
    ];

    // Asteroid belt specks between Mars and Jupiter
    const asteroidCount = 85;
    const asteroids = [];
    for (let i = 0; i < asteroidCount; i++) {
      asteroids.push({
        r: 265 + (Math.random() - 0.5) * 36,
        angle: Math.random() * Math.PI * 2,
        speed: 0.006 + (Math.random() - 0.5) * 0.0015,
        size: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.4 + 0.2,
      });
    }

    // Occasional meteor / shooting star
    let meteor = null;
    let nextMeteorTime = Date.now() + 5000;

    const spawnMeteor = () => {
      const startX = Math.random() * width * 0.8 + width * 0.1;
      const startY = Math.random() * height * 0.4;
      const length = Math.random() * 140 + 80;
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.3; // ~45 degrees diagonal

      meteor = {
        x: startX,
        y: startY,
        dx: Math.cos(angle) * 16,
        dy: Math.sin(angle) * 16,
        length,
        progress: 0,
        alpha: 1,
      };

      nextMeteorTime = Date.now() + Math.random() * 8000 + 7000;
    };

    let time = 0;
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation physics loop
    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += prefersReducedMotion ? 0 : 0.015;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Deep space ambient cosmic nebulae gradients
      // 1. Solar flare radiance (around sun)
      const sunCenterX = (width > 1024 ? width * 0.72 : width * 0.5) + mouseX * 0.2;
      const sunCenterY = (width > 1024 ? height * 0.42 : height * 0.34) + mouseY * 0.2 - (scrollY * 0.04);

      const solarGlow = ctx.createRadialGradient(
        sunCenterX,
        sunCenterY,
        15,
        sunCenterX,
        sunCenterY,
        Math.min(width, height) * 0.8
      );
      solarGlow.addColorStop(0, "rgba(255, 75, 18, 0.10)");
      solarGlow.addColorStop(0.25, "rgba(255, 95, 31, 0.04)");
      solarGlow.addColorStop(0.6, "rgba(180, 50, 10, 0.015)");
      solarGlow.addColorStop(1, "transparent");

      ctx.fillStyle = solarGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Distant cosmic deep indigo/cyan dust nebula
      const nebulaGlow = ctx.createRadialGradient(
        width * 0.25 + mouseX * 0.4,
        height * 0.75 + mouseY * 0.4 - (scrollY * 0.06),
        30,
        width * 0.25,
        height * 0.75,
        Math.min(width, height) * 0.65
      );
      nebulaGlow.addColorStop(0, "rgba(99, 102, 241, 0.05)");
      nebulaGlow.addColorStop(0.4, "rgba(56, 189, 248, 0.02)");
      nebulaGlow.addColorStop(1, "transparent");

      ctx.fillStyle = nebulaGlow;
      ctx.fillRect(0, 0, width, height);

      // Render Starfield with Parallax
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const sx = (s.x + mouseX * s.depth + width) % width;
        const sy = (s.y + mouseY * s.depth - (scrollY * s.depth * 0.2) + height * 1.5) % height;

        const twinkle = prefersReducedMotion
          ? s.baseAlpha
          : s.baseAlpha * (0.65 + 0.35 * Math.sin(time * 3 * s.twinkleSpeed * 10 + s.twinkleOffset));

        ctx.fillStyle = s.color;
        ctx.globalAlpha = twinkle;
        ctx.beginPath();
        ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // Solar System Celestial Orbits & Planets
      const tiltAngle = -0.28; // Tilted perspective viewing angle (~ -16 degrees)
      const cosTilt = Math.cos(tiltAngle);
      const sinTilt = Math.sin(tiltAngle);
      const ellipseFlatten = 0.46; // Elliptical perspective aspect ratio

      // Draw planetary orbit paths
      ctx.lineWidth = 1;
      for (let i = 0; i < planets.length; i++) {
        const p = planets[i];
        ctx.beginPath();
        ctx.ellipse(
          sunCenterX,
          sunCenterY,
          p.r,
          p.r * ellipseFlatten,
          tiltAngle,
          0,
          Math.PI * 2
        );

        // Faint, elegant astronomical orbit line
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.055 - i * 0.0035})`;
        ctx.stroke();

        // Subtle astronomical coordinate ticks at cardinal angles
        [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].forEach((tickAngle) => {
          const tickX = p.r * Math.cos(tickAngle);
          const tickY = p.r * ellipseFlatten * Math.sin(tickAngle);
          const rx = sunCenterX + (tickX * cosTilt - tickY * sinTilt);
          const ry = sunCenterY + (tickX * sinTilt + tickY * cosTilt);

          ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
          ctx.beginPath();
          ctx.arc(rx, ry, 0.75, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Draw Asteroid Belt
      for (let i = 0; i < asteroids.length; i++) {
        const a = asteroids[i];
        if (!prefersReducedMotion) a.angle += a.speed * 0.025;

        const unrotX = a.r * Math.cos(a.angle);
        const unrotY = a.r * ellipseFlatten * Math.sin(a.angle);
        const ax = sunCenterX + (unrotX * cosTilt - unrotY * sinTilt);
        const ay = sunCenterY + (unrotX * sinTilt + unrotY * cosTilt);

        ctx.fillStyle = `rgba(214, 211, 209, ${a.alpha})`;
        ctx.beginPath();
        ctx.arc(ax, ay, a.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Central Star (The Sun)
      const sunPulse = prefersReducedMotion ? 0 : Math.sin(time * 2) * 1.5;
      const sunRadius = 24 + sunPulse;

      // Radiant solar corona
      const corona = ctx.createRadialGradient(
        sunCenterX,
        sunCenterY,
        sunRadius * 0.5,
        sunCenterX,
        sunCenterY,
        sunRadius * 3.8
      );
      corona.addColorStop(0, "rgba(255, 75, 18, 0.85)");
      corona.addColorStop(0.35, "rgba(255, 120, 40, 0.35)");
      corona.addColorStop(0.75, "rgba(255, 75, 18, 0.08)");
      corona.addColorStop(1, "transparent");

      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(sunCenterX, sunCenterY, sunRadius * 3.8, 0, Math.PI * 2);
      ctx.fill();

      // White-hot solar core
      const core = ctx.createRadialGradient(
        sunCenterX,
        sunCenterY,
        0,
        sunCenterX,
        sunCenterY,
        sunRadius
      );
      core.addColorStop(0, "#FFFFFF");
      core.addColorStop(0.3, "#FFF5EA");
      core.addColorStop(0.7, "#FF7A30");
      core.addColorStop(1, "#FF4B12");

      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(sunCenterX, sunCenterY, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw Planets along their orbits
      for (let i = 0; i < planets.length; i++) {
        const p = planets[i];
        if (!prefersReducedMotion) p.angle += p.speed * 0.035;

        const unrotX = p.r * Math.cos(p.angle);
        const unrotY = p.r * ellipseFlatten * Math.sin(p.angle);
        const px = sunCenterX + (unrotX * cosTilt - unrotY * sinTilt);
        const py = sunCenterY + (unrotX * sinTilt + unrotY * cosTilt);

        // Planet atmospheric glow aura
        ctx.fillStyle = p.glow;
        ctx.beginPath();
        ctx.arc(px, py, p.size * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Planet body
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Specific planetary features
        if (p.hasMoon) {
          // Earth's Moon orbiting Earth
          const moonAngle = time * 2.5;
          const moonDist = 13;
          const mx = px + moonDist * Math.cos(moonAngle);
          const my = py + moonDist * ellipseFlatten * Math.sin(moonAngle);

          ctx.fillStyle = "#E4E4E7";
          ctx.beginPath();
          ctx.arc(mx, my, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }

        if (p.hasRings) {
          // Saturn's tilted planetary rings
          ctx.save();
          ctx.beginPath();
          ctx.ellipse(px, py, p.size * 2.3, p.size * 0.75, tiltAngle - 0.2, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(253, 224, 71, 0.65)";
          ctx.lineWidth = 1.6;
          ctx.stroke();

          // Outer faint ring
          ctx.beginPath();
          ctx.ellipse(px, py, p.size * 2.8, p.size * 0.95, tiltAngle - 0.2, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(253, 224, 71, 0.3)";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }
      }

      // Handle Meteor / Shooting Star
      if (!meteor && Date.now() > nextMeteorTime && !prefersReducedMotion) {
        spawnMeteor();
      }

      if (meteor) {
        meteor.x += meteor.dx;
        meteor.y += meteor.dy;
        meteor.progress += 0.035;

        if (meteor.progress >= 1) {
          meteor = null;
        } else {
          const tailX = meteor.x - (meteor.dx / 16) * meteor.length * (1 - meteor.progress);
          const tailY = meteor.y - (meteor.dy / 16) * meteor.length * (1 - meteor.progress);

          const meteorGrad = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
          meteorGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
          meteorGrad.addColorStop(0.3, "rgba(255, 120, 40, 0.7)");
          meteorGrad.addColorStop(1, "transparent");

          ctx.strokeStyle = meteorGrad;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(meteor.x, meteor.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          // Bright meteor head spark
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(meteor.x, meteor.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}
