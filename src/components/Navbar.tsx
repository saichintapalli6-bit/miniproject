"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu } from "lucide-react";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSystemActive, setIsSystemActive] = useState(true);

  // Monitor scroll for progress and active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }

      // Check active section
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-bg-dark z-50 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
          style={{ scaleX: scrollProgress, transformOrigin: "0%" }}
        />
      </div>

      {/* Main Navbar */}
      <header className="fixed top-4 left-0 right-0 z-40 px-4 md:px-8">
        <nav className="max-w-6xl mx-auto flex items-center justify-between py-3 px-6 rounded-full glass-panel border-white/5 backdrop-blur-md">
          {/* Logo */}
          <div 
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 cursor-pointer group text-slate-100 font-space font-bold tracking-wider"
          >
            <div className="relative w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center border border-primary/30 group-hover:border-primary group-hover:shadow-[0_0_10px_rgba(0,245,255,0.4)] transition-all">
              <Cpu className="w-4 h-4 text-primary group-hover:text-accent transition-colors" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent">
                S.CHINTAPALLI
              </span>
              <span className="text-[9px] text-slate-400 font-mono tracking-widest leading-none">
                SYS: ACTIVE
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-space font-medium tracking-wide uppercase transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-primary glow-text-cyan font-bold"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute inset-0 bg-white/5 rounded-full border border-primary/20 shadow-[inset_0_0_8px_rgba(0,245,255,0.1)] -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            ))}
          </div>

          {/* Holographic Toggle & Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSystemActive(!isSystemActive)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono transition-all ${
                isSystemActive
                  ? "bg-accent/10 border-accent/30 text-accent shadow-[0_0_8px_rgba(0,255,163,0.2)]"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isSystemActive ? "bg-accent pulse-glow-cyan" : "bg-red-400"}`} />
              {isSystemActive ? "3D_ENGINE_ON" : "3D_ENGINE_OFF"}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full hover:bg-white/5 border border-white/10 text-slate-300 hover:text-slate-100 transition-all"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 left-4 right-4 z-30 p-4 rounded-3xl glass-panel border-white/5 backdrop-blur-lg flex flex-col gap-2 md:hidden"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-space text-sm tracking-widest uppercase transition-all ${
                    activeSection === item.id
                      ? "bg-primary/10 border-l-2 border-primary text-primary font-bold pl-5 shadow-[inset_0_0_10px_rgba(0,245,255,0.05)]"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
