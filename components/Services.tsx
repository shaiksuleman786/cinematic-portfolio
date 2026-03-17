"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// The SVG paths we will draw on the hidden canvas to generate pixel targets.
const LOGO_PATHS = {
  html: "M2.846 0L1.75 12.288 12 15.132l10.25-2.844L21.154 0H2.846zm14.887 4.145l-3.328 3.33H7.07l.256 2.87h7.08l-.513 5.735-3.89 1.05-3.89-1.05-.257-2.87H3.45l.512 5.736L12 21.184l8.038-2.228 1.025-11.472h-2.583l-3.34-3.34z", // Shield approx
  css: "M2.846 0L1.75 12.288 12 15.132l10.25-2.844L21.154 0H2.846zm14.887 4.145l-3.328 3.33H7.07l.256 2.87h7.08l-.513 5.735-3.89 1.05-3.89-1.05-.257-2.87H3.45l.512 5.736L12 21.184l8.038-2.228 1.025-11.472h-2.583l-3.34-3.34z",   // Same shield shape for CSS, we'll draw it with different color/scale or rely on text
  js: "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.304-1.154-.583-1.154-1.273 0-.684.63-1.205 1.55-1.205 1.154 0 1.637.5 1.838 1.547l1.794-.962c-.225-1.503-1.638-2.42-3.633-2.42-2.316 0-3.692 1.258-3.692 3.016 0 1.706 1.155 2.508 3.076 3.243.91.365 1.207.696 1.207 1.34 0 .736-.677 1.353-1.874 1.353-1.488 0-2.195-.747-2.368-2.008l-1.956.887c.237 2.052 1.84 3.737 4.312 3.737 2.768 0 4.103-1.652 4.103-3.284.004-.848-.3-1.442-.2-1.098zm-9.01.636c0 .77-.28 1.48-.7 1.954-1.1.92-2.35.8-3.23-.21-.49-.55-.78-1.51-.8-2.32H6.38c.03 2.19 1.48 4.29 4.34 4.29 2.57 0 4.41-1.78 4.41-4.7V11.23h-2.11v7.682z",
  react: "M23.6 11.432c-1.396-4.576-6.195-7.792-11.6-7.792-5.405 0-10.204 3.216-11.6 7.792a1.2 1.2 0 000 .708c1.396 4.576 6.195 7.792 11.6 7.792 5.405 0 10.204-3.216 11.6-7.792a1.2 1.2 0 000-.708zm-11.6 6.307c-4.484 0-8.544-2.505-10.012-6.262 1.468-3.757 5.528-6.262 10.012-6.262 4.484 0 8.544 2.505 10.012 6.262-1.468 3.757-5.528 6.262-10.012 6.262zM12 7.74a4.26 4.26 0 100 8.52 4.26 4.26 0 000-8.52zm0 6.678a2.418 2.418 0 110-4.836 2.418 2.418 0 010 4.836z",
  node: "M11.83 23.328l-7.915-4.568A2 2 0 013 17.026V7.89a2 2 0 01.915-1.734l7.915-4.568a2 2 0 011.83 0l7.915 4.568A2 2 0 0122.58 7.89v9.136a2 2 0 01-.915 1.734l-7.915 4.568a2 2 0 01-1.83 0zm7.152-14.28L12 5.01l-6.982 4.038v7.904L12 21.144l6.982-4.192V9.048z",
};

// Colors for the morphing particles
const SKILL_COLORS = [
  "rgba(228, 77, 38, ",  // HTML (Orange)
  "rgba(38, 77, 228, ",  // CSS (Blue)
  "rgba(247, 223, 30, ", // JS (Yellow)
  "rgba(97, 218, 251, ", // React (Cyan)
  "rgba(140, 200, 75, "  // Node (Green)
];

// Content Data
const SKILLS_DATA = [
  {
    id: "html",
    title: "HTML",
    desc: "Structuring modern semantic web pages.",
  },
  {
    id: "css",
    title: "CSS",
    desc: "Styling responsive and visually appealing layouts.",
  },
  {
    id: "js",
    title: "JavaScript",
    desc: "Creating interactive and dynamic web functionality.",
  },
  {
    id: "react",
    title: "React.js",
    desc: "Building modern component-based front-end applications.",
  },
  {
    id: "node",
    title: "Node.js",
    desc: "Developing scalable backend APIs and server-side logic.",
  },
];


