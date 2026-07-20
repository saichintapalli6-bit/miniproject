"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Download, ChevronRight, Terminal, Network, ShieldCheck } from "lucide-react";
import Image from "next/image";

// Dynamically import Canvas components to prevent SSR issues
const GalaxyBackground = dynamic(() => import("../Canvas/GalaxyBackground"), { ssr: false });
const FloatingObjects = dynamic(() => import("../Canvas/FloatingObjects"), { ssr: false });

const titles = [
  "Software Developer",
  "Full Stack Engineer",
  "Machine Learning Engineer",
  "Blockchain Developer",
  "Python Developer",
  "Data Analyst",
];

const codeSnippets = [
  {
    icon: <Terminal className="w-3.5 h-3.5 text-primary" />,
    title: "ml_model.py",
    code: `import tensorflow as tf\nmodel = tf.keras.Sequential([\n  tf.keras.layers.Dense(64),\n  tf.keras.layers.Dense(1)\n])\nmodel.compile(optimizer='adam')`,
    x: "left-[2%] xl:left-[3%]",
    y: "top-[20%] md:top-[25%]",
    delay: 0,
  },
  {
    icon: <Network className="w-3.5 h-3.5 text-accent" />,
    title: "api_handler.ts",
    code: `export async function GET() {\n  const data = await db.query();\n  return Response.json(data);\n}`,
    x: "right-[2%] xl:right-[3%]",
    y: "top-[15%] md:top-[22%]",
    delay: 2,
  },
  {
    icon: <ShieldCheck className="w-3.5 h-3.5 text-secondary" />,
    title: "procure.sol",
    code: `contract Procurement {\n  address public buyer;\n  function buy() public payable {\n    require(msg.value > 0);\n  }\n}`,
    x: "left-[3%] xl:left-[4%]",
    y: "bottom-[18%] md:bottom-[22%]",
    delay: 4,
  },
];

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriting effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentTitle = titles[titleIdx];
    const typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentTitle) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % titles.length);
    } else {
      timer = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentTitle.substring(0, displayText.length - 1)
            : currentTitle.substring(0, displayText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIdx]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden bg-transparent"
    >
      {/* 3D Background Layers */}
      <GalaxyBackground />
      <FloatingObjects />

      {/* Floating Holographic Code Snippets */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden xl:block">
        {codeSnippets.map((snippet, idx) => (
          <motion.div
            key={idx}
            className={`absolute ${snippet.x} ${snippet.y} w-72 p-3.5 rounded-xl border border-white/5 bg-slate-950/40 backdrop-blur-md opacity-25`}
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: snippet.delay,
            }}
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
              <div className="flex items-center gap-1.5">
                {snippet.icon}
                <span className="text-[10px] font-mono text-slate-400">{snippet.title}</span>
              </div>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
              </div>
            </div>
            <pre className="text-[9px] font-mono text-slate-300 leading-normal overflow-x-auto whitespace-pre">
              <code>{snippet.code}</code>
            </pre>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start relative z-10">
          {/* Cybernetic Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono uppercase tracking-widest mb-6 shadow-[0_0_10px_rgba(0,245,255,0.05)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-glow-cyan" />
            VIRTUAL_SPACE_ONLINE // PORTFOLIO_V2.6
          </motion.div>

          {/* Developer Name */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl font-space font-extrabold leading-tight text-white tracking-tight"
          >
            CHINTAPALLI VENKATA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              SAI SANTOSH
            </span>
          </motion.h1>

          {/* Typing Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-10 md:h-12 flex items-center mt-4 text-lg md:text-xl font-mono text-slate-400"
          >
            <span>{">"} </span>
            <span className="ml-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {displayText}
            </span>
            <span className="ml-1 w-2 h-5 bg-primary animate-pulse" />
          </motion.div>

          {/* Narrative Info */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 text-sm md:text-base text-slate-400 max-w-lg leading-relaxed"
          >
            MCA graduate, Full Stack Developer, Machine Learning Engineer, and Data Analyst. Crafting high-performance backends, modern interactive frontends, and predictive ML intelligence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-slate-950 font-space font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(123,97,255,0.5)] transition-all cursor-pointer"
            >
              View Projects <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-primary/50 bg-white/5 hover:bg-primary/5 text-slate-300 hover:text-slate-100 font-space font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer"
            >
              Hire Me
            </button>

            <a
              href="/CHINTAPALLI_VENKATA_SAI_SANTOSH_RESUME.pdf"
              download="CHINTAPALLI_VENKATA_SAI_SANTOSH_RESUME.pdf"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/5 hover:border-primary/40 bg-white/3 hover:bg-primary/5 text-slate-400 hover:text-primary font-space font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer"
            >
              Resume (PDF) <Download className="w-3.5 h-3.5" />
            </a>

            <a
              href="/CHINTAPALLI_VENKATA_SAI_SANTOSH_RESUME.doc"
              download="CHINTAPALLI_VENKATA_SAI_SANTOSH_RESUME.doc"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/5 hover:border-accent/40 bg-white/3 hover:bg-accent/5 text-slate-400 hover:text-accent font-space font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer"
            >
              Resume (DOC) <Download className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        {/* Right Side: Circular Hologram Frame with Profile Image */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96"
          >
            {/* Spinning Hologram Ring 1 */}
            <div className="absolute inset-0 rounded-full border border-dashed border-primary/20 animate-[spin_40s_linear_infinite] pointer-events-none" />
            
            {/* Spinning Hologram Ring 2 */}
            <div className="absolute inset-4 rounded-full border border-double border-secondary/35 animate-[spin_25s_linear_infinite_reverse] pointer-events-none" />

            {/* Glowing cyan border ring */}
            <div className="absolute inset-8 rounded-full border-2 border-primary/40 shadow-[0_0_25px_rgba(0,245,255,0.15),inset_0_0_25px_rgba(0,245,255,0.15)] animate-[pulse_3s_ease-in-out_infinite] pointer-events-none" />

            {/* Image mask overlay */}
            <div className="absolute inset-10 rounded-full overflow-hidden border border-white/10 bg-slate-900/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
              <Image
                src="/profile.png"
                alt="CHINTAPALLI VENKATA SAI SANTOSH"
                fill
                priority
                className="object-cover opacity-90 transition-transform duration-700 hover:scale-110"
              />
              {/* Scanline overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent bg-[length:100%_4px] animate-[pulse_4s_ease-in-out_infinite] pointer-events-none" />
            </div>

            {/* Micro-HUD details floating around */}
            <div className="absolute top-2 right-2 flex flex-col gap-1 items-end text-[9px] font-mono text-primary/70">
              <span>LAT_S: 17.3850</span>
              <span>LNG_S: 78.4867</span>
            </div>
            <div className="absolute bottom-6 left-2 text-[9px] font-mono text-accent/70">
              <span>SYS_INIT: OK</span>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Scroll indicator chevron at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer pointer-events-none">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-4 h-4 mt-2 border-b-2 border-r-2 border-slate-500 transform rotate-45"
        />
      </div>
    </section>
  );
}
