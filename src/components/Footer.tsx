"use client";

import { motion } from "framer-motion";
import { ArrowUp, Mail, Code } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-[#050816] pt-20 pb-10 border-t border-white/5">
      {/* Animated waves background using SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none opacity-20 h-40">
        <svg
          className="relative block w-full h-full"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-secondary/30"
          ></path>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Developer Tag */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-primary/20 flex items-center justify-center">
            <Code className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-space font-bold tracking-wider text-slate-100 uppercase">
              CHINTAPALLI VENKATA SAI SANTOSH
            </h4>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Portfolio.System // Built in 2026
            </p>
          </div>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/saichintapalli6-bit"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/10 hover:border-primary/50 bg-white/3 hover:bg-primary/10 flex items-center justify-center text-slate-400 hover:text-primary transition-all duration-300"
          >
            <FaGithub className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/sai-santosh-chintapalli"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/10 hover:border-secondary/50 bg-white/3 hover:bg-secondary/10 flex items-center justify-center text-slate-400 hover:text-secondary transition-all duration-300"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:saichintapalli6@gmail.com"
            className="w-10 h-10 rounded-full border border-white/10 hover:border-accent/50 bg-white/3 hover:bg-accent/10 flex items-center justify-center text-slate-400 hover:text-accent transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right Side: Back to Top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/20 hover:border-primary/50 bg-primary/5 hover:bg-primary/15 text-primary text-xs font-space font-medium tracking-wide uppercase transition-all shadow-[0_0_15px_rgba(0,245,255,0.02)]"
        >
          Back to Top <ArrowUp className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Underline Details */}
      <div className="max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-4">
        <div>
          &copy; {currentYear} S.CHINTAPALLI. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-4">
          <span className="hover:text-slate-400 cursor-pointer">PRIVACY_POLICY</span>
          <span className="hover:text-slate-400 cursor-pointer">TERMS_OF_SERVICE</span>
          <span className="text-accent/60">SYS_STATUS_NOMINAL</span>
        </div>
      </div>
    </footer>
  );
}
