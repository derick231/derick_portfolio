"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "./SmoothScroll";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./Icons";

const navLinks = [
  { title: "Home", href: "#hero" },
  { title: "About", href: "#about" },
  { title: "Projects", href: "#projects" },
  { title: "Skills", href: "#skills" },
  { title: "Experience", href: "#experience" },
  { title: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section
      const sections = ["hero", "about", "projects", "skills", "experience", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);

    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -70, duration: 1.2 });
        } else {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      } else if (pathname !== "/") {
        window.location.href = `/${href}`;
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-[#070709]/80 backdrop-blur-md border-b border-white/[0.06] shadow-2xl shadow-black/50"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            data-magnetic="true"
            className="group flex items-center gap-2 text-white tracking-tight cursor-pointer"
          >
            <span className="font-bold text-xl md:text-2xl tracking-tighter">
              DERICK
            </span>
            <span className="text-xs font-mono px-1.5 py-0.5 rounded border border-white/20 text-white/70 group-hover:border-white/50 group-hover:text-white transition-colors">
              ®
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#121218]/60 border border-white/[0.08] px-3 py-1.5 rounded-full backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs uppercase tracking-widest font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-black bg-white shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.title}
                </a>
              );
            })}
          </nav>

          {/* CTA / Resume link */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="/derick_mern_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic="true"
              className="group flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Resume
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-full border border-white/10 text-white bg-white/[0.03] hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-[#070709]/95 backdrop-blur-xl md:hidden transition-all duration-500 flex flex-col justify-between px-8 py-24 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-full"
        }`}
      >
        <div className="flex flex-col gap-6 pt-8">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            Navigation
          </span>
          {navLinks.map((link, idx) => (
            <a
              key={link.title}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{ transitionDelay: `${idx * 40}ms` }}
              className="text-3xl font-light tracking-tight text-white/90 hover:text-white hover:translate-x-2 transition-all duration-300"
            >
              {link.title}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-6 pt-12 border-t border-white/10">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/derick231"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/derick-subedi-9149b1358/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/kancha_derick/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
              aria-label="Instagram Profile"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
          </div>

          <a
            href="/derick_mern_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-semibold py-3 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors"
          >
            Download Resume
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
}
