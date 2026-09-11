"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Loader2,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/common/Icons";
import { PERSONAL_INFO } from "@/lib/data";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { SectionBadge } from "@/components/common/SectionBadge";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "c60dbaa0-5762-4803-9753-0a973123f6a8";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Field validation checks (Barrier rules)
  const nameError =
    touched.name && !formState.name.trim()
      ? "Name is required."
      : touched.name && formState.name.trim().length < 2
      ? "Name must be at least 2 characters."
      : null;

  const emailError =
    touched.email && !formState.email.trim()
      ? "Email address is required."
      : touched.email && !EMAIL_REGEX.test(formState.email.trim())
      ? "Please enter a valid email address (e.g. name@domain.com)."
      : null;

  const messageError =
    touched.message && !formState.message.trim()
      ? "Message is required."
      : touched.message && formState.message.trim().length < 5
      ? "Message must be at least 5 characters."
      : null;

  const isFormValid =
    formState.name.trim().length >= 2 &&
    EMAIL_REGEX.test(formState.email.trim()) &&
    formState.message.trim().length >= 5;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBlur = (field: "name" | "email" | "message") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMessage(null);
    setFormState({ name: "", email: "", message: "" });
    setTouched({ name: false, email: false, message: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger touched on all fields to highlight any errors
    setTouched({ name: true, email: true, message: true });
    setErrorMessage(null);

    // Strict validation barrier: Reject without Name, Email, or Message
    const cleanName = formState.name.trim();
    const cleanEmail = formState.email.trim();
    const cleanMessage = formState.message.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      const missing: string[] = [];
      if (!cleanName) missing.push("Name");
      if (!cleanEmail) missing.push("Email");
      if (!cleanMessage) missing.push("Message");

      setErrorMessage(`Barrier Check: ${missing.join(", ")} must be filled before sending.`);
      return;
    }

    if (!EMAIL_REGEX.test(cleanEmail)) {
      setErrorMessage("Please enter a valid email address format (e.g. alex@example.com).");
      return;
    }

    if (cleanMessage.length < 5) {
      setErrorMessage("Please enter a message of at least 5 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: cleanName,
          email: cleanEmail,
          message: cleanMessage,
          subject: `Portfolio Message from ${cleanName}`,
          from_name: "Portfolio Contact Hub",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to deliver message via Web3Forms. Please try emailing directly."
        );
      }

      // Success state
      setSubmitted(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#3b82f6", "#60a5fa", "#93c5fd", "#ffffff"],
        });
      } catch {
        // Safe fallback
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected network error occurred.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 px-4 md:px-8 max-w-5xl mx-auto relative z-10 scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <SectionBadge
          icon={<Mail size={14} />}
          text="Get in Touch"
          color="blue"
        />
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

      {/* Synchronized Parallel Two-Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Direct Channels */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 flex flex-col h-full"
        >
          <SpotlightCard className="h-full p-8 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            {/* Top Block: Title & Direct Email */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Direct Channels
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Feel free to email me directly or check out what I'm working on across the web.
                </p>
              </div>

              {/* Email Box with copy micro-interaction */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                  Direct Email
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-white truncate">
                    {PERSONAL_INFO.email}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0 cursor-pointer"
                    title="Copy email"
                  >
                    {copied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Bottom Block: Find Me On Links with smooth hover */}
            <div className="space-y-3 pt-6">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                Find Me On
              </span>
              <div className="flex flex-col gap-2.5 font-mono text-xs">
                <motion.a
                  whileHover={{ x: 3 }}
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.05] flex items-center justify-between text-gray-300 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon size={16} />
                    <span>github.com/dheeraj-srma</span>
                  </div>
                  <span className="text-gray-500 text-[10px]">Code & Repos</span>
                </motion.a>

                <motion.a
                  whileHover={{ x: 3 }}
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.05] flex items-center justify-between text-gray-300 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon size={16} />
                    <span>Dheeraj Sharma</span>
                  </div>
                  <span className="text-gray-500 text-[10px]">Network</span>
                </motion.a>

                <motion.a
                  whileHover={{ x: 3 }}
                  href={PERSONAL_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-pink-500/30 hover:bg-white/[0.05] flex items-center justify-between text-gray-300 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <InstagramIcon size={16} />
                    <span>@srma_g_ka_beta</span>
                  </div>
                  <span className="text-gray-500 text-[10px]">Personal</span>
                </motion.a>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Right Side: Message Form or Success State */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7 flex flex-col h-full"
        >
          <SpotlightCard className="h-full p-8 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <AnimatePresence mode="wait">
              {submitted ? (
                /* Success Confirmation Card */
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col justify-between h-full py-6 space-y-6"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        Message Dispatched!
                      </h3>
                      <p className="text-sm text-gray-400 font-light mt-1.5 leading-relaxed">
                        Thank you, <span className="text-white font-medium">{formState.name}</span>. Your note has been delivered directly to my inbox. I'll review and get back to <span className="text-blue-400 font-mono text-xs">{formState.email}</span> soon.
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={handleReset}
                    className="w-full py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>Send Another Note</span>
                  </motion.button>
                </motion.div>
              ) : (
                /* Interactive Form with Validation Barrier */
                <form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col justify-between h-full space-y-5"
                >
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                      Send a Note
                    </h3>
                    <p className="text-xs text-gray-400 font-light">
                      Drop an inquiry, project proposition, or engineering question. All fields required.
                    </p>
                  </div>

                  {/* Error Notification Banner */}
                  <AnimatePresence>
                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5 font-mono"
                      >
                        <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p>{errorMessage}</p>
                          <p className="text-[10px] text-gray-400">
                            Alternatively, email directly at:{" "}
                            <span className="text-white underline cursor-pointer" onClick={handleCopyEmail}>
                              {PERSONAL_INFO.email}
                            </span>
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-4">
                    {/* Name Input with Barrier Check */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="name" className="text-xs font-mono text-gray-400 block">
                          Your Name <span className="text-blue-400">*</span>
                        </label>
                        {nameError && (
                          <span className="text-[10px] font-mono text-red-400">
                            {nameError}
                          </span>
                        )}
                      </div>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        onBlur={() => handleBlur("name")}
                        placeholder="e.g. Alex Turing"
                        className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-gray-600 focus:outline-none transition-colors font-mono ${
                          nameError
                            ? "border-red-500/50 focus:border-red-400"
                            : "border-white/10 focus:border-blue-500"
                        }`}
                      />
                    </div>

                    {/* Email Input with Barrier Check */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="email" className="text-xs font-mono text-gray-400 block">
                          Your Email <span className="text-blue-400">*</span>
                        </label>
                        {emailError && (
                          <span className="text-[10px] font-mono text-red-400">
                            {emailError}
                          </span>
                        )}
                      </div>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        onBlur={() => handleBlur("email")}
                        placeholder="alex@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-gray-600 focus:outline-none transition-colors font-mono ${
                          emailError
                            ? "border-red-500/50 focus:border-red-400"
                            : "border-white/10 focus:border-blue-500"
                        }`}
                      />
                    </div>

                    {/* Message Input with Barrier Check */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="message" className="text-xs font-mono text-gray-400 block">
                          Message <span className="text-blue-400">*</span>
                        </label>
                        {messageError && (
                          <span className="text-[10px] font-mono text-red-400">
                            {messageError}
                          </span>
                        )}
                      </div>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        onBlur={() => handleBlur("message")}
                        placeholder="What are you building or thinking about? Ask an engineering question or say hello."
                        className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-gray-600 focus:outline-none transition-colors font-mono resize-none ${
                          messageError
                            ? "border-red-500/50 focus:border-red-400"
                            : "border-white/10 focus:border-blue-500"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Submission Button with dynamic loading state */}
                  <motion.button
                    whileHover={!loading ? { scale: 1.015 } : undefined}
                    whileTap={!loading ? { scale: 0.985 } : undefined}
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3.5 px-6 rounded-xl font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer mt-2 ${
                      loading
                        ? "bg-blue-800 text-gray-300 cursor-not-allowed"
                        : isFormValid
                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                        : "bg-blue-600/70 hover:bg-blue-600 text-white/90"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Dispatching Transmission...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
