"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Send,
  Copy,
  Check,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./Icons";

export default function Contact() {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const emailAddress = "salvationderick23@gmail.com";
  const phoneNumber = "+977 9825325777";
  const location = "Lalitpur, Bagmati Province, Nepal";

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Kinetic typography reveal for contact headline
      gsap.from(".contact-word", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
        },
        yPercent: 120,
        opacity: 0,
        rotateX: -25,
        stagger: 0.04,
        duration: 0.9,
        ease: "power4.out",
      });

      gsap.from(".contact-fade-in", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 72%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg("");
    setSuccess(false);

    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

    if (serviceId && templateId && publicKey && formRef.current) {
      try {
        await emailjs.sendForm(serviceId, templateId, formRef.current, {
          publicKey,
        });
        setSuccess(true);
        formRef.current.reset();
      } catch (err) {
        console.error("EmailJS Error:", err);
        setErrorMsg("Email service unavailable. Opening your default mail client...");
        const formData = new FormData(formRef.current);
        const name = formData.get("user_name") || "Friend";
        const email = formData.get("user_email") || "";
        const message = formData.get("user_message") || "";
        window.location.href = `mailto:${emailAddress}?subject=Portfolio Inquiry from ${name}&body=${encodeURIComponent(
          message + "\n\nReply to: " + email
        )}`;
      } finally {
        setSending(false);
      }
    } else {
      // Direct mailto fallback if EmailJS keys are not configured in local environment
      const formData = new FormData(formRef.current);
      const name = formData.get("user_name") || "Inquirer";
      const email = formData.get("user_email") || "";
      const message = formData.get("user_message") || "";
      window.location.href = `mailto:${emailAddress}?subject=Portfolio Inquiry from ${name}&body=${encodeURIComponent(
        message + "\n\nSender Email: " + email
      )}`;
      setSuccess(true);
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full bg-transparent border-t border-[var(--border)] overflow-hidden z-20"
    >
      <div className="py-28 md:py-36 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline & Direct Contacts (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-0.5 bg-[var(--accent)] shrink-0" />
              <span className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--accent)]">
                Contact
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.02em] uppercase text-[var(--text)] leading-[1.0] mb-6 perspective-1000">
              <span className="inline-block overflow-hidden py-0.5">
                <span className="contact-word inline-block mr-3">GET</span>
                <span className="contact-word inline-block">IN</span>
              </span>{" "}
              <br />
              <span className="inline-block overflow-hidden py-0.5">
                <span className="contact-word inline-block text-[var(--accent)]">TOUCH.</span>
              </span>
            </h2>

            <p className="contact-fade-in text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-normal mb-10 max-w-lg">
              Available for full-stack developer roles, contract work, and technical inquiries. Reach out directly via email or send a message using the form.
            </p>

            {/* Contact Direct Cards */}
            <div className="contact-fade-in flex flex-col gap-4 mb-10">
              {/* Email Card with One-Click Copy */}
              <div
                data-cursor-text="COPY"
                className="p-4 rounded-2xl bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[var(--accent)]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--text-muted)]">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${emailAddress}`}
                      className="text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                    >
                      {emailAddress}
                    </a>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  data-magnetic="true"
                  className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-mono text-[var(--text)] transition-colors flex items-center gap-1.5"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location & Phone Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] flex items-center gap-3.5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[var(--accent)]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--text-muted)]">
                      Location
                    </p>
                    <p className="text-xs font-semibold text-[var(--text)]">
                      {location}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] flex items-center gap-3.5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[var(--accent)]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--text-muted)]">
                      Direct Phone
                    </p>
                    <p className="text-xs font-semibold text-[var(--text)]">
                      {phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Profiles */}
            <div className="contact-fade-in flex items-center gap-3">
              <a
                href="https://github.com/derick231"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="true"
                className="px-4 py-2 rounded-xl bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] hover:border-[var(--accent)] text-xs font-mono text-[var(--text)] hover:text-[var(--accent)] transition-all flex items-center gap-2 shadow-sm"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-[var(--text-muted)]" />
              </a>

              <a
                href="https://www.linkedin.com/in/derick-subedi-9149b1358/"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="true"
                className="px-4 py-2 rounded-xl bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] hover:border-[var(--accent)] text-xs font-mono text-[var(--text)] hover:text-[var(--accent)] transition-all flex items-center gap-2 shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-[var(--text-muted)]" />
              </a>

              <a
                href="https://www.instagram.com/kancha_derick/"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="true"
                className="px-4 py-2 rounded-xl bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] hover:border-[var(--accent)] text-xs font-mono text-[var(--text)] hover:text-[var(--accent)] transition-all flex items-center gap-2 shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 text-[var(--text-muted)]" />
              </a>
            </div>
          </div>

          {/* Right Column: High-Craft Contact Form (6 Cols) */}
          <div className="lg:col-span-6 contact-fade-in">
            <div className="p-8 sm:p-10 rounded-3xl bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] shadow-2xl relative">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-[var(--accent)]" />
                  <span className="text-xs uppercase tracking-[0.08em] font-semibold text-[var(--text)]">
                    Send A Direct Message
                  </span>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                  Average reply &lt; 24h
                </span>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--text-muted)]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    placeholder="e.g. Elena Vance"
                    className="w-full px-4 py-3 rounded-xl bg-[#12121C]/80 border border-white/10 text-[var(--text)] text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[var(--accent)] focus:bg-[#181826] transition-all"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--text-muted)]">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#12121C]/80 border border-white/10 text-[var(--text)] text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[var(--accent)] focus:bg-[#181826] transition-all"
                  />
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase font-semibold tracking-[0.08em] text-[var(--text-muted)]">
                    Your Message
                  </label>
                  <textarea
                    name="user_message"
                    required
                    rows={5}
                    placeholder="Tell me about your project, timeline, and vision..."
                    className="w-full px-4 py-3 rounded-xl bg-[#12121C]/80 border border-white/10 text-[var(--text)] text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[var(--accent)] focus:bg-[#181826] resize-none transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={sending}
                  data-magnetic="true"
                  data-cursor-text="SEND"
                  className="group relative w-full py-4 rounded-xl bg-[var(--accent)] text-white font-medium text-xs uppercase tracking-[0.08em] hover:bg-[var(--accent-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-[var(--accent)]/20 mt-2"
                >
                  {sending ? (
                    <span>Transmitting Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {success && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                    Message transmitted successfully! Thank you for reaching out.
                  </div>
                )}

              {success && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                  Message transmitted successfully! Thank you for reaching out.
                </div>
              )}

              {errorMsg && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                  {errorMsg}
                </div>
              )}
          </form>
        </div>
      </div>
    </div>
      </div >
    </section >
  );
}
