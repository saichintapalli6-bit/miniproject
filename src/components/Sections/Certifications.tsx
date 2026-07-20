"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ShieldAlert, Cpu, Database, Network } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  credId: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

export default function Certifications() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const certs: Certificate[] = [
    {
      title: "Python for Data Science",
      issuer: "IBM Cognitive Class",
      year: "2024",
      credId: "IBM-PYDS-9284",
      icon: <Database className="w-5 h-5 text-[#00F5FF]" />,
      skills: ["Data cleansing", "Pandas", "NumPy", "Data wrangling"],
      color: "from-primary/20 via-primary/5 to-transparent",
    },
    {
      title: "Machine Learning with Python",
      issuer: "IBM Cognitive Class",
      year: "2024",
      credId: "IBM-MLPY-7153",
      icon: <Cpu className="w-5 h-5 text-[#00FFA3]" />,
      skills: ["Supervised ML", "Classifiers", "Regression Trees", "Clustering"],
      color: "from-accent/20 via-accent/5 to-transparent",
    },
    {
      title: "Data Analysis with Python",
      issuer: "IBM Cognitive Class",
      year: "2024",
      credId: "IBM-DAPY-8461",
      icon: <Award className="w-5 h-5 text-[#7B61FF]" />,
      skills: ["Model evaluation", "Pipelines", "Feature scaling", "SciPy"],
      color: "from-secondary/20 via-secondary/5 to-transparent",
    },
    {
      title: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      year: "2023",
      credId: "CSCO-SEC-3329",
      icon: <ShieldAlert className="w-5 h-5 text-red-400" />,
      skills: ["Threat analysis", "Vulnerability testing", "Firewalls", "Cryptology"],
      color: "from-red-500/20 via-red-500/5 to-transparent",
    },
  ];

  return (
    <section id="certifications" className="min-h-screen w-full flex flex-col justify-center items-center py-20 px-6 md:px-12 bg-transparent relative overflow-hidden">
      {/* 3D card flipping CSS injection */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-container {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }
        .perspective-container:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 1.5rem;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}} />

      <div className="max-w-6xl mx-auto w-full" ref={containerRef}>
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono text-accent tracking-widest uppercase border border-accent/20 px-3 py-1 rounded-full bg-accent/5"
          >
            05_VERIFICATION
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-space font-extrabold text-white mt-4 tracking-tight"
          >
            CREDENTIALS & CERTIFICATIONS
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mt-4 rounded-full" />
        </div>

        {/* Certificate flip grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="perspective-container h-60 w-full cursor-pointer"
            >
              <div className="flip-card-inner">
                
                {/* Front Side */}
                <div className="flip-card-front glass-panel border-white/5 bg-slate-950/40 p-6 flex flex-col justify-between overflow-hidden">
                  {/* Decorative glowing backdrops */}
                  <div className={`absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-gradient-to-br ${cert.color} blur-xl`} />

                  <div className="flex items-center justify-between relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/3 border border-white/10 flex items-center justify-center">
                      {cert.icon}
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                      {cert.year}
                    </span>
                  </div>

                  <div className="relative z-10 mt-6">
                    <h3 className="font-space font-bold text-sm text-slate-100 leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-[10px] font-mono text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-semibold mt-2.5">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="relative z-10 text-[9px] font-mono text-slate-500 mt-4 border-t border-white/5 pt-3">
                    HOVER TO FLIP CREDENTIAL
                  </div>
                </div>

                {/* Back Side */}
                <div className="flip-card-back glass-panel border-primary/20 bg-slate-900/90 p-6 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[10px] font-mono text-primary uppercase tracking-widest">
                      Verified_Skills:
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 border-t border-white/5 pt-3">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-slate-500 uppercase">Cred_ID:</span>
                      <span className="text-[10px] font-mono text-slate-300 font-bold mt-0.5">
                        {cert.credId}
                      </span>
                    </div>
                    
                    <a
                      href="https://github.com/saichintapalli6-bit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[9px] font-mono text-accent hover:text-white mt-4 transition-all"
                    >
                      VERIFY_ONLINE_RECORD {"->"}
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
