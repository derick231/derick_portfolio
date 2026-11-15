"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0.3;
    let rotY = 0.4;
    let rotZ = 0;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / height - 0.5;
      targetRotY = x * 0.8;
      targetRotX = -y * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Torus / Sphere Geometric Wireframe Points
    const rings = 14;
    const pointsPerRing = 24;
    const R = Math.min(width, height) * 0.28; // Major radius
    const r = R * 0.42; // Minor radius

    const points = [];
    for (let i = 0; i < rings; i++) {
      const u = (i / rings) * Math.PI * 2;
      for (let j = 0; j < pointsPerRing; j++) {
        const v = (j / pointsPerRing) * Math.PI * 2;
        const x = (R + r * Math.cos(v)) * Math.cos(u);
        const y = (R + r * Math.cos(v)) * Math.sin(u);
        const z = r * Math.sin(v);
        points.push({ x, y, z, u, v });
      }
    }

    // Ambient floating particles
    const particleCount = 40;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: (Math.random() - 0.5) * 400,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.002 + 0.001,
        angle: Math.random() * Math.PI * 2,
      });
    }

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth damping rotation
      if (!prefersReducedMotion) {
        rotX += (targetRotX + 0.4 - rotX) * 0.03;
        rotY += (targetRotY + 0.6 - rotY) * 0.03;
        rotZ += 0.003;
      }

      const cx = width / 2;
      const cy = height / 2;
      const focalLength = 480;

      // Draw subtle background ambient glow
      const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, R * 1.8);
      bgGrad.addColorStop(0, "rgba(56, 189, 248, 0.07)");
      bgGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.03)");
      bgGrad.addColorStop(1, "transparent");
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Render floating dust particles
      for (let p of particles) {
        p.angle += p.speed;
        const px = p.x + Math.sin(p.angle) * 15;
        const py = p.y + Math.cos(p.angle) * 15;
        const scale = focalLength / (focalLength + p.z + 200);
        const screenX = cx + px * scale;
        const screenY = cy + py * scale;

        ctx.fillStyle = `rgba(226, 232, 240, ${0.2 * scale})`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3D rotation matrix calculation
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY + rotZ);
      const sinY = Math.sin(rotY + rotZ);

      // Project vertices
      const projected = points.map((pt) => {
        // Rotate Y
        let x1 = pt.x * cosY + pt.z * sinY;
        let y1 = pt.y;
        let z1 = -pt.x * sinY + pt.z * cosY;

        // Rotate X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        const depth = focalLength / (focalLength + z2 + 300);
        return {
          sx: cx + x2 * depth,
          sy: cy + y2 * depth,
          depth,
          z: z2,
        };
      });

      // Draw connecting metallic rings
      ctx.lineWidth = 1;
      for (let i = 0; i < rings; i++) {
        ctx.beginPath();
        for (let j = 0; j <= pointsPerRing; j++) {
          const idx = i * pointsPerRing + (j % pointsPerRing);
          const p = projected[idx];
          if (j === 0) {
            ctx.moveTo(p.sx, p.sy);
          } else {
            ctx.lineTo(p.sx, p.sy);
          }
        }
        // Metallic gradient based on depth
        const avgDepth = projected[i * pointsPerRing].depth;
        const alpha = Math.max(0.08, Math.min(0.5, (avgDepth - 0.5) * 1.2));
        ctx.strokeStyle = `rgba(226, 232, 240, ${alpha})`;
        ctx.stroke();
      }

      // Draw perpendicular cross ribs for metallic cage structure
      for (let j = 0; j < pointsPerRing; j += 2) {
        ctx.beginPath();
        for (let i = 0; i <= rings; i++) {
          const idx = (i % rings) * pointsPerRing + j;
          const p = projected[idx];
          if (i === 0) {
            ctx.moveTo(p.sx, p.sy);
          } else {
            ctx.lineTo(p.sx, p.sy);
          }
        }
        const alpha = Math.max(0.05, Math.min(0.35, (projected[j].depth - 0.5) * 0.9));
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.8})`;
        ctx.stroke();
      }

      // Metallic Specular Highlights (points with high z / facing camera)
      for (let i = 0; i < projected.length; i += 4) {
        const p = projected[i];
        if (p.z > 50) {
          const sparkle = Math.pow((p.z - 50) / 100, 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.8, sparkle * 0.7)})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, 1.5 * p.depth, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[550px] max-h-[550px] object-contain pointer-events-none"
      />
    </div>
  );
}
