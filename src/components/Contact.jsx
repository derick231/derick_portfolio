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
  Sparkles,
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
      className="relative w-full bg-[#070709] border-t border-white/[0.06] overflow-hidden z-20"
    >
      <div className="py-28 md:py-36 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        {/* Ambient background light */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-t from-sky-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex items-center gap-3 mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
          05 // Initiate Contact
        </span>
        <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-sky-400/40 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Headline & Direct Contacts (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white leading-[1.0] mb-6 perspective-1000">
            <span className="inline-block overflow-hidden py-0.5">
              <span className="contact-word inline-block mr-3">HAVE</span>
              <span className="contact-word inline-block mr-3">AN</span>
              <span className="contact-word inline-block">IDEA?</span>
            </span>{" "}
            <br />
            <span className="inline-block overflow-hidden py-0.5">
              <span className="contact-word inline-block text-metallic mr-3">LET&apos;S</span>
              <span className="contact-word inline-block text-metallic">BUILD</span>
            </span>{" "}
            <br />
            <span className="inline-block overflow-hidden py-0.5">
              <span className="contact-word inline-block text-zinc-400 font-light mr-3">SOMETHING</span>
              <span className="contact-word inline-block text-zinc-400 font-light">GREAT.</span>
            </span>
          </h2>

          <p className="contact-fade-in text-base sm:text-lg text-zinc-400 leading-relaxed font-normal mb-10 max-w-lg">
            Whether you are looking to build a new MERN stack product, collaborate on creative frontend experiences, or inquire about full-time opportunities, my inbox is always open.
          </p>

          {/* Contact Direct Cards */}
          <div className="contact-fade-in flex flex-col gap-4 mb-10">
            {/* Email Card with One-Click Copy */}
            <div
              data-cursor-text="COPY"
              className="p-4 rounded-2xl bg-[#0f0f15] border border-white/[0.08] hover:border-white/20 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    Email Address
                  </p>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="text-sm font-semibold text-white hover:text-sky-400 transition-colors"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmail}
                data-magnetic="true"
                className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/15 text-xs font-mono text-zinc-300 transition-colors flex items-center gap-1.5"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Location & Phone Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#0f0f15] border border-white/[0.08] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    Location
                  </p>
                  <p className="text-xs font-semibold text-white">
                    {location}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0f0f15] border border-white/[0.08] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    Direct Phone
                  </p>
                  <p className="text-xs font-semibold text-white">
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
              className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>

            <a
              href="https://www.linkedin.com/in/derick-subedi-9149b1358/"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic="true"
              className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-2"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>

            <a
              href="https://www.instagram.com/kancha_derick/"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic="true"
              className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-2"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>
          </div>
        </div>

        {/* Right Column: High-Craft Contact Form (6 Cols) */}
        <div className="lg:col-span-6 contact-fade-in">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0c12] border border-white/[0.09] shadow-2xl relative">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
                  Send A Direct Message
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-500">
                Average reply &lt; 24h
              </span>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Your Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="e.g. Elena Vance"
                  className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-[#181824] transition-all"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Your Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-[#181824] transition-all"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Your Message
                </label>
                <textarea
                  name="user_message"
                  required
                  rows={5}
                  placeholder="Tell me about your project, timeline, and vision..."
                  className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-[#181824] resize-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={sending}
                data-magnetic="true"
                data-cursor-text="SEND"
                className="group relative w-full py-4 rounded-xl bg-white text-black font-semibold text-sm uppercase tracking-wider hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-white/10 mt-2"
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

              {/* Status alerts */}
              {success && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Your message was sent successfully! I will reply shortly.</span>
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
      </div>
    </section>
  );
}
