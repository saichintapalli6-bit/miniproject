"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu } from "lucide-react";

// Import Layout & Cursor Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

// Import Portfolio Sections
import Hero from "@/components/Sections/Hero";
import About from "@/components/Sections/About";
import Skills from "@/components/Sections/Skills";
import Experience from "@/components/Sections/Experience";
import Projects from "@/components/Sections/Projects";
import Certifications from "@/components/Sections/Certifications";
import Education from "@/components/Sections/Education";
import GitHubAndStats from "@/components/Sections/GitHubAndStats";
import Testimonials from "@/components/Sections/Testimonials";
import Contact from "@/components/Sections/Contact";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadStatus, setLoadStatus] = useState("INIT_CORE_SYSTEM");

  // Loading screen progress simulation
  useEffect(() => {
    const statuses = [
      "BOOT_SECTOR_RESOLVING... [OK]",
      "GL_SHADERS_COMPILING... [OK]",
      "3D_PARTICLES_ALLOCATING... [OK]",
      "DATABASE_MIDDLEWARE_SYNCING... [OK]",
      "SAI_SANTOSH_PORTFOLIO_LOADED. [READY]",
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 4;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        setLoadStatus(statuses[statuses.length - 1]);
        clearInterval(interval);
        setTimeout(() => setLoading(false), 800);
      } else {
        // Update status lines based on progress
        const idx = Math.min(
          Math.floor((currentProgress / 100) * statuses.length),
          statuses.length - 2
        );
        setLoadStatus(statuses[idx]);
      }
      setLoadProgress(currentProgress);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          /* Cinematic Hacker System Loader */
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#050816] flex flex-col items-center justify-center p-6 cursor-none"
          >
            {/* Holographic Glowing Ring */}
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 rounded-full border-2 border-primary/20 border-t-primary shadow-[0_0_15px_rgba(0,245,255,0.2)]"
              />
              <Cpu className="w-8 h-8 text-primary absolute animate-pulse" />
            </div>

            {/* Title / Name */}
            <h2 className="font-space font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mt-8 tracking-widest text-sm uppercase">
              CHINTAPALLI VENKATA SAI SANTOSH
            </h2>

            {/* Progress Bar Container */}
            <div className="w-64 h-1.5 bg-slate-900 border border-white/5 rounded-full overflow-hidden mt-6 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            {/* Load HUD Logs */}
            <div className="mt-4 flex flex-col items-center gap-1.5 font-mono text-[9px] text-slate-500 tracking-wider text-center max-w-xs">
              <span className="text-primary font-bold">{loadProgress}% COMPLETE</span>
              <span className="text-[10px] text-slate-400 mt-1 uppercase">{loadStatus}</span>
            </div>
          </motion.div>
        ) : (
          /* Main Portfolio Workspace */
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <CustomCursor />
            <Navbar />
            
            <SmoothScroll>
              <main className="relative z-10 w-full flex flex-col">
                <Hero />
                <div className="section-divider" />
                <About />
                <div className="section-divider" />
                <Skills />
                <div className="section-divider" />
                <Experience />
                <div className="section-divider" />
                <Projects />
                <div className="section-divider" />
                <Certifications />
                <div className="section-divider" />
                <Education />
                <div className="section-divider" />
                <GitHubAndStats />
                <div className="section-divider" />
                <Testimonials />
                <div className="section-divider" />
                <Contact />
              </main>
              
              <Footer />
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
