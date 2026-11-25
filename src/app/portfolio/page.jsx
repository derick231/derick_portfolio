import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Projects & Portfolio — Derick Subedi",
  description: "Selected full-stack web applications and software engineering projects built by Derick Subedi.",
};

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to home</span>
        </Link>
      </div>
      <Projects />
      <Skills />
    </div>
  );
}
