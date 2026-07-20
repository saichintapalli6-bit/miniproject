"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch, Star, GitFork, ArrowUpRight, LineChart } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface Repo {
  name: string;
  desc: string;
  lang: string;
  langColor: string;
  stars: number;
  forks: number;
  commits: number;
}

export default function GitHubAndStats() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  // Generate 53 weeks * 7 days of mock contributions
  const contributions = useMemo(() => {
    const list = [];
    const baseDate = new Date(2025, 0, 1);
    
    for (let i = 0; i < 364; i++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + i);
      
      // Randomize commits: weekends have lower, weekdays have higher
      const dayOfWeek = currentDate.getDay();
      let level = 0; // 0: none, 1: low, 2: mid, 3: high
      const rand = Math.random();

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        if (rand > 0.8) level = 1;
        else if (rand > 0.95) level = 2;
      } else {
        if (rand > 0.85) level = 3;
        else if (rand > 0.5) level = 2;
        else if (rand > 0.2) level = 1;
      }

      list.push({
        date: currentDate.toISOString().split("T")[0],
        count: level === 0 ? 0 : level === 1 ? Math.floor(Math.random() * 3) + 1 : level === 2 ? Math.floor(Math.random() * 5) + 4 : Math.floor(Math.random() * 8) + 9,
        level,
      });
    }
    return list;
  }, []);

  const repos: Repo[] = [
    {
      name: "multi-level-auth",
      desc: "Robust biometric authorization gateway built with WebAuthn & Express tokens.",
      lang: "TypeScript",
      langColor: "bg-blue-500",
      stars: 48,
      forks: 12,
      commits: 114,
    },
    {
      name: "smart-procurement-ledger",
      desc: "Contract procurement system using Solidity and off-chain caching schemas.",
      lang: "Solidity",
      langColor: "bg-indigo-500",
      stars: 39,
      forks: 9,
      commits: 86,
    },
    {
      name: "vision-classifier-ai",
      desc: "ResNet50 visual classification server designed with TensorFlow & OpenCV.",
      lang: "Python",
      langColor: "bg-yellow-500",
      stars: 52,
      forks: 17,
      commits: 142,
    },
  ];

  return (
    <section id="github" className="min-h-screen w-full flex items-center justify-center py-20 px-6 md:px-12 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full" ref={containerRef}>
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono text-primary tracking-widest uppercase border border-primary/20 px-3 py-1 rounded-full bg-primary/5"
          >
            07_INTEGRATION
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-space font-extrabold text-white mt-4 tracking-tight"
          >
            GITHUB CODE METRICS
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Simulated Git Contribution Graph & Commit Graph (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Git contribution grid */}
            <div className="glass-panel p-5 md:p-6 rounded-3xl relative overflow-hidden bg-slate-950/20">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <FaGithub className="w-4.5 h-4.5 text-primary" />
                  <span className="text-xs font-space font-bold text-slate-200">
                    saichintapalli6-bit / CONTRIBUTIONS
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  364_DAYS_SYNCED // TOTAL: 1,284 COMMITS
                </span>
              </div>

              {/* Grid block container */}
              <div className="overflow-x-auto w-full pb-2">
                <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[700px]">
                  {contributions.map((day, idx) => {
                    let bgCol = "bg-slate-900";
                    if (day.level === 1) bgCol = "bg-primary/20 hover:bg-primary/45 border border-primary/20";
                    if (day.level === 2) bgCol = "bg-primary/50 hover:bg-primary/70 border border-primary/30";
                    if (day.level === 3) bgCol = "bg-primary hover:bg-primary glow-text-cyan shadow-[0_0_8px_rgba(0,245,255,0.4)]";

                    return (
                      <div
                        key={idx}
                        className={`w-2.5 h-2.5 rounded-sm transition-all duration-100 ${bgCol} cursor-pointer`}
                        onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Status display HUD */}
              <div className="flex items-center justify-between mt-4 text-[10px] font-mono text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-900" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-primary/20" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-primary/50" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-primary" />
                  <span>More</span>
                </div>
                
                <div className="h-4 flex items-center">
                  {hoveredDay ? (
                    <span className="text-primary font-bold">
                      {hoveredDay.count} commits on {hoveredDay.date}
                    </span>
                  ) : (
                    <span>Hover squares to verify logs</span>
                  )}
                </div>
              </div>
            </div>

            {/* Commit Frequency Activity Chart */}
            <div className="glass-panel p-5 md:p-6 rounded-3xl bg-slate-950/20">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <LineChart className="w-4.5 h-4.5 text-accent" />
                  <span className="text-xs font-space font-bold text-slate-200">
                    WEEKLY COMMIT FREQUENCY
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  SYSTEM_LOAD // JAN_2025 - JUN_2025
                </span>
              </div>

              {/* SVG line graph */}
              <div className="relative h-44 w-full">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00F5FF" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                  {/* Filled Area */}
                  <path
                    d="M 0 100 L 0 80 Q 50 30 100 65 T 200 15 T 300 45 T 400 20 T 500 35 L 500 100 Z"
                    fill="url(#chartGradient)"
                  />

                  {/* Glowing Line Path */}
                  <path
                    d="M 0 80 Q 50 30 100 65 T 200 15 T 300 45 T 400 20 T 500 35"
                    fill="none"
                    stroke="#00F5FF"
                    strokeWidth="2.5"
                    className="drop-shadow-[0_0_6px_rgba(0,245,255,0.6)]"
                  />
                  
                  {/* Interactive Nodes */}
                  <circle cx="100" cy="65" r="3" fill="#00FFA3" />
                  <circle cx="200" cy="15" r="3" fill="#00FFA3" />
                  <circle cx="300" cy="45" r="3" fill="#00FFA3" />
                  <circle cx="400" cy="20" r="3" fill="#00FFA3" />
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between mt-3 text-[9px] font-mono text-slate-500 uppercase">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right panel: Repository list (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {repos.map((repo, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 6 }}
                className="glass-panel p-5 rounded-2xl border-white/5 bg-slate-950/40 relative flex flex-col justify-between h-44 hover:border-slate-800 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5" /> main
                    </span>
                    <a
                      href="https://github.com/saichintapalli6-bit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-primary transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                  
                  <h3 className="text-sm font-space font-extrabold text-white mt-3 hover:text-primary transition-colors cursor-pointer">
                    {repo.name}
                  </h3>
                  
                  <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed line-clamp-2">
                    {repo.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-4 text-[10px] font-mono text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${repo.langColor}`} />
                      {repo.lang}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" /> {repo.forks}
                    </span>
                  </div>
                  
                  <span>
                    {repo.commits} commits
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

import { useMemo } from "react";
