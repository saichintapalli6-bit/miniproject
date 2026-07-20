"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Award, BookOpen, Star } from "lucide-react";

interface EducationItem {
  degree: string;
  major: string;
  school: string;
  period: string;
  grade: string;
  gradeLabel: string;
  courses: string[];
  achievements: string[];
}

export default function Education() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const educationList: EducationItem[] = [
    {
      degree: "Master of Computer Applications (MCA)",
      major: "Computer Science & Engineering Subsystems",
      school: "State University Institution",
      period: "2023 - 2025",
      grade: "8.8 / 10.0",
      gradeLabel: "CGPA",
      courses: [
        "Advanced Data Structures",
        "Design & Analysis of Algorithms",
        "Machine Learning Pipelines",
        "Relational & NoSQL Databases",
        "Distributed Web Architectures",
        "Cryptography & Networks",
      ],
      achievements: [
        "Ranked in the top 5% of the computer science department cohorts.",
        "Engineered the Smart Vehicle Procurement blockchain contract as a final year thesis.",
        "Awarded best design presentation in the annual academic project symposium.",
      ],
    },
    {
      degree: "Bachelor of Science (B.Sc)",
      major: "Computer Science, Mathematics & Physics",
      school: "Affiliated Science College",
      period: "2020 - 2023",
      grade: "9.2 / 10.0",
      gradeLabel: "CGPA",
      courses: [
        "Programming in Python & Java",
        "Object Oriented System Design",
        "Numerical Methods & Calculus",
        "Statistical Models & Probability",
        "Data Structures & Core C",
      ],
      achievements: [
        "Received Merit Scholarship for academic excellence across three consecutive terms.",
        "Led the student developer cell, organizing hackathons and workshops.",
      ],
    },
  ];

  return (
    <section id="education" className="min-h-screen w-full flex items-center justify-center py-20 px-6 md:px-12 bg-transparent relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full" ref={containerRef}>
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono text-primary tracking-widest uppercase border border-primary/20 px-3 py-1 rounded-full bg-primary/5"
          >
            06_EDUCATION
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-space font-extrabold text-white mt-4 tracking-tight"
          >
            ACADEMIC ACQUISITIONS
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Education Timeline */}
        <div className="space-y-12">
          {educationList.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden"
            >
              {/* Backglow glow blobs */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-white/5 pb-5 mb-5">
                
                {/* Degree & School details */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/3 border border-white/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5.5 h-5.5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-space font-extrabold text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-xs md:text-sm font-mono text-slate-400 mt-1">
                      {edu.major} // <span className="text-slate-300 font-semibold">{edu.school}</span>
                    </p>
                    <span className="inline-block text-[10px] font-mono text-slate-500 mt-2 bg-white/2 border border-white/5 py-0.5 px-2.5 rounded-full">
                      {edu.period}
                    </span>
                  </div>
                </div>

                {/* Score badge */}
                <div className="flex flex-col items-start md:items-end bg-primary/5 border border-primary/20 rounded-2xl p-4 shrink-0 self-start md:self-auto">
                  <span className="text-[9px] font-mono text-primary uppercase tracking-widest">{edu.gradeLabel}</span>
                  <span className="text-xl font-space font-extrabold text-white mt-1">
                    {edu.grade}
                  </span>
                </div>

              </div>

              {/* Grid content inside card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left: Highlight Courses (5 cols) */}
                <div className="md:col-span-5">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-secondary" /> CORE_CURRICULUM:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.courses.map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/2 border border-white/5 text-slate-300"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Honors & Achievements (7 cols) */}
                <div className="md:col-span-7">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 text-accent" /> KEY_HONORS:
                  </h4>
                  <ul className="space-y-3">
                    {edu.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start text-xs md:text-sm text-slate-300 leading-relaxed">
                        <span className="text-accent mr-2.5 mt-0.5 font-mono">»</span>
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