// --- Particle Logic ---
class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  vx: number;
  vy: number;
  ease: number;
  friction: number;
  colorBase: string;
  alpha: number;
  time: number;
  active: boolean;

  constructor(x: number, y: number, colorBase: string) {
    this.x = x + (Math.random() * 50 - 25);
    this.y = y + (Math.random() * 50 - 25);
    this.originX = x;
    this.originY = y;
    this.size = Math.random() * 2 + 0.5;
    this.vx = 0;
    this.vy = 0;
    this.ease = Math.random() * 0.05 + 0.02;
    this.friction = 0.85;
    this.colorBase = colorBase;
    this.alpha = Math.random() * 0.5 + 0.3;
    this.time = Math.random() * 100;
    this.active = true;
  }

  update(mousePos: { x: number; y: number }) {
    if (!this.active) return;
    this.time += 0.05;

    // Mouse repelling physics
    const dx = mousePos.x - this.x;
    const dy = mousePos.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (mousePos.x > -1000 && distance < 120) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (120 - distance) / 120;
      this.vx -= forceDirectionX * force * 5;
      this.vy -= forceDirectionY * force * 5;
    }

    // Natural drift
    const driftX = Math.sin(this.time) * 1.5;
    const driftY = Math.cos(this.time) * 1.5;

    // Spring back to origin target
    this.x += (this.originX + driftX - this.x) * this.ease;
    this.y += (this.originY + driftY - this.y) * this.ease;

    this.x += this.vx;
    this.y += this.vy;

    this.vx *= this.friction;
    this.vy *= this.friction;
  }

  draw(context: CanvasRenderingContext2D) {
    if (!this.active) return;
    context.fillStyle = `${this.colorBase}${this.alpha})`;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
  }
}

const MorphingLogo = ({ activeIndex }: { activeIndex: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>();
  const mouseRef = useRef({ x: -1000, y: -1000 });

  // Generate target points for a given text or path string
  const getLogoPoints = (canvas: HTMLCanvasElement, skillIndex: number) => {
    const textCanvas = document.createElement("canvas");
    const textCtx = textCanvas.getContext("2d", { willReadFrequently: true });
    if (!textCtx) return [];

    if (canvas.width <= 0 || canvas.height <= 0) return [];

    textCanvas.width = canvas.width;
    textCanvas.height = canvas.height;
    textCtx.fillStyle = "white";
    textCtx.textAlign = "center";
    textCtx.textBaseline = "middle";

    const w = canvas.width;
    const h = canvas.height;

    // Draw logic based on skill index
    if (skillIndex === 0) {
      // HTML
      textCtx.font = `bold ${Math.min(w, h) * 0.4}px Inter, sans-serif`;
      textCtx.fillText("HTML", w / 2, h / 2);
    } else if (skillIndex === 1) {
      // CSS
      textCtx.font = `bold ${Math.min(w, h) * 0.4}px Inter, sans-serif`;
      textCtx.fillText("CSS", w / 2, h / 2);
    } else if (skillIndex === 2) {
      // JS (SVG Path)
      textCtx.save();
      textCtx.translate(w / 2, h / 2);
      const scale = Math.min(w, h) / 35;
      textCtx.scale(scale, scale);
      let p = new Path2D(LOGO_PATHS.js);
      textCtx.translate(-12, -12);
      textCtx.fill(p);
      textCtx.restore();
    } else if (skillIndex === 3) {
      // React "Atom" shape
      textCtx.save();
      textCtx.translate(w / 2, h / 2);
      textCtx.lineWidth = Math.min(w, h) * 0.03;
      textCtx.strokeStyle = "white";
      textCtx.fillStyle = "white";

      const rx = Math.min(w, h) * 0.4;
      const ry = Math.min(w, h) * 0.15;

      for (let i = 0; i < 3; i++) {
        textCtx.beginPath();
        textCtx.ellipse(0, 0, rx, ry, (Math.PI / 3) * i, 0, Math.PI * 2);
        textCtx.stroke();
      }
      textCtx.beginPath();
      textCtx.arc(0, 0, ry * 0.6, 0, Math.PI * 2);
      textCtx.fill();
      textCtx.restore();
    } else if (skillIndex === 4) {
      // Official Node.js Hexagon Wordmark
      textCtx.save();
      textCtx.translate(w / 2, h / 2);
      
      const hexR = Math.min(w, h) * 0.42;
      
      // Draw Thick Outer Hexagon (matching the image)
      textCtx.beginPath();
      textCtx.lineWidth = hexR * 0.12;
      textCtx.strokeStyle = "white";
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const px = hexR * Math.cos(angle);
        const py = hexR * Math.sin(angle);
        if (i === 0) textCtx.moveTo(px, py);
        else textCtx.lineTo(px, py);
      }
      textCtx.closePath();
      textCtx.stroke();

      // Draw "node" wordmark inside
      textCtx.font = `bold ${hexR * 0.45}px Inter, sans-serif`;
      textCtx.fillStyle = "white";
      textCtx.fillText("node", 0, 0);
      
      textCtx.restore();
    }

    const imgData = textCtx.getImageData(0, 0, w, h).data;
    const points = [];

    // Sample points from the pixels
    const step = Math.max(3, Math.round(w / 100)); // Dynamic resolution
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const idx = (y * w + x) * 4;
        if (imgData[idx + 3] > 128) {
          points.push({ x, y });
        }
      }
    }
    return points;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    if (canvas.width <= 0 || canvas.height <= 0) return;

    // Get new target points for the currently active skill
    const targetPoints = getLogoPoints(canvas, activeIndex);
    const colorBase = SKILL_COLORS[activeIndex];

    const currentParticles = particlesRef.current;

    // Morph existing particles to new targets
    for (let i = 0; i < Math.max(targetPoints.length, currentParticles.length); i++) {
      if (i < targetPoints.length) {
        // We have a target point for this index
        if (i < currentParticles.length) {
          // Move existing particle
          currentParticles[i].originX = targetPoints[i].x;
          currentParticles[i].originY = targetPoints[i].y;
          currentParticles[i].colorBase = colorBase;
          currentParticles[i].active = true;
          // Add a little chaos to the transition
          currentParticles[i].vx += (Math.random() - 0.5) * 10;
          currentParticles[i].vy += (Math.random() - 0.5) * 10;
        } else {
          // Spawn new particle
          currentParticles.push(new Particle(targetPoints[i].x, targetPoints[i].y, colorBase));
        }
      } else {
        // Too many existing particles, deactivate them
        currentParticles[i].active = false;
      }
    }

    particlesRef.current = currentParticles;

  }, [activeIndex]);

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.update(mouseRef.current);
        p.draw(ctx);
      });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full cursor-crosshair transition-opacity duration-500" />;
};


