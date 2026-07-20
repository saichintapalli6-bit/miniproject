"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, BarChart4, Code2, Calendar } from "lucide-react";

interface TimelineItem {
  role: string;
  company: string;
  period: string;
  icon: React.ReactNode;
  color: "cyan" | "purple";
  bullets: string[];
  metrics: { label: string; value: string }[];
}

export default function Experience() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const experienceData: TimelineItem[] = [
    {
      role: "Power BI Analyst Intern",
      company: "Advanced Analytics Corporation",
      period: "June 2025 - August 2025",
      icon: <BarChart4 className="w-5 h-5 text-primary" />,
      color: "cyan",
      bullets: [
        "Architected interactive executive dashboards to track real-time operational KPIs and performance metrics.",
        "Created automatic ETL pipelines using Python (Pandas & NumPy) to extract, sanitize, and load transactional records from SQL databases.",
        "Engineered complex DAX calculations to support dynamic rolling projections and multi-factor analytical graphs.",
        "Collaborated with data teams to optimize query schemas, leading to a 45% reduction in dashboard load times.",
      ],
      metrics: [
        { label: "Dashboard Speedup", value: "45%" },
        { label: "Data Records Handled", value: "10K+" },
      ],
    },
    {
      role: "Python Developer Intern",
      company: "FutureWeb Technologies",
      period: "December 2024 - February 2025",
      icon: <Code2 className="w-5 h-5 text-secondary" />,
      color: "purple",
      bullets: [
        "Developed and maintained modular REST API endpoints using Flask and Django frameworks.",
        "Integrated custom Machine Learning predictive engines (built with Scikit-Learn) into live backend logic.",
        "Designed database models and optimized SQL statements, leading to faster data retrievals inside MySQL datasets.",
        "Leveraged advanced data structures and algorithms to parse large batch logs, boosting automation efficiency by 30%.",
      ],
      metrics: [
        { label: "Execution Efficiency", value: "+30%" },
        { label: "REST APIs Built", value: "15+" },
      ],
    },
  ];

  return (
    <section id="experience" className="min-h-screen w-full flex items-center justify-center py-20 px-6 md:px-12 bg-transparent relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full" ref={containerRef}>
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono text-primary tracking-widest uppercase border border-primary/20 px-3 py-1 rounded-full bg-primary/5"
          >
            03_CHRONOLOGY
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-space font-extrabold text-white mt-4 tracking-tight"
          >
            PROFESSIONAL EXPERIENCE
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-6 pl-8 md:pl-10 space-y-12">
          
          {experienceData.map((item, idx) => {
            const isCyan = item.color === "cyan";
            const borderCol = isCyan ? "border-primary/40" : "border-secondary/40";
            const glowShadow = isCyan 
              ? "shadow-[0_0_15px_rgba(0,245,255,0.4)]" 
              : "shadow-[0_0_15px_rgba(123,97,255,0.4)]";

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative"
              >
                {/* Timeline checkpoint bubble */}
                <div className={`absolute -left-[53px] md:-left-[61px] top-1.5 w-11 h-11 rounded-full bg-bg-dark border-2 flex items-center justify-center z-10 transition-all duration-300 ${borderCol} ${glowShadow}`}>
                  {item.icon}
                </div>

                {/* Main Card */}
                <div className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden hover:border-slate-700/80 transition-all">
                  
                  {/* Grid layout for Roles and Period */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/5 pb-4 mb-5">
                    <div>
                      <h3 className="text-lg md:text-xl font-space font-extrabold text-white">
                        {item.role}
                      </h3>
                      <p className="text-xs md:text-sm font-mono text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-semibold mt-1">
                        {item.company}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/2 border border-white/5 py-1 px-3.5 rounded-full shrink-0 self-start md:self-center">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-3">
                    {item.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start text-xs md:text-sm text-slate-300 leading-relaxed">
                        <span className="text-primary mr-2.5 shrink-0 mt-1">::</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Highlight Metrics */}
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-white/5">
                    {item.metrics.map((metric, metricIdx) => (
                      <div key={metricIdx} className="bg-white/2 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                        <span className="text-xs text-slate-400 font-mono">{metric.label}</span>
                        <span className={`text-base font-space font-extrabold mt-1 text-${item.color}`}>
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
