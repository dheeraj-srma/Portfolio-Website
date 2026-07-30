"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/common/Icons";
import { PERSONAL_INFO } from "@/lib/data";
import { SpotlightCard } from "@/components/common/SpotlightCard";

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 max-w-5xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-mono text-blue-300 uppercase tracking-widest"
        >
          <Mail size={14} />
          <span>Initiate Communication</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Let's Build Something High-Impact
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg font-light"
        >
          Whether you're starting a venture, building AI systems, or seeking high-level collaboration.
        </motion.p>
      </div>

      {/* Main Glass Form Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side (4 cols): Direct Info & Social Icons */}
        <div className="lg:col-span-5 space-y-6">
          <SpotlightCard className="h-full flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Direct Channels
              </h3>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                Reach out directly for AI architectural consulting, co-founder opportunities, or technical inquiries.
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-blue-500/40 transition-all text-gray-200 hover:text-white group"
                >
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[10px] font-mono text-gray-400 uppercase">Primary Email</span>
                    <span className="text-xs font-mono truncate">{PERSONAL_INFO.email}</span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-gray-200">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <MessageSquare size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-gray-400 uppercase">Location & Zone</span>
                    <span className="text-xs font-mono">Remote / Global (UTC+5:30)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Social Media Icons */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
                Connect Across Platforms
              </span>
              <div className="flex items-center gap-3">
                {[
                  { name: "GitHub", href: PERSONAL_INFO.githubUrl, icon: GithubIcon, color: "hover:text-white hover:border-white" },
                  { name: "LinkedIn", href: PERSONAL_INFO.linkedinUrl, icon: LinkedinIcon, color: "hover:text-blue-400 hover:border-blue-500" },
                  { name: "Instagram", href: PERSONAL_INFO.instagramUrl, icon: InstagramIcon, color: "hover:text-pink-400 hover:border-pink-500" },
                  { name: "Email", href: `mailto:${PERSONAL_INFO.email}`, icon: Mail, color: "hover:text-purple-400 hover:border-purple-500" }
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`h-11 w-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 ${social.color} transition-all shadow-md`}
                      title={social.name}
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Right Side (7 cols): Clean Glass Contact Form */}
        <div className="lg:col-span-7">
          <SpotlightCard className="p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-4"
              >
                <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Transmitted</h3>
                <p className="text-sm text-gray-300 font-light max-w-md mx-auto">
                  Thank you for reaching out. I have received your note and will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-all"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-300 uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-300 uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-300 uppercase">Message / Project Outline</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your vision, system requirements, or inquiry..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span className="font-mono text-xs">Transmitting Signal...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
