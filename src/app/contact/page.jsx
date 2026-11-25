import Contact from "@/components/Contact";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Contact Derick Subedi — Full-Stack Developer",
  description: "Get in touch with Derick Subedi for full-stack MERN development, web applications, or software engineering roles.",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-8">
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to home</span>
        </Link>
      </div>
      <Contact />
    </div>
  );
}
