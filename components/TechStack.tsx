"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TECH_STACK = [
  { name: "NODE.JS", color: "#8CC84B" },
  { name: "EXPRESS", color: "#ffffff" },
  { name: "TAILWIND", color: "#38B2AC" },
  { name: "MYSQL", color: "#4479A1" },
  { name: "AWS", color: "#FF9900" },
  { name: "REACT", color: "#61DAFB" },
  { name: "TYPESCRIPT", color: "#3178C6" },
  {name:"HTML",color:"#E44D26"},
  {name:"CSS",color:"#264DE4"},
  {name:"JAVASCRIPT",color:"#F7DF1E"},
];

const METRICS = [
  { value: "15+", label: "PROJECTS BUILT", color: "#3B82F6" },
  { value: "5+", label: "TECHNOLOGIES LEARNED", color: "#10B981" },
  { value: "100%", label: "PASSION & DRIVE", color: "#F43F5E" },
  { value: "∞", label: "CURIOSITY", textLg: true, color: "#8B5CF6" },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="bg-black py-20 md:py-32 flex justify-center font-sans border-t border-white/5 relative z-20 overflow-hidden">

      {/* Subtle dotted background grid effect via CSS */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="w-full flex flex-col gap-32 relative z-10 px-4 md:px-8">

        {/* Top: Tech Stack Marquee Container - Slanted Layout (Increased rotation) */}
        <div className="relative -rotate-[4deg] scale-[1.02]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="w-full border-[1.5px] border-white/60 rounded-[2rem] p-8 md:p-12 bg-[#050505]/50 backdrop-blur-sm shadow-[0_0_50px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col group/container hover:border-white transition-all duration-500"
          >
            {/* Centered Title with lines - Now slanted to match */}
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="h-[1px] w-12 bg-white/10" />
              <span className="text-white/30 text-xs tracking-[0.3em] font-medium uppercase font-sans">Tech Stack</span>
              <div className="h-[1px] w-12 bg-white/10" />
            </div>
            {/* Marquee Wrapper - Content now follows container rotation */}
            <div className="relative flex overflow-x-hidden group mask-horizontal pb-4">
              <div className="flex animate-marquee whitespace-nowrap gap-4 md:gap-6 py-2 w-max">
                {/* Render the list twice consecutively in the same flex container for a seamless loop */}
                {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full border-[1.5px] border-white/60 bg-white/[0.02] backdrop-blur-md shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-500 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tech.color, boxShadow: `0 0 10px ${tech.color}` }} />
                    <span className="text-white/70 text-sm md:text-base tracking-widest font-mono uppercase mt-0.5">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom: 4 Metric Cards - Slanted Layout (Increased rotation) */}
        <div className="relative -rotate-[3deg] translate-y-8 scale-[1.01]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-6">
            {METRICS.map((metric, i) => {
              const baseRotations = [-4, 3, -3, 4];
              const baseRotation = baseRotations[i % baseRotations.length];
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, rotate: baseRotation }}
                  whileInView={{ opacity: 1, y: 0, rotate: baseRotation }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: i * 0.1,
                    rotate: { duration: 0.5, ease: "easeOut" }
                  }}
                  whileHover={{ 
                    rotate: 0, // Straighten on hover for focus
                    scale: 1.1,
                    zIndex: 10,
                    borderColor: `${metric.color}50`,
                    backgroundColor: `${metric.color}08`,
                    transition: { duration: 0.3, ease: "circOut" }
                  }}
                  className="bg-[#08080A] border-[1.5px] border-white/60 rounded-[2rem] p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden group transition-all duration-500 cursor-default shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:border-white hover:shadow-[0_0_60px_rgba(255,255,255,0.1)]"
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 50px ${metric.color}25, 0 0 30px ${metric.color}15` }}
                  />
                  {/* Dynamic Animated Accent Glow */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                    style={{ backgroundColor: `${metric.color}30` }}
                  />
                  <div 
                    className="absolute bottom-0 left-0 w-24 h-24 blur-2xl rounded-full translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-75"
                    style={{ backgroundColor: `${metric.color}20` }}
                  />

                  <div className="relative z-10"> {/* Content now follows the card's rotation */}
                    <h3 
                      className="text-white font-bold tracking-tighter mb-2 transition-transform duration-500 group-hover:scale-[1.05] origin-left"
                      style={{ fontSize: metric.textLg ? 'clamp(3rem, 10vw, 4.5rem)' : 'clamp(2.5rem, 8vw, 3.75rem)' }}
                    >
                      {metric.value}
                    </h3>
                    <p className="text-white/20 text-[10px] tracking-[0.3em] font-bold uppercase mt-2 group-hover:text-white/60 transition-colors">
                      {metric.label}
                    </p>
                  </div>

                  {/* Bottom line accent */}
                  <div 
                    className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-in-out"
                    style={{ backgroundColor: metric.color }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      <style jsx global>{`
        .mask-horizontal {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