// --- Helper Component to track intersection ---
const SkillCard = ({ skill, index, onInView }: { skill: any, index: number, onInView: (i: number) => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const themeColors = [
    { light: "rgba(228, 77, 38, 0.15)", strong: "rgba(228, 77, 38, 0.4)" }, // HTML
    { light: "rgba(38, 77, 228, 0.15)", strong: "rgba(38, 77, 228, 0.4)" }, // CSS
    { light: "rgba(247, 223, 30, 0.15)", strong: "rgba(247, 223, 30, 0.4)" }, // JS
    { light: "rgba(97, 218, 251, 0.15)", strong: "rgba(97, 218, 251, 0.4)" }, // React
    { light: "rgba(140, 200, 75, 0.15)", strong: "rgba(140, 200, 75, 0.4)" }, // Node
  ];

  const currentTheme = themeColors[index];
  const activeColor = SKILL_COLORS[index].replace(', ', ', 1)');

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.01 }}
      className="group relative bg-[#0a0a0d] border-[1.5px] border-white/60 rounded-3xl p-8 lg:p-10 flex flex-col gap-6 cursor-pointer overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-500 hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
      style={{
        // Remove style-based borderColor to favor tailwind transition
      }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{ boxShadow: `inset 0 0 50px ${currentTheme.strong}20, 0 0 25px ${currentTheme.strong}10` }}
      />
      {/* Background Spotlight Color Shade */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 500px at ${mousePos.x}px ${mousePos.y}px, ${currentTheme.light}, transparent 50%)`
        }}
      />

      <div className="absolute top-8 right-8 text-white/20 group-hover:text-white transition-all duration-300 group-hover:rotate-45 z-10">
        <ArrowUpRight className="w-6 h-6" />
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-medium text-white mb-3 flex items-center gap-4 transition-colors duration-300"
            style={{ color: isHovered ? activeColor : 'white' }}>
          <span className="text-white/20 font-mono text-sm tracking-widest">{String(index + 1).padStart(2, '0')}</span>
          {skill.title}
        </h3>
        <p className="text-white/40 font-light leading-relaxed max-w-sm ml-9 group-hover:text-white/70 transition-colors duration-300">
          {skill.desc}
        </p>
      </div>
    </motion.div>
  );
};


// --- Main Container ---
export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-black py-24 md:py-40 px-6 md:px-12 lg:px-24 border-t border-white/5 font-sans relative z-30" id="skills">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

        {/* Left Side: Sticky Morphing Particle Graphic */}
        <div className="hidden lg:flex lg:w-[45%] flex-col items-center">
          {/* We use highly sticky positioning so it stays in view while scrolling through the cards */}
          <div className="sticky top-[15vh] w-full h-[60vh] flex flex-col items-center justify-center pt-10">
            {/* The Morphing Canvas */}
            <MorphingLogo activeIndex={activeIndex} />

            {/* Very subtle underglow that changes color based on active index */}
            <div
              className="absolute w-[60%] h-[60%] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 opacity-20"
              style={{ backgroundColor: SKILL_COLORS[activeIndex].replace(', ', ', 1)') }}
            />
          </div>
        </div>

        {/* Right Side: Heading and Cards List */}
        <div className="w-full lg:w-[55%] flex flex-col relative z-20">

          <div className="mb-20 md:mb-32">
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4 block font-light">
              Expertise
            </span>
            <h2 className="text-white font-medium tracking-tight text-5xl md:text-7xl mb-6">
              My Skills
            </h2>
            <p className="text-white/40 text-lg md:text-xl font-light max-w-lg leading-relaxed">
              I build modern, scalable web applications and digital products.
            </p>
          </div>

          <div className="flex flex-col gap-16 pb-32">
            {SKILLS_DATA.map((skill, index) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                index={index}
                onInView={setActiveIndex}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
