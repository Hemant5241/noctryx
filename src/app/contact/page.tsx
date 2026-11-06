"use client";

import { useState } from "react";
import { Copy, Check, Send, Terminal, MapPin, Clock } from "lucide-react";
import confetti from "canvas-confetti";
import { profileData } from "@/data/profile";
import { contactDetails, socialsData } from "@/data/socials";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Full-Time Role",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    txId: string;
    timestamp: string;
    name: string;
  } | null>(null);
  const [formError, setFormError] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactDetails.primaryEmail);
    setCopied(true);
    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.8 },
        colors: ["#FF3B00", "#CCFF00", "#0D0D0D"],
      });
    } catch {
      // noop
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError("Please fill out all required fields (Name, Email, and Message).");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    // Simulate safe local dispatch
    setTimeout(() => {
      const txId = "TX_" + Math.random().toString(36).substring(2, 9).toUpperCase();
      const timestamp = new Date().toISOString();
      setSubmittedData({
        txId,
        timestamp,
        name: formData.name,
      });
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#FF3B00", "#CCFF00", "#0D0D0D"],
        });
      } catch {
        // noop
      }
    }, 600);
  };

  return (
    <div className="w-full bg-[#F4F1EA] text-[#0D0D0D] font-mono">
      {/* Header section */}
      <section className="border-b-2 border-black bg-grid-paper py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/15 pb-3 mb-6 text-xs text-black/60">
            <div className="flex items-center gap-2">
              <span className="font-bold text-black">OM SHINDE</span>
              <span>{"//"}</span>
              <span className="text-[#FF3B00] font-bold">CONTACT TERMINAL</span>
            </div>
            <div>STATUS: {profileData.availability.statusText}</div>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-black tracking-tight uppercase leading-[0.9] mb-6">
            ESTABLISH <br />
            <span className="text-[#FF3B00]">CONNECTION.</span>
          </h1>

          <p className="font-sans text-base sm:text-xl font-bold text-black/80 max-w-2xl leading-relaxed">
            Interested in high-throughput AI engineering, agentic architecture, or research collaborations?
            Dispatch a message through the terminal or reach out directly.
          </p>
        </div>
      </section>

      {/* Main Grid: Terminal Form + Communication Channels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner">
              <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FF3B00]">
                  <Terminal className="w-4 h-4" />
                  <span>DISPATCH CONSOLE // TRANSMISSION TERMINAL</span>
                </div>
                <span className="text-[10px] text-black/60 font-bold">MODE: INTERACTIVE</span>
              </div>

              {submittedData ? (
                /* Honest Demo Submission Confirmation */
                <div className="p-6 border-2 border-black bg-[#CCFF00]/15 space-y-4">
                  <div className="flex items-center gap-2 text-black font-black text-base uppercase">
                    <Check className="w-5 h-5 text-[#FF3B00]" />
                    <span>TRANSMISSION LOCAL LOG RECORDED</span>
                  </div>

                  <p className="text-xs font-sans text-black/80 leading-relaxed">
                    Thank you, <strong className="text-black">{submittedData.name}</strong>. Your simulated dispatch
                    has been processed by the client runtime interface.
                  </p>

                  <div className="p-3 border border-black bg-black text-[#F4F1EA] text-[11px] space-y-1">
                    <div>
                      <span className="text-[#FF3B00]">TELEMETRY_ID:</span> {submittedData.txId}
                    </div>
                    <div>
                      <span className="text-[#CCFF00]">TIMESTAMP:</span> {submittedData.timestamp}
                    </div>
                    <div>
                      <span className="text-white/60">CATEGORY:</span> {formData.category}
                    </div>
                  </div>

                  <div className="p-3 border border-black/20 bg-white text-[11px] text-black/70">
                    <strong className="text-black uppercase">HONEST DISPATCH NOTE:</strong> Because no external mail
                    server or third-party tracking is attached to this demo portfolio, please send an email directly to{" "}
                    <strong className="text-black underline">{contactDetails.primaryEmail}</strong> for guaranteed
                    communication.
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedData(null);
                      setFormData({
                        name: "",
                        email: "",
                        category: "Full-Time Role",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="brutalist-button text-xs py-2 px-4 cursor-pointer"
                  >
                    <span>DISPATCH ANOTHER MESSAGE</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {formError && (
                    <div className="p-3 border-2 border-[#FF3B00] bg-[#FF3B00]/10 text-xs font-bold text-[#FF3B00]">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-black/60 font-bold uppercase block mb-1">
                        YOUR NAME *:
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Vance"
                        className="w-full p-3 border-2 border-black bg-[#F4F1EA] text-xs font-bold text-black focus:outline-none focus:bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-black/60 font-bold uppercase block mb-1">
                        EMAIL ADDRESS *:
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@organization.com"
                        className="w-full p-3 border-2 border-black bg-[#F4F1EA] text-xs font-bold text-black focus:outline-none focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-black/60 font-bold uppercase block mb-1">
                      INQUIRY CLASSIFICATION:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        "Full-Time Role",
                        "Research Collab",
                        "Consulting",
                        "General Inquiry",
                      ].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: cat })}
                          className={`py-2 px-2 text-[10px] font-bold border transition-colors cursor-pointer ${
                            formData.category === cat
                              ? "bg-black text-[#F4F1EA] border-black shadow-[2px_2px_0px_0px_rgba(255,59,0,1)]"
                              : "bg-[#F4F1EA] text-black border-black/30 hover:border-black"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-black/60 font-bold uppercase block mb-1">
                      SUBJECT / TOPIC:
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. AI Systems Architect Role — Q4 Pipeline"
                      className="w-full p-3 border-2 border-black bg-[#F4F1EA] text-xs font-bold text-black focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-black/60 font-bold uppercase block mb-1">
                      MESSAGE BODY *:
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline technical requirements, problem statement, team structure, or inquiry details..."
                      className="w-full p-3 border-2 border-black bg-[#F4F1EA] text-xs font-sans text-black focus:outline-none focus:bg-white"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="brutalist-button brutalist-button-primary w-full cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "DISPATCHING PACKETS..." : "SEND DISPATCH TRANSMISSION"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Verified Coordinates & Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card with One-Click Copy */}
            <div className="p-6 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] crosshair-corner">
              <div className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider mb-2">
                DIRECT INBOX ACCESS
              </div>
              <h3 className="text-lg font-black text-black uppercase mb-3">
                PRIMARY EMAIL CHANNEL
              </h3>
              <p className="text-xs text-black/70 mb-4 font-sans">
                For urgent communications, recruitment inquiries, or research discussions:
              </p>

              <div className="p-3 border border-black bg-[#F4F1EA] flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold text-black truncate">
                  {contactDetails.primaryEmail}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 border border-black bg-white hover:bg-black hover:text-white transition-colors text-[10px] font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                  aria-label="Copy Direct Email"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#FF3B00]" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-black/60 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#FF3B00]" />
                <span>{contactDetails.responseExpectation}</span>
              </div>
            </div>

            {/* Geographic & Availability Telemetry */}
            <div className="p-6 border-2 border-black bg-[#0D0D0D] text-[#F4F1EA] shadow-[6px_6px_0px_0px_rgba(255,59,0,1)]">
              <div className="text-[10px] text-[#CCFF00] font-bold uppercase tracking-wider mb-3">
                GEOGRAPHIC & OPERATING TIMEZONE
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-4 h-4 text-[#FF3B00]" />
                  <span>{contactDetails.currentLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-[#A39F94]">
                  <Clock className="w-4 h-4 text-[#CCFF00]" />
                  <span>TIMEZONE: {contactDetails.timezone}</span>
                </div>
                <div className="border-t border-[#262626] pt-3 text-[10px] text-[#A39F94]">
                  <div className="text-white/60 mb-1">GPG FINGERPRINT:</div>
                  <div className="font-mono text-[#F4F1EA] break-all">
                    {contactDetails.gpgKeyFingerprint}
                  </div>
                </div>
              </div>
            </div>

            {/* Social channels matrix */}
            <div className="p-6 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider mb-3">
                EXTERNAL PROFILES & NETWORKS
              </div>
              <div className="space-y-2">
                {socialsData.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 border border-black/20 hover:border-black hover:bg-[#F4F1EA] transition-all flex items-center justify-between text-xs group"
                  >
                    <span className="font-bold text-black group-hover:text-[#FF3B00]">
                      {social.label}
                    </span>
                    <span className="text-[10px] text-black/50 font-normal">
                      {social.handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
