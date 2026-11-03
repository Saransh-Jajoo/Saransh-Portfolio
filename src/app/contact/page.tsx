"use client";

import { FormEvent, useState } from "react";
import { Code2, Download, Mail, Phone, Send } from "lucide-react";
import { brand } from "@/lib/data";
import { AsciiScenePanel } from "@/graphics/components/AsciiScenePanel";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    setError("");
    const mailSubject = encodeURIComponent(
      subject.trim() || `Portfolio Inquiry — ${name.trim()}`,
    );
    const mailBody = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    );
    window.location.href = `mailto:${brand.contact.email}?subject=${mailSubject}&body=${mailBody}`;
  }

  return (
    <main className="mx-auto max-w-[1400px] space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Header */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
          // 06 • DIRECT COMMUNICATION NODE
        </p>
        <h1 className="pixel-title mt-2 text-2xl font-bold text-ink sm:text-4xl">
          LET&apos;S BUILD SOMETHING INTELLIGENT
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Open to internships, engineering roles, and technical collaborations
          in AI, computer vision, embedded hardware, and IoT systems.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left: Verified Contact Channels + Distributed Network Scene */}
        <div className="space-y-6">
          <div className="glass-panel grid gap-4 rounded-2xl p-6 sm:grid-cols-2">
            <a
              href={`mailto:${brand.contact.email}`}
              className="rounded-xl border border-white/12 bg-[#070B18]/80 p-4 transition hover:border-cyan"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-cyan">
                <Mail size={15} />
                <span>EMAIL</span>
              </div>
              <p className="mt-2 break-all font-mono text-xs font-semibold text-ink">
                {brand.contact.email}
              </p>
            </a>

            <a
              href={`tel:${brand.contact.phone}`}
              className="rounded-xl border border-white/12 bg-[#070B18]/80 p-4 transition hover:border-yellow"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-yellow">
                <Phone size={15} />
                <span>PHONE</span>
              </div>
              <p className="mt-2 font-mono text-xs font-semibold text-ink">
                {brand.contact.phone}
              </p>
            </a>

            <a
              href={brand.contact.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/12 bg-[#070B18]/80 p-4 transition hover:border-cyan"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-cyan">
                <Code2 size={15} />
                <span>GITHUB</span>
              </div>
              <p className="mt-2 font-mono text-xs font-semibold text-ink">
                github.com/Saransh-Jajoo ↗
              </p>
            </a>

            <a
              href={brand.contact.resumePdf}
              download="Saransh_Jajoo_Resume.pdf"
              className="rounded-xl border border-yellow/35 bg-yellow/10 p-4 transition hover:border-yellow"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-yellow">
                <Download size={15} />
                <span>RESUME PDF</span>
              </div>
              <p className="mt-2 font-mono text-xs font-semibold text-ink">
                Download Official PDF
              </p>
            </a>
          </div>

          <AsciiScenePanel
            sceneId="software-arch"
            showSourceToggle
            subtitle="COMMUNICATION & DISTRIBUTED NETWORK TOPOLOGY"
          />
        </div>

        {/* Right: Verified Mail Client Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="glass-panel flex flex-col justify-between rounded-2xl p-6 sm:p-8"
        >
          <div className="space-y-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan">
                DIRECT EMAIL DISPATCH
              </p>
              <h2 className="mt-1 text-xl font-semibold text-ink">
                Compose an Engineering Inquiry
              </h2>
              <p className="mt-1 text-xs text-muted">
                Launches your default mail client addressed to{" "}
                <span className="text-ink">{brand.contact.email}</span> with
                your message pre-populated.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                  Your Name *
                </span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#070B18]/85 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-cyan"
                />
              </label>

              <label className="block">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                  Your Email *
                </span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#070B18]/85 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-cyan"
                />
              </label>
            </div>

            <label className="block">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                Subject
              </span>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="AI / Computer Vision / Embedded Systems Collaboration"
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#070B18]/85 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-cyan"
              />
            </label>

            <label className="block">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                Message *
              </span>
              <textarea
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about the system or role you are building..."
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#070B18]/85 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-cyan"
              />
            </label>

            {error ? (
              <p className="font-mono text-xs text-red">{error}</p>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#05060B] transition hover:bg-cyan"
            >
              <Send size={14} />
              <span>Open in Email Client</span>
            </button>
            <span className="font-mono text-[11px] text-muted">
              Verified mailto dispatch · No fake confirmation
            </span>
          </div>
        </form>
      </div>
    </main>
  );
}
