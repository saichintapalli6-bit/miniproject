"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ShieldCheck, Truck, GraduationCap, Eye, Home } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface Project {
  title: string;
  category: string;
  desc: string;
  icon: React.ReactNode;
  tech: string[];
  features: string[];
  challenges: string[];
  architecture: string;
  metrics: { label: string; value: string }[];
  github: string;
  live: string;
  glowColor: string;
}

// 3D Tilt Card Wrapper Component
function TiltCard({ children, glowColor }: { children: React.ReactNode; glowColor: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shineX, setShineX] = useState(50);
  const [shineY, setShineY] = useState(50);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    // Convert coordinate to percentage
    const percentX = (x / box.width) * 100;
    const percentY = (y / box.height) * 100;

    // Calculate rotation angles (max tilt +/- 8 degrees)
    const angleX = (percentY - 50) * 0.16;
    const angleY = (50 - percentX) * 0.16;

    setRotateX(angleX);
    setRotateY(angleY);
    setShineX(percentX);
    setShineY(percentY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShineX(50);
    setShineY(50);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-3xl transition-transform duration-200 ease-out will-change-transform"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
      }}
    >
      {/* Light Shine Reflection */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none z-20 transition-opacity duration-300 opacity-0 hover:opacity-30"
        style={{
          background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
        }}
      />
      {/* Glow shadow based on project color */}
      <div 
        className="absolute -inset-1 rounded-3xl filter blur-xl opacity-0 hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${shineX}% ${shineY}%, ${glowColor} 0%, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeTabMap, setActiveTabMap] = useState<Record<number, "features" | "challenges" | "architecture">>({});

  const projectsData: Project[] = [
    {
      title: "Multi-Level Authentication System",
      category: "Full Stack & Cybersecurity",
      desc: "An enterprise-grade authorization engine implementing multi-factor verification keys, dynamic role permissions, and biometric login support.",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      tech: ["React.js", "Node.js", "Express", "MongoDB", "JWT", "WebAuthn"],
      features: [
        "Biometric fingerprint/face login using modern WebAuthn specifications.",
        "Dynamic session tracking and auto-revocation for anomalous access coordinates.",
        "Hierarchical admin control panel with granular ACL (Access Control List) routing."
      ],
      challenges: [
        "Syncing active JWT validation keys across multiple load-balanced nodes safely. Solved by writing high-speed cached key rings inside MongoDB.",
      ],
      architecture: "Client Web UI <-> Gateway Controller <-> Auth Microservices & DB Server",
      metrics: [
        { label: "MFA Token Handshake", value: "80ms" },
        { label: "Uptime SLA", value: "99.9%" }
      ],
      github: "https://github.com/saichintapalli6-bit",
      live: "https://github.com/saichintapalli6-bit",
      glowColor: "rgba(0, 245, 255, 0.4)",
    },
    {
      title: "Smart Vehicle Procurement System",
      category: "Blockchain & Enterprise Portal",
      desc: "A decentralized procurement network linking automotive vendors with buyers, featuring bidding audit trails and smart contract verification.",
      icon: <Truck className="w-6 h-6 text-secondary" />,
      tech: ["Next.js", "Django", "PostgreSQL", "Solidity", "EVM Ledger", "Tailwind"],
      features: [
        "Cryptographic ledger recording contract timestamps, bids, and delivery signs.",
        "Automatic procurement workflow matching bids using dynamic linear logic.",
        "Interactive dashboard displaying contract lifecycle status and dispatch maps."
      ],
      challenges: [
        "Reducing high Ethereum gas costs when writing procurement hashes. Resolved by batch-hashing items off-chain and anchoring values in a single transaction block.",
      ],
      architecture: "Next.js Interface <-> Django REST API <-> EVM Smart Contracts (Solidity)",
      metrics: [
        { label: "Procurement Cycle Reduction", value: "-50%" },
        { label: "Ledger Transaction Delay", value: "<2.5s" }
      ],
      github: "https://github.com/saichintapalli6-bit",
      live: "https://github.com/saichintapalli6-bit",
      glowColor: "rgba(123, 97, 255, 0.4)",
    },
    {
      title: "Student Management Portal",
      category: "Full Stack Development",
      desc: "A comprehensive administration dashboard that facilitates real-time course registrations, grade books, and secure database configurations.",
      icon: <GraduationCap className="w-6 h-6 text-accent" />,
      tech: ["React.js", "Express.js", "SQL Server", "Redux", "Bootstrap"],
      features: [
        "Concurrent course registrations handling multiple transactions without race conditions.",
        "Dynamic grade analytical modules displaying distributions and GPA counters.",
        "Automated PDF report generation for transcript cards and attendance charts."
      ],
      challenges: [
        "Preventing SQL server gridlocks when thousands of students register simultaneously. Handled by creating optimized database procedures and structured clustered indexes.",
      ],
      architecture: "React Web Dashboard <-> Express Routing Middleware <-> SQL Server Relational DB",
      metrics: [
        { label: "Concurrent Request Limit", value: "15K/min" },
        { label: "Relational Sync Latency", value: "300ms" }
      ],
      github: "https://github.com/saichintapalli6-bit",
      live: "https://github.com/saichintapalli6-bit",
      glowColor: "rgba(0, 255, 163, 0.4)",
    },
    {
      title: "Amphibian & Reptile Classifier",
      category: "Machine Learning & Vision AI",
      desc: "A computer vision model that uses deep learning to identify various amphibian and reptile species from uploaded photographic items.",
      icon: <Eye className="w-6 h-6 text-primary" />,
      tech: ["Python", "TensorFlow", "Keras", "Flask", "OpenCV", "NumPy"],
      features: [
        "Image preprocessing layer executing Gaussian filtering and histogram resizing.",
        "Deep Transfer Learning framework matching patterns on VGG16/ResNet50 layers.",
        "REST API accepting picture uploads and returning species labels and confidence rates."
      ],
      challenges: [
        "Distinguishing species with very similar textures and color distributions under dense nature backdrops. Addressed using data augmentation and targeted fine-tuning.",
      ],
      architecture: "Frontend Upload GUI -> Flask Inference Server -> TensorFlow CNN Model Engine",
      metrics: [
        { label: "Classifier Accuracy", value: "96.4%" },
        { label: "AI Inference Runtime", value: "120ms" }
      ],
      github: "https://github.com/saichintapalli6-bit",
      live: "https://github.com/saichintapalli6-bit",
      glowColor: "rgba(0, 245, 255, 0.4)",
    },
    {
      title: "Real Estate Price Prediction",
      category: "Data Analysis & ML Regression",
      desc: "An analytical pricing tool that parses real estate datasets to estimate valuation using multi-variable regression ML scripts.",
      icon: <Home className="w-6 h-6 text-accent" />,
      tech: ["Python", "Scikit-Learn", "XGBoost", "Pandas", "FastAPI", "Power BI"],
      features: [
        "Robust exploratory data cleansing pipeline identifying outliers and null grids.",
        "XGBoost regression modeling utilizing geographic coordinates and property metrics.",
        "Dynamic Power BI reports linking visual graphs directly to data frames."
      ],
      challenges: [
        "Mitigating severe skew in premium urban property prices. Remedied by applying log transforms and writing isolating wood structures to prune skewed nodes.",
      ],
      architecture: "Analytical Dashboards + FastAPI Endpoint -> ML Model File -> Structured Datasets",
      metrics: [
        { label: "R-Squared Validation", value: "0.892" },
        { label: "Data Rows Cleansed", value: "100K+" }
      ],
      github: "https://github.com/saichintapalli6-bit",
      live: "https://github.com/saichintapalli6-bit",
      glowColor: "rgba(0, 255, 163, 0.4)",
    },
  ];

  const getActiveTab = (idx: number) => activeTabMap[idx] || "features";
  
  const setTab = (idx: number, tab: "features" | "challenges" | "architecture") => {
    setActiveTabMap((prev) => ({ ...prev, [idx]: tab }));
  };

  return (
    <section id="projects" className="min-h-screen w-full flex items-center justify-center py-20 px-6 md:px-12 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full" ref={containerRef}>
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono text-secondary tracking-widest uppercase border border-secondary/20 px-3 py-1 rounded-full bg-secondary/5"
          >
            04_ENGINEERING
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-space font-extrabold text-white mt-4 tracking-tight"
          >
            FEATURED SYSTEM CASE STUDIES
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Projects List */}
        <div className="space-y-16">
          {projectsData.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <TiltCard glowColor={project.glowColor}>
                <div className="glass-panel p-6 md:p-10 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative overflow-hidden border-white/5 bg-slate-950/40">
                  
                  {/* Decorative glowing backdrops inside cards */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/2 rounded-full blur-3xl pointer-events-none" />

                  {/* Left Side: Category, Title, Code-like preview container, and Links (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full">
                    <div>
                      <span className="text-[10px] font-mono text-primary tracking-widest uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded-full self-start">
                        {project.category}
                      </span>
                      
                      <h3 className="text-2xl font-space font-extrabold text-white mt-5">
                        {project.title}
                      </h3>
                      
                      <p className="text-xs md:text-sm text-slate-400 mt-4 leading-relaxed">
                        {project.desc}
                      </p>

                      {/* Performance Metrics inside card */}
                      <div className="grid grid-cols-2 gap-3 mt-6">
                        {project.metrics.map((metric, mIdx) => (
                          <div key={mIdx} className="bg-white/2 border border-white/5 rounded-xl p-3.5 flex flex-col justify-center">
                            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{metric.label}</span>
                            <span className="text-sm font-space font-extrabold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-4 mt-8">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-primary/50 bg-white/5 hover:bg-primary/10 text-xs font-space font-semibold tracking-wider text-slate-200 hover:text-primary transition-all duration-350"
                      >
                        <FaGithub className="w-3.5 h-3.5" /> GITHUB
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-slate-950 text-xs font-space font-semibold tracking-wider transition-all hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] duration-300"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> LIVE DEMO
                      </a>
                    </div>
                  </div>

                  {/* Right Side: Tab Switcher & Dynamic Content Display (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col h-full bg-slate-950/50 border border-white/5 rounded-2xl p-6 relative z-10 min-h-[300px]">
                    
                    {/* Tab Selection buttons */}
                    <div className="flex border-b border-white/5 pb-3 mb-4 gap-2 overflow-x-auto">
                      {(["features", "challenges", "architecture"] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setTab(idx, tab)}
                          className={`px-4 py-1.5 rounded-lg text-[10px] font-space font-bold uppercase tracking-wider transition-all shrink-0 ${
                            getActiveTab(idx) === tab
                              ? "bg-white/5 border border-white/15 text-slate-100 shadow-inner"
                              : "text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Tab contents */}
                    <div className="flex-grow flex flex-col justify-between">
                      {getActiveTab(idx) === "features" && (
                        <div className="space-y-4">
                          <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">Key_Functional_Assets:</h4>
                          <ul className="space-y-3">
                            {project.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start text-xs md:text-sm text-slate-300 leading-relaxed">
                                <span className="text-accent mr-2.5 mt-0.5 font-mono">•</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {getActiveTab(idx) === "challenges" && (
                        <div className="space-y-4">
                          <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">Engineering_Obstacles:</h4>
                          <ul className="space-y-3">
                            {project.challenges.map((challenge, cIdx) => (
                              <li key={cIdx} className="flex items-start text-xs md:text-sm text-slate-300 leading-relaxed">
                                <span className="text-red-400 mr-2.5 mt-0.5 font-mono">!</span>
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {getActiveTab(idx) === "architecture" && (
                        <div className="space-y-4">
                          <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">Topology_Layout:</h4>
                          <div className="p-4 rounded-xl border border-white/5 bg-slate-950/70 font-mono text-xs text-primary leading-normal whitespace-pre-wrap">
                            {project.architecture}
                          </div>
                          
                          <div className="mt-4">
                            <h5 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Tech_Subsystem:</h5>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {project.tech.map((t, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/2 border border-white/5 text-slate-300"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
