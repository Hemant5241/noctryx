"use client";

import { useState } from "react";
import { Copy, Check, Send, Terminal, MapPin, Clock } from "lucide-react";
import confetti from "canvas-confetti";
import { profileData } from "@/data/profile";
import { contactDetails, socialsData } from "@/data/socials";
import { useTheme } from "@/context/ThemeContext";

export default function ContactPage() {
  const { theme } = useTheme();
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

  const confettiColors =
    theme === "signal-studio"
      ? ["#FF4FA3", "#C6FF00", "#6938FF", "#00E5D4", "#FF7139", "#1B1020"]
      : theme === "crimson-noir"
      ? ["#D41514", "#CDCBCA", "#FFFFFF", "#141418"]
      : ["#FF3B00", "#CCFF00", "#0D0D0D"];

  const handleCopyEmail = () => {
    if (!contactDetails.primaryEmail) return;
    navigator.clipboard.writeText(contactDetails.primaryEmail);
    setCopied(true);
    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.8 },
        colors: confettiColors,
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
          colors: confettiColors,
        });
      } catch {
        // noop
      }
    }, 600);
  };

  return (
    <div className="w-full bg-[#F4F1EA] text-[#0D0D0D] font-mono">
      {/* Header section */}
      <section className="border-b-2 border-black bg-grid-paper py-10 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/15 pb-3 mb-6 text-xs text-black/60">
            <div className="flex items-center gap-2">
              <span className="font-bold text-black">HEMANT BHOSALE</span>
              <span>{"//"}</span>
              <span className="text-[#FF3B00] font-bold">CONTACT TERMINAL</span>
            </div>
            <div>STATUS: {profileData.availability.statusText}</div>
          </div>

          <h1 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-black text-black tracking-tight uppercase leading-[0.9] mb-4 sm:mb-6 break-words">
            ESTABLISH <br />
            <span className="text-[#FF3B00]">CONNECTION.</span>
          </h1>

          <p className="font-sans text-sm sm:text-lg md:text-xl font-bold text-black/80 max-w-2xl leading-relaxed mb-6">
            Interested in high-throughput AI engineering, agentic architecture, or research collaborations?
            Dispatch a simulated packet through the terminal or reach out directly via verified channels.
          </p>

          {/* Demonstration Notice */}
          <div className="p-3 border-2 border-black bg-white inline-flex items-center gap-2 text-xs font-mono text-black/70 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <span className="font-black text-[#FF3B00]">[LOCAL SIMULATION]</span>
            <span>
              This terminal provides an interactive client-side simulation. Direct email remains the primary channel.
            </span>
          </div>
        </div>
      </section>

      {/* Main Grid: Terminal Form + Communication Channels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-4 sm:p-6 md:p-10 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner">
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
                    server or third-party tracking is attached to this demo portfolio, dispatches are processed client-side. {contactDetails.isEmailVerified && contactDetails.primaryEmail ? (
                      <>You can also reach out directly to <strong className="text-black underline">{contactDetails.primaryEmail}</strong> for guaranteed communication.</>
                    ) : (
                      <>Verified direct email channels can be connected via <code className="bg-black/5 px-1 font-mono font-bold">src/data/socials.ts</code>.</>
                    )}
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
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="p-3 border-2 border-[#FF3B00] bg-[#FF3B00]/10 text-xs font-bold text-[#FF3B00]"
                    >
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="sender-name"
                        className="text-[10px] text-black/60 font-bold uppercase block mb-1"
                      >
                        YOUR NAME *:
                      </label>
                      <input
                        id="sender-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Vance"
                        className="w-full p-3 border-2 border-black bg-[#F4F1EA] text-xs font-bold text-black focus:outline-none focus:bg-white focus-visible:ring-2 focus-visible:ring-[#FF3B00]"
                        required
                        aria-required="true"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="sender-email"
                        className="text-[10px] text-black/60 font-bold uppercase block mb-1"
                      >
                        EMAIL ADDRESS *:
                      </label>
                      <input
                        id="sender-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@organization.com"
                        className="w-full p-3 border-2 border-black bg-[#F4F1EA] text-xs font-bold text-black focus:outline-none focus:bg-white focus-visible:ring-2 focus-visible:ring-[#FF3B00]"
                        required
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      id="inquiry-category-label"
                      className="text-[10px] text-black/60 font-bold uppercase block mb-1"
                    >
                      INQUIRY CLASSIFICATION:
                    </label>
                    <div
                      role="radiogroup"
                      aria-labelledby="inquiry-category-label"
                      className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2"
                    >
                      {[
                        "Full-Time Role",
                        "Research Collab",
                        "Consulting",
                        "General Inquiry",
                      ].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          role="radio"
                          aria-checked={formData.category === cat}
                          onClick={() => setFormData({ ...formData, category: cat })}
                          className={`py-2 px-2 text-[10px] font-bold border transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FF3B00] ${
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
                    <label
                      htmlFor="message-subject"
                      className="text-[10px] text-black/60 font-bold uppercase block mb-1"
                    >
                      SUBJECT / TOPIC:
                    </label>
                    <input
                      id="message-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. AI Systems Architect Role — Q4 Pipeline"
                      className="w-full p-3 border-2 border-black bg-[#F4F1EA] text-xs font-bold text-black focus:outline-none focus:bg-white focus-visible:ring-2 focus-visible:ring-[#FF3B00]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message-body"
                      className="text-[10px] text-black/60 font-bold uppercase block mb-1"
                    >
                      MESSAGE BODY *:
                    </label>
                    <textarea
                      id="message-body"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline technical requirements, problem statement, team structure, or inquiry details..."
                      className="w-full p-3 border-2 border-black bg-[#F4F1EA] text-xs font-sans text-black focus:outline-none focus:bg-white focus-visible:ring-2 focus-visible:ring-[#FF3B00]"
                      required
                      aria-required="true"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="brutalist-button brutalist-button-primary w-full cursor-pointer flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#FF3B00]"
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
            <div className="p-4 sm:p-6 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] crosshair-corner">
              <div className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider mb-2">
                DIRECT INBOX ACCESS
              </div>
              <h3 className="text-base sm:text-lg font-black text-black uppercase mb-3">
                PRIMARY EMAIL CHANNEL
              </h3>
              <p className="text-xs text-black/70 mb-4 font-sans">
                For urgent communications, recruitment inquiries, or research discussions:
              </p>

              {contactDetails.isEmailVerified && contactDetails.primaryEmail ? (
                <div className="p-2.5 sm:p-3 border border-black bg-[#F4F1EA] flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-black truncate max-w-full">
                    {contactDetails.primaryEmail}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1 border border-black bg-white hover:bg-black hover:text-white transition-colors text-[10px] font-bold flex items-center gap-1 shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FF3B00]"
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
              ) : (
                <div className="p-2.5 sm:p-3 border border-black bg-[#F4F1EA] flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-black/70 truncate max-w-full">
                    DIRECT DISPATCH TERMINAL ACTIVE
                  </span>
                  <span className="px-2 py-0.5 border border-black bg-[#CCFF00] text-black text-[10px] font-bold shrink-0">
                    ONLINE
                  </span>
                </div>
              )}
              <div className="text-[10px] text-black/50 uppercase font-mono mb-4">
                [CONTACT CHANNELS // CONFIGURABLE IN SRC/DATA/SOCIALS.TS]
              </div>

              <div className="text-[11px] text-black/60 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#FF3B00]" />
                <span>{contactDetails.responseExpectation}</span>
              </div>
            </div>

            {/* Geographic & Availability Telemetry */}
            <div className="p-4 sm:p-6 border-2 border-black bg-[#0D0D0D] text-[#F4F1EA] shadow-[6px_6px_0px_0px_rgba(255,59,0,1)]">
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
            <div className="p-4 sm:p-6 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
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
