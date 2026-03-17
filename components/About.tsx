"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!textRef.current) return;

      // Split text into characters for a fluid, organic reveal
      const text = textRef.current.innerText;
      textRef.current.innerHTML = text
        .split("")
        .map(char => `<span class="char inline-block opacity-0 translate-y-8">${char === " " ? "&nbsp;" : char}</span>`)
        .join("");

      // Character-level reveal
      gsap.to(".char", {
        opacity: 1,
        y: 0,
        stagger: 0.015,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });

      // Background parallax text
      gsap.to(".parallax-bg", {
        x: "-20%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      id="about"
      className="bg-black py-40 md:py-60 px-6 md:px-12 lg:px-24 flex items-center justify-center relative z-20 overflow-hidden"
    >
      {/* Liquid Ambient Glows */}
      <div
        ref={containerRef}
        className="absolute inset-0 pointer-events-none opacity-60 z-0"
      >
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] bg-blue-500/20 transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)` }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] bg-purple-500/20 transition-transform duration-1000 ease-out delay-75"
          style={{ transform: `translate(${mousePos.x * 0.8 - 200}px, ${mousePos.y * 0.8 - 200}px)` }}
        />
      </div>

      {/* Massive Background Parallax Text - Increased opacity for better visibility */}
      <h1 className="parallax-bg absolute top-1/2 left-0 -translate-y-1/2 text-[30vw] font-black text-white/[0.05] whitespace-nowrap pointer-events-none select-none z-0">
        ABOUT ME ABOUT ME ABOUT ME
      </h1>

      <div className="max-w-[1200px] w-full relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-[1px] bg-blue-500/50" />
          <span className="text-blue-400 text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold">
            WHO AM I?
          </span>
        </div>

        <h2
          ref={textRef}
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-outfit font-black leading-[1.05] tracking-tighter max-w-[15ch] md:max-w-[18ch] drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]"
        >
          I'm Shaik Suleman, a Full-Stack Developer passionate about building scalable, user-friendly web applications using React, Node.js, and JavaScript — blending clean engineering with intuitive design to create impactful digital experiences.
        </h2>

        <div className="mt-16 flex flex-wrap gap-12 text-white/40">
          <div className="flex flex-col gap-2 group transition-all duration-500">
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-white/20 group-hover:text-blue-500 transition-colors">Focus</span>
            <div className="border-l border-white/10 pl-4 py-1 group-hover:border-blue-500/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all">
              <span className="text-sm md:text-base text-white/60 group-hover:text-white">Full-Stack Architecture</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 group transition-all duration-500">
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-white/20 group-hover:text-purple-500 transition-colors">Aesthetic</span>
            <div className="border-l border-white/10 pl-4 py-1 group-hover:border-purple-500/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all">
              <span className="text-sm md:text-base text-white/60 group-hover:text-white">Minimal & Immersive</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 group transition-all duration-500">
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-white/20 group-hover:text-emerald-500 transition-colors">Goal</span>
            <div className="border-l border-white/10 pl-4 py-1 group-hover:border-emerald-500/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all">
              <span className="text-sm md:text-base text-white/60 group-hover:text-white">Limitless Innovation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top/Bottom separation lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
