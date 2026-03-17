"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase } from "lucide-react";

const EXPERIENCES = [
  {
    id: 1,
    role: "Full Stack Developer – Python Intern",
    company: "Lineysha and Thevan Software Technologies",
    desc: "Worked on full-stack web application development using Python-based technologies. Contributed to building dynamic and responsive applications while collaborating with the development team to implement backend logic, database integration, and modern web development practices.",
    date: "Jun 2025 – Jul 2025",
    color: "#22c55e",
    colorClass: "text-[#22c55e]",
    bgClass: "bg-[#22c55e]",
    shadowClass: "shadow-[0_0_15px_rgba(34,197,94,0.5)]",
    gradientFrom: "from-[#22c55e]/80",
    glowLight: "rgba(34,197,94,0.15)",
    glowStrong: "rgba(34,197,94,0.4)",
    tags: ["PYTHON", "FULL STACK", "WEB DEVELOPMENT"]
  },
  {
    id: 2,
    role: "Freelance Web Developer",
    company: "Play School Website Project",
    desc: "Designed and developed a responsive website for a play school client to improve their online presence. Implemented modern UI design, service pages, gallery sections, and contact features while ensuring mobile responsiveness and smooth user experience.",
    date: "2026",
    color: "#3b82f6",
    colorClass: "text-[#3b82f6]",
    bgClass: "bg-[#3b82f6]",
    shadowClass: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
    gradientFrom: "from-[#3b82f6]/80",
    glowLight: "rgba(59,130,246,0.15)",
    glowStrong: "rgba(59,130,246,0.4)",
    tags: ["FREELANCE", "WEB DEVELOPMENT", "CLIENT PROJECT"]
  },
];

function ExperienceCard({ exp, index, cardsRef }: { exp: typeof EXPERIENCES[0], index: number, cardsRef: React.MutableRefObject<(HTMLDivElement | null)[]> }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={(el) => { cardsRef.current[index] = el; }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col w-full bg-[#050508] border border-white/10 rounded-2xl p-5 md:p-6 lg:p-8 transition-all duration-500 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:shadow-[0_0_50px_rgba(255,255,255,0.02)]"
      style={{
        borderColor: isHovered ? exp.color : "rgba(255,255,255,0.1)",
      }}
    >
      {/* Spotlight Hover Glow Effect */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, ${exp.glowLight}, transparent 40%)`,
          boxShadow: isHovered ? `inset 0 0 50px ${exp.color}20, 0 0 30px ${exp.color}10` : 'none'
        }}
      />

      {/* Bottom thematic glow line inside the card */}
      <div className={`absolute bottom-0 left-8 md:left-12 w-1/3 h-[2px] bg-gradient-to-r ${exp.gradientFrom} to-transparent rounded-full transition-all duration-700 ease-in-out group-hover:w-2/3 opacity-50 group-hover:opacity-100 ${exp.shadowClass}`} />

      {/* Top Row: Categories and Badges */}
      <div className="flex flex-wrap items-center justify-between mb-8 md:mb-10 gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] group-hover:border-white/20 transition-colors">
            <div className={`w-1.5 h-1.5 rounded-full ${exp.bgClass} ${exp.shadowClass}`} />
            <span className={`${exp.colorClass} text-[10px] md:text-xs tracking-wider font-semibold uppercase`}>
              {exp.company}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white/40 text-xs font-medium tracking-widest">{exp.date}</span>
          <div className="hidden sm:flex w-8 h-8 rounded-lg bg-white/5 items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
            <Briefcase className={`${exp.colorClass} w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform`} />
          </div>
        </div>
      </div>

      {/* Title & Number */}
      <div className="flex items-baseline gap-4 mb-6 relative z-10">
        <span
          className="text-5xl md:text-6xl font-semibold tracking-tighter opacity-10 transition-all duration-500 group-hover:opacity-20"
          style={{ color: exp.color }}
        >
          0{exp.id}
        </span>
        <h3 className="text-2xl md:text-4xl text-white font-medium tracking-tight leading-snug max-w-2xl">
          {exp.role}
        </h3>
      </div>

      {/* Description */}
      <p className="text-white/40 text-sm md:text-base max-w-3xl leading-relaxed mb-8 relative z-10 whitespace-pre-line">
        {exp.desc}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-3 mt-auto relative z-10 pb-4">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-[9px] md:text-[10px] text-white/50 border border-white/10 rounded-full font-medium tracking-widest bg-[#0A0A0F] group-hover:border-white/20 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Animate cards
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // Slide up stagger
        gsap.fromTo(
          card,
          { opacity: 0, y: 70 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-4 md:px-12 lg:px-24 bg-black z-20" id="experience">
      <div className="max-w-[1200px] mx-auto relative">
        <div ref={headingRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
          <div>
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase mb-6 block font-medium">
              History
            </span>
            <h2 className="text-white font-medium tracking-tight text-4xl sm:text-5xl md:text-6xl max-w-2xl leading-[1.1]">
              Internship experience <br className="hidden md:block" /> in full-stack <br className="hidden md:block" /> product delivery.
            </h2>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 mt-6 md:mt-0 bg-[#0A0A0A]">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <span className="text-white/60 text-xs tracking-widest font-medium">2 ROLES</span>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:gap-12 relative">

          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} cardsRef={cardsRef} />
          ))}
        </div>
      </div>
    </section>
  );
}
