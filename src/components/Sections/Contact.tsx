"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, MapPin, CheckCircle, Crosshair } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import confetti from "canvas-confetti";

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate database write
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00F5FF", "#7B61FF", "#00FFA3"],
    });

    // Reset form after a delay
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", email: "", message: "" });
    }, 5000);
  };

  const contactDetails = [
    {
      icon: <Mail className="w-4.5 h-4.5 text-primary" />,
      label: "Email",
      value: "saichintapalli6@gmail.com",
      link: "mailto:saichintapalli6@gmail.com",
    },
    {
      icon: <FaLinkedin className="w-4.5 h-4.5 text-secondary" />,
      label: "LinkedIn",
      value: "linkedin.com/in/sai-santosh-chintapalli",
      link: "https://linkedin.com/in/sai-santosh-chintapalli",
    },
    {
      icon: <FaGithub className="w-4.5 h-4.5 text-accent" />,
      label: "GitHub",
      value: "github.com/saichintapalli6-bit",
      link: "https://github.com/saichintapalli6-bit",
    },
    {
      icon: <Phone className="w-4.5 h-4.5 text-primary" />,
      label: "Phone / Contact",
      value: "+91 63040 24574",
      link: "tel:+916304024574",
    },
    {
      icon: <MapPin className="w-4.5 h-4.5 text-secondary" />,
      label: "Location",
      value: "Hyderabad, Telangana, India",
      link: "https://maps.google.com/?q=Hyderabad",
    },
  ];

  return (
    <section id="contact" className="min-h-screen w-full flex items-center justify-center py-20 px-6 md:px-12 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full" ref={containerRef}>
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono text-primary tracking-widest uppercase border border-primary/20 px-3 py-1 rounded-full bg-primary/5"
          >
            09_TRANSMISSION
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-space font-extrabold text-white mt-4 tracking-tight"
          >
            ESTABLISH COMMUNICATION
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Info & Holographic Map HUD (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Contact details list */}
            <div className="glass-panel p-6 rounded-3xl bg-slate-950/20">
              <h3 className="text-sm font-space font-extrabold text-slate-200 mb-5 uppercase tracking-wider">
                Direct Channels
              </h3>
              <div className="space-y-4">
                {contactDetails.map((detail, idx) => (
                  <a
                    key={idx}
                    href={detail.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3.5 rounded-2xl border border-white/3 bg-white/2 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/3 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {detail.icon}
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{detail.label}</span>
                      <p className="text-xs md:text-sm font-space font-bold text-slate-300 group-hover:text-white transition-colors truncate mt-0.5">
                        {detail.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Holographic Locator HUD Map */}
            <div className="glass-panel p-6 rounded-3xl bg-slate-950/20 flex-grow relative overflow-hidden min-h-[220px] flex flex-col justify-between">
              {/* Animated HUD Grid Lines */}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
              
              {/* Radar Circle Scanning Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-primary/10 animate-ping opacity-40 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-dashed border-secondary/20 animate-[spin_20s_linear_infinite] pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/5 pb-3 relative z-10">
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                  <Crosshair className="w-3.5 h-3.5 text-primary" /> LOCATOR_BEACON
                </span>
                <span className="text-[9px] font-mono text-primary font-bold">
                  ACTIVE
                </span>
              </div>

              {/* Holographic Location Pin HUD */}
              <div className="my-6 flex flex-col items-center justify-center relative z-10">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-primary/20 border border-primary animate-pulse" />
                  <MapPin className="w-7 h-7 text-primary pulse-glow-cyan" />
                </div>
                <h4 className="font-space font-extrabold text-sm text-slate-200 mt-4 uppercase">
                  Hyderabad, India
                </h4>
                <p className="text-[9px] font-mono text-slate-500 mt-1">
                  SEC: 17.3850 N // 78.4867 E
                </p>
              </div>

              <div className="text-[9px] font-mono text-slate-500 border-t border-white/5 pt-3 relative z-10 text-center">
                GLOBAL COMMUNICATOR PORTAL LINKED
              </div>
            </div>

          </div>

          {/* Right panel: Futuristic Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 md:p-10 rounded-3xl border-white/5 bg-slate-950/40 relative h-full flex flex-col justify-between">
              
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/2 rounded-full blur-3xl pointer-events-none" />

              <div className="border-b border-white/5 pb-4 mb-6">
                <h3 className="text-lg font-space font-extrabold text-white">
                  Send Quantum Message
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  All messages are routed securely and processed within 24 hours.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-5 flex-grow">
                    
                    {/* Name input */}
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-4 bg-slate-950/60 border border-white/5 rounded-2xl focus:border-primary/60 outline-none text-slate-100 text-sm font-space transition-all duration-300 placeholder:text-slate-600 focus:shadow-[0_0_15px_rgba(0,245,255,0.05)] focus:scale-[1.01]"
                        placeholder="Your full name"
                      />
                    </div>

                    {/* Email input */}
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-4 bg-slate-950/60 border border-white/5 rounded-2xl focus:border-primary/60 outline-none text-slate-100 text-sm font-space transition-all duration-300 placeholder:text-slate-600 focus:shadow-[0_0_15px_rgba(0,245,255,0.05)] focus:scale-[1.01]"
                        placeholder="Your email address"
                      />
                    </div>

                    {/* Message input */}
                    <div className="relative">
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-5 py-4 bg-slate-950/60 border border-white/5 rounded-2xl focus:border-primary/60 outline-none text-slate-100 text-sm font-space transition-all duration-300 placeholder:text-slate-600 focus:shadow-[0_0_15px_rgba(0,245,255,0.05)] focus:scale-[1.01] resize-none"
                        placeholder="Write your message here..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/95 hover:to-accent/95 text-slate-950 font-space font-extrabold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(0,245,255,0.15)] hover:shadow-[0_0_30px_rgba(123,97,255,0.3)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          ROUTING_TRANSMISSION...
                        </>
                      ) : (
                        <>
                          Transmit Message <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center flex-grow"
                  >
                    <CheckCircle className="w-16 h-16 text-accent animate-bounce" />
                    <h4 className="text-lg font-space font-extrabold text-white mt-5 uppercase">
                      Transmission Confirmed
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
                      Your packet has been successfully sent across the fiber channel. S.Chintapalli will sync back shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
