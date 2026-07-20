"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Code2, Database, Workflow, Award } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ value, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);

    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-space font-extrabold text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: <GraduationCap className="w-5 h-5 text-primary" />,
      title: "MCA Post Graduate",
      desc: "Completed Master of Computer Applications, establishing deep theoretical and mathematical foundations in software engineering and algorithms.",
    },
    {
      icon: <Code2 className="w-5 h-5 text-accent" />,
      title: "Python & React Developer",
      desc: "Bridging the gap between sleek frontends and modular backends. Fluent in full-stack architecture with Flask, Django, Node, and Next.js.",
    },
    {
      icon: <Database className="w-5 h-5 text-secondary" />,
      title: "ML & Data Analyst",
      desc: "Developing predictive intelligence pipelines, cleaning large datasets, training models (XGBoost, TensorFlow), and visualising in Power BI.",
    },
  ];

  const highlights = [
    "MCA Graduate",
    "Python Developer",
    "React Developer",
    "Machine Learning",
    "Blockchain",
    "Power BI",
    "REST APIs",
    "Data Structures",
  ];

  return (
    <section id="about" className="min-h-screen w-full flex items-center justify-center py-20 px-6 md:px-12 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full" ref={containerRef}>
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isContainerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono text-secondary tracking-widest uppercase border border-secondary/20 px-3 py-1 rounded-full bg-secondary/5"
          >
            01_IDENTIFICATION
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-space font-extrabold text-white mt-4 tracking-tight"
          >
            ABOUT THE DEVELOPER
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Narrative & Highlights grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Text and Tags (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg font-space font-bold text-slate-200"
              >
                CHINTAPALLI VENKATA SAI SANTOSH
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-sm text-slate-400 mt-4 leading-relaxed"
              >
                I am a highly motivated MCA post-graduate with a multi-disciplinary technical background. My skillset crosses software engineering layers, from deploying responsive UI layers in React and Next.js, to constructing robust python servers, querying relational/NoSQL backends, and scaling artificial intelligence scripts.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-sm text-slate-400 mt-4 leading-relaxed"
              >
                My projects reflect this polyglot agility—featuring decentralized authentication modules on blockchain, automated procurement pipelines, and vision models that classify species with high accuracy.
              </motion.p>
            </div>

            {/* Area Highlights */}
            <div className="mt-8">
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Core_Competencies</h4>
              <div className="flex flex-wrap gap-2">
                {highlights.map((tag, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isContainerInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                    className="text-xs font-mono px-3.5 py-1.5 rounded-full border border-white/5 bg-white/2 hover:border-primary/30 hover:bg-primary/5 text-slate-300 hover:text-primary transition-all duration-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Core Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={isContainerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
                className="p-5 rounded-2xl glass-panel relative overflow-hidden"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/3 border border-white/10 flex items-center justify-center shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-space font-bold text-slate-100">{card.title}</h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-5 rounded-2xl glass-panel text-center flex flex-col justify-center items-center glow-card"
          >
            <AnimatedCounter value={6} suffix="+" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-2.5">
              Projects Completed
            </span>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-5 rounded-2xl glass-panel text-center flex flex-col justify-center items-center glow-card"
          >
            <AnimatedCounter value={2} suffix="" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-2.5">
              Internships
            </span>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-5 rounded-2xl glass-panel text-center flex flex-col justify-center items-center glow-card"
          >
            <AnimatedCounter value={10} suffix="+" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-2.5">
              Core Technologies
            </span>
          </motion.div>

          {/* Stat 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-5 rounded-2xl glass-panel text-center flex flex-col justify-center items-center glow-card"
          >
            <AnimatedCounter value={25000} suffix="+" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-2.5">
              Rows Processed
            </span>
          </motion.div>

          {/* Stat 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="col-span-2 md:col-span-1 p-5 rounded-2xl glass-panel text-center flex flex-col justify-center items-center glow-card"
          >
            <AnimatedCounter value={96} suffix="%" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-2.5">
              Max Model Accuracy
            </span>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
