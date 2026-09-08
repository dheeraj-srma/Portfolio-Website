"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, MessageSquare, Compass, Copy } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/common/Icons";
import { PERSONAL_INFO } from "@/lib/data";
import { SpotlightCard } from "@/components/common/SpotlightCard";

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setLoading(true);
    // Simulating message submission or mailto fallback
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=Message from ${encodeURIComponent(
        formState.name
      )}&body=${encodeURIComponent(formState.message + "\n\nReply to: " + formState.email)}`;
      setFormState({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 max-w-5xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-mono text-blue-300 uppercase tracking-widest"
        >
          <Mail size={14} />
          <span>Get in Touch</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Let's Connect & Talk Engineering
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg font-light"
        >
          Always interested in discussing machine learning, systems architecture, physics, or collaborating on interesting technical problems.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side: Direct Contact Details & Links */}
        <div className="md:col-span-5 space-y-4">
          <SpotlightCard className="p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Direct Channels
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Feel free to email me directly or check out what I'm working on across the web.
              </p>
            </div>

            {/* Email Box */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-white truncate">
                  {PERSONAL_INFO.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0"
                  title="Copy email"
                >
                  {copied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Social / Profiles */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                Find Me On
              </span>
              <div className="flex flex-col gap-2 font-mono text-xs">
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-white/[0.02] border border-white/10 hover:border-blue-500/30 flex items-center justify-between text-gray-300 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon size={16} />
                    <span>github.com/dheeraj-srma</span>
                  </div>
                  <span className="text-gray-500 text-[10px]">Code & Repos</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-white/[0.02] border border-white/10 hover:border-blue-500/30 flex items-center justify-between text-gray-300 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon size={16} />
                    <span>linkedin.com/in/dheerajsharma0025</span>
                  </div>
                  <span className="text-gray-500 text-[10px]">Network</span>
                </a>

                <a
                  href={PERSONAL_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-white/[0.02] border border-white/10 hover:border-pink-500/30 flex items-center justify-between text-gray-300 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <InstagramIcon size={16} />
                    <span>@srma_g_ka_beta</span>
                  </div>
                  <span className="text-gray-500 text-[10px]">Personal</span>
                </a>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Right Side: Message Form */}
        <div className="md:col-span-7">
          <SpotlightCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                Send a Note
              </h3>

              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-mono text-gray-400 block">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. Alex Turing"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-mono text-gray-400 block">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono text-gray-400 block">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="What are you building or thinking about? Ask an engineering question or say hello."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-mono resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                {loading ? (
                  <span>Preparing Message...</span>
                ) : submitted ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Dispatched to Mail Client!</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
