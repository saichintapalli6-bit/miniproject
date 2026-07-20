"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  color: string;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const testimonials: Testimonial[] = [
    {
      quote: "Sai Santosh possesses a rare combination of raw analytical intellect and system developer pragmatism. He reorganized our legacy pandas workflows, integrating them into robust predictive pipelines in record time.",
      author: "Sarah Jenkins",
      role: "Senior Machine Learning Lead",
      company: "Analytics Nexus Corp",
      color: "from-primary/20 to-transparent",
    },
    {
      quote: "Throughout his Master's project cohorts, Sai Santosh demonstrated an advanced grasp of distributed systems. His blockchain vehicle ledger setup established a notable academic reference for Solidity architectures.",
      author: "Dr. Ramesh Krishnan",
      role: "Department Coordinator (MCA)",
      company: "Technical University",
      color: "from-secondary/20 to-transparent",
    },
    {
      quote: "His React components are clean, well-structured, and focus heavily on responsive efficiency. A highly agile developer who adapts to diverse full-stack layers with complete confidence.",
      author: "David Vance",
      role: "Senior Full Stack Architect",
      company: "CloudVibe Platforms",
      color: "from-accent/20 to-transparent",
    },
  ];

  // Auto sliding timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="min-h-screen w-full flex items-center justify-center py-20 px-6 md:px-12 bg-transparent relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full" ref={containerRef}>
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono text-secondary tracking-widest uppercase border border-secondary/20 px-3 py-1 rounded-full bg-secondary/5"
          >
            08_ENDORSEMENTS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-space font-extrabold text-white mt-4 tracking-tight"
          >
            COLLABORATOR FEEDBACK
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[280px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden bg-slate-950/30 border-white/5 w-full"
            >
              {/* Backglow glow blob */}
              <div className={`absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-gradient-to-br ${testimonials[activeIndex].color} blur-3xl pointer-events-none`} />

              <Quote className="w-10 h-10 text-primary/20 mb-6" />
              
              <blockquote className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed font-space">
                "{testimonials[activeIndex].quote}"
              </blockquote>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5 relative z-10">
                <div>
                  <h4 className="font-space font-extrabold text-sm text-slate-100">
                    {testimonials[activeIndex].author}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-400 mt-1 uppercase tracking-wider">
                    {testimonials[activeIndex].role} // <span className="text-primary font-bold">{testimonials[activeIndex].company}</span>
                  </p>
                </div>

                {/* Slider Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-full border border-white/10 hover:border-primary/50 bg-white/3 hover:bg-primary/10 flex items-center justify-center text-slate-400 hover:text-primary transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-9 h-9 rounded-full border border-white/10 hover:border-primary/50 bg-white/3 hover:bg-primary/10 flex items-center justify-center text-slate-400 hover:text-primary transition-all duration-300"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Carousel Bullet Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-8 bg-primary shadow-[0_0_8px_rgba(0,245,255,0.5)]" : "bg-slate-800 hover:bg-slate-700"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
