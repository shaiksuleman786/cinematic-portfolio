"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe } from "lucide-react";

// Using real user projects but styled exactly like the provided Figma screenshot
const PROJECTS = [
  {
  id: 1,
  title: "VidyaDheesha – AI Career Compass",
  desc: "An AI-powered career discovery platform that helps students explore career paths based on their interests, education stream, and goals. It provides personalized guidance, entrance exam insights, and career data through an intuitive and modern web interface.",
  image: "https://i.ibb.co/Tqk4sWNQ/Whats-App-Image-2026-03-16-at-8-17-15-PM.jpg",
  link: "https://vidyadheesha.com",
},
 {
  id: 2,
  title: "Quantum Superposition & Entanglement Simulator",
  desc: "An interactive visualization tool that explains quantum computing concepts like superposition and entanglement using Bloch spheres and real-time qubit state transformations.",
  image: "https://i.ibb.co/1fsmCNbS/e-K5-TCM-Screenshot-2026-03-17-003220.png",
  link: "https://quantumplayground.lovable.app",
},
  {
  id: 3,
  title: "IdeaGraph – Project Memory System",
  desc: "A university project intelligence platform that tracks, connects, and visualizes student projects, helping institutions preserve innovation and extend unfinished ideas through a centralized dashboard.",
  image: "https://i.ibb.co/DPvrR69H/Screenshot-2026-03-17-232400.png",
  link: "https://pronto-run-it.lovable.app",
}
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        }
      );
      // Animate projects staggering upward on scroll
      projectsRef.current.forEach((project, i) => {
        if (!project) return;
        gsap.fromTo(
          project,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-4 md:px-12 lg:px-24 bg-black z-20 flex justify-center" id="projects">
      <div className="max-w-[1280px] w-full flex flex-col gap-24 lg:gap-32">
        {/* Header Section */}
        <div ref={headingRef} className="flex flex-col mb-4">
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase mb-6 block font-medium">
            Selected Work
          </span>
          <h2 className="text-white font-medium tracking-tight text-5xl md:text-6xl lg:text-7xl max-w-3xl leading-[1.1]">
            Pushing the boundaries <br className="hidden md:block"/> of what's possible on <br className="hidden md:block"/> the web.
          </h2>
        </div>

        {PROJECTS.map((p, i) => {
          const isLeftText = i % 2 === 0;

          return (
            <div 
              key={p.id} 
              ref={(el) => { projectsRef.current[i] = el; }}
              className="flex flex-col md:grid md:grid-cols-12 gap-y-12 items-center group relative w-full"
            >
              {/* Animated Border Glow (only visible on hover) */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 -z-10" />

              {/* IMAGE container spanning exactly 7 columns */}
              <div 
                className={`relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:scale-[1.02] z-0 bg-[#0A0A0F] border-[1.5px] border-white/60 group-hover:border-white
                ${isLeftText 
                  ? 'md:col-start-6 md:col-end-13 md:order-2' 
                  : 'md:col-start-1 md:col-end-8 md:order-1'}`}
              >
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-90" />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* TEXT container spanning 5 columns but visually overlapping image via margins */}
              <div 
                className={`w-full relative z-10 flex flex-col items-start
                ${isLeftText 
                  ? 'md:col-start-1 md:col-end-6 md:order-1' 
                  : 'md:col-start-8 md:col-end-13 md:order-2'}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-blue-500 transition-all duration-500" />
                  <span className="text-white/40 text-[10px] tracking-[0.3em] font-bold uppercase transition-colors group-hover:text-blue-400">PROJECT 0{p.id}</span>
                </div>

                <h3 className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-white mb-6 leading-[1.1] tracking-tighter w-[120%] group-hover:text-white transition-colors">
                  {p.title}
                </h3>
                
                {/* Glass card for description with enhanced blur and subtle glow */}
                <div className={`bg-[#0A0A0F]/90 backdrop-blur-3xl p-6 md:p-8 rounded-2xl border-[1.5px] border-white/60 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative z-20 w-full md:w-[125%] lg:w-[140%] group-hover:border-white group-hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-500
                  ${isLeftText ? '' : 'md:-ml-[25%] lg:-ml-[40%]'}`}>
                  <p className="text-gray-400 text-sm md:text-[16px] leading-relaxed tracking-wide group-hover:text-gray-200 transition-colors">
                    {p.desc}
                  </p>
                </div>

                <div className={`mt-8 flex items-center px-1 w-full ${isLeftText ? 'justify-start' : 'justify-end md:justify-start md:pl-[6%]'}`}>
                  <a href={p.link} target="_blank" rel="noreferrer" className="flex items-center gap-3 group/link">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover/link:border-blue-500/50 group-hover/link:bg-blue-500/10 transition-all duration-300">
                      <Globe className="w-5 h-5 text-white/40 group-hover/link:text-white transition-colors" />
                    </div>
                    <span className="text-white/20 text-xs tracking-widest font-bold uppercase group-hover/link:text-white transition-colors">LIVE PREVIEW</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
