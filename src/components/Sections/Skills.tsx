"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Terminal, Database, ShieldCheck, PenTool } from "lucide-react";

interface SkillItem {
  name: string;
  level: string; // e.g. Advanced, Intermediate
  color: "cyan" | "purple" | "green" | "gold";
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const categories: SkillCategory[] = [
    {
      title: "Languages",
      icon: <Terminal className="w-4.5 h-4.5 text-primary" />,
      skills: [
        { name: "Python", level: "Advanced", color: "cyan" },
        { name: "JavaScript", level: "Advanced", color: "cyan" },
        { name: "Java", level: "Intermediate", color: "purple" },
        { name: "C Language", level: "Intermediate", color: "purple" },
        { name: "HTML5", level: "Advanced", color: "green" },
        { name: "CSS3", level: "Advanced", color: "green" },
      ],
    },
    {
      title: "Frameworks & Libraries",
      icon: <Cpu className="w-4.5 h-4.5 text-secondary" />,
      skills: [
        { name: "React / Next.js", level: "Advanced", color: "cyan" },
        { name: "Node.js", level: "Advanced", color: "cyan" },
        { name: "Express.js", level: "Advanced", color: "cyan" },
        { name: "Django", level: "Intermediate", color: "purple" },
        { name: "Flask", level: "Advanced", color: "cyan" },
        { name: "React Native", level: "Intermediate", color: "purple" },
        { name: "Redux", level: "Intermediate", color: "green" },
      ],
    },
    {
      title: "Databases & AI/ML",
      icon: <Database className="w-4.5 h-4.5 text-accent" />,
      skills: [
        { name: "TensorFlow", level: "Intermediate", color: "green" },
        { name: "Scikit-Learn", level: "Advanced", color: "cyan" },
        { name: "XGBoost", level: "Advanced", color: "cyan" },
        { name: "Pandas", level: "Advanced", color: "cyan" },
        { name: "NumPy", level: "Advanced", color: "cyan" },
        { name: "Power BI", level: "Advanced", color: "green" },
        { name: "MongoDB", level: "Advanced", color: "cyan" },
        { name: "MySQL", level: "Advanced", color: "cyan" },
        { name: "SQL Server", level: "Intermediate", color: "purple" },
      ],
    },
    {
      title: "Tools & OS",
      icon: <PenTool className="w-4.5 h-4.5 text-slate-400" />,
      skills: [
        { name: "Git", level: "Advanced", color: "cyan" },
        { name: "GitHub", level: "Advanced", color: "cyan" },
        { name: "VS Code", level: "Advanced", color: "cyan" },
        { name: "Linux OS", level: "Intermediate", color: "purple" },
        { name: "Figma", level: "Intermediate", color: "green" },
        { name: "Jupyter Notebook", level: "Advanced", color: "cyan" },
      ],
    },
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case "cyan":
        return "border-primary/20 hover:border-primary/50 text-primary shadow-[0_0_15px_rgba(0,245,255,0.02)] hover:shadow-[0_0_20px_rgba(0,245,255,0.15)]";
      case "purple":
        return "border-secondary/20 hover:border-secondary/50 text-secondary shadow-[0_0_15px_rgba(123,97,255,0.02)] hover:shadow-[0_0_20px_rgba(123,97,255,0.15)]";
      case "green":
        return "border-accent/20 hover:border-accent/50 text-accent shadow-[0_0_15px_rgba(0,255,163,0.02)] hover:shadow-[0_0_20px_rgba(0,255,163,0.15)]";
      default:
        return "border-white/10 hover:border-white/30 text-white";
    }
  };

  const getOrbGradient = (color: string) => {
    switch (color) {
      case "cyan":
        return "from-primary/20 via-primary/5 to-transparent";
      case "purple":
        return "from-secondary/20 via-secondary/5 to-transparent";
      case "green":
        return "from-accent/20 via-accent/5 to-transparent";
      default:
        return "from-white/10 to-transparent";
    }
  };

  return (
    <section id="skills" className="min-h-screen w-full flex items-center justify-center py-20 px-6 md:px-12 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full" ref={containerRef}>
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono text-accent tracking-widest uppercase border border-accent/20 px-3 py-1 rounded-full bg-accent/5"
          >
            02_CAPABILITIES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-space font-extrabold text-white mt-4 tracking-tight"
          >
            TECHNICAL ARCHITECTURE
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mt-4 rounded-full" />
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-space font-semibold tracking-wide uppercase transition-all duration-300 ${
                activeTab === idx
                  ? "bg-slate-900 border border-primary/40 text-primary glow-text-cyan shadow-[0_0_15px_rgba(0,245,255,0.1)]"
                  : "bg-white/2 border border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              {category.icon}
              {category.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {categories[activeTab].skills.map((skill, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className={`relative overflow-hidden p-5 rounded-2xl glass-panel border flex flex-col justify-between h-36 ${getColorClass(
                skill.color
              )} group`}
            >
              {/* Backglow Animated Sphere */}
              <div
                className={`absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-gradient-to-br ${getOrbGradient(
                  skill.color
                )} blur-md group-hover:scale-125 transition-transform duration-500`}
              />

              {/* Holographic Wireframe Grid inside Card */}
              <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

              <div className="relative z-10 flex flex-col justify-between h-full">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest leading-none">
                  SYS: STABLE
                </span>
                
                <div>
                  <h3 className="font-space font-extrabold text-base tracking-wide text-slate-100 group-hover:text-white mt-4">
                    {skill.name}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-wider">
                    {skill.level}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
