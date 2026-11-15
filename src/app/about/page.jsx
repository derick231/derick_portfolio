import About from "@/components/About";
import Experience from "@/components/Experience";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "About Derick Subedi — Creative MERN Developer",
  description: "Learn more about Derick Subedi, full-stack developer specializing in MERN stack and creative frontend experiences.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-8">
        <Link
          href="/#about"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to main experience</span>
        </Link>
      </div>
      <About />
      <Experience />
    </div>
  );
}
