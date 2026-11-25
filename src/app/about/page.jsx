import About from "@/components/About";
import Experience from "@/components/Experience";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "About Derick Subedi — Full-Stack MERN Developer",
  description: "About Derick Subedi, full-stack developer specializing in the MERN stack (MongoDB, Express, React, Node.js) and PostgreSQL.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-8">
        <Link
          href="/#about"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to home</span>
        </Link>
      </div>
      <About />
      <Experience />
    </div>
  );
}
