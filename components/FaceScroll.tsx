"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 104;

const getFramePath = (index: number) => {
  const num = String(index).padStart(3, "0");
  return `/frames/upscaled-video_${num}.png`;
};

// Each section: visible from 'start' to 'end' scroll progress (0–1)
const SECTIONS = [
  {
    id: "hero",
    start: 0,
    end: 0.1,
    label: "ABOUT ME",
    heading: ["Full-Stack Developer", "Building modern", "web experiences."],
    subtext: [
      "I craft high-performance web applications with a focus on",
      "immersive digital experiences and clean architecture."
    ],
    align: "center" as const,
    isCta: false,
  },
  {
    id: "approach",
    start: 0.15,
    end: 0.35,
    label: "MY APPROACH",
    heading: ["Clean architecture.", "Thoughtful design.", "Reliable systems."],
    subtext: [
      "Engineering robust systems through clean code and modern architecture.",
      "Designing with purpose to create seamless and intuitive user journeys."
    ],
    align: "right" as const,
    isCta: false,
  },
  {
    id: "approach-alt",
    start: 0.38,
    end: 0.52,
    label: "MY APPROACH",
    heading: ["Focused on", "scalability and", "performance."],
    subtext: [
      "I build applications that grow with your business,",
      "ensuring high-speed interactions and rock-solid stability."
    ],
    align: "right" as const,
    isCta: false,
  },
  {
    id: "skills",
    start: 0.55,
    end: 0.72,
    label: "TECHNOLOGIES",
    heading: ["Technologies", "I work with"],
    subtext: [
      "HTML, CSS, JavaScript, React.js, Next.js, Node.js",
      "and a variety of modern tools to build the future."
    ],
    align: "left" as const,
    isCta: false,
  },
  {
    id: "cta",
    start: 0.78,
    end: 1.0,
    label: "CONTACT",
    heading: ["Let's create", "something", "impactful."],
    subtext: [
      "Open to collaborations, internships, and exciting product ideas."
    ],
    align: "center" as const,
    isCta: true,
  },
];

function getSectionOpacity(progress: number, start: number, end: number): number {
  const fadeIn = 0.04;
  const fadeOut = 0.04;
  if (progress < start - fadeIn || progress > end + fadeOut) return 0;
  if (progress < start) return (progress - (start - fadeIn)) / fadeIn;
  if (progress > end) return 1 - (progress - end) / fadeOut;
  return 1;
}

export default function FaceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Draw a single frame on canvas
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    ctx.clearRect(0, 0, w, h);

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = w / h;
    let drawW: number, drawH: number;

    if (imgAspect > canvasAspect) {
      drawH = h;
      drawW = h * imgAspect;
    } else {
      drawW = w;
      drawH = w / imgAspect;
    }

    const drawX = (w - drawW) / 2;
    const drawY = (h - drawH) / 2;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Preload all frames
  useEffect(() => {
    let count = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      const finish = () => {
        count++;
        setLoadProgress(Math.round((count / TOTAL_FRAMES) * 100));
        if (count === TOTAL_FRAMES) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      img.onload = finish;
      img.onerror = finish;
      images[i] = img;
    }
  }, []);

  // Draw frame 0 once loaded
  useEffect(() => {
    if (loaded) {
      drawFrame(0);
    }
  }, [loaded, drawFrame]);

  // GSAP Scroll Animation
  useEffect(() => {
    if (!loaded || !containerRef.current || !canvasRef.current) return;

    const context = gsap.context(() => {
      // Frame animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        snap: {
          snapTo: [0, 0.25, 0.45, 0.68, 0.9],
          duration: { min: 0.3, max: 0.8 },
          delay: 0.1,
          ease: "power2.inOut"
        },
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Non-linear frame mapping based on user requested stops
          // Stops: 31 (Back), 45 (Profile), 71 (Front), 84 (Final)
          let targetFrame;
          if (progress <= 0.25) {
            targetFrame = gsap.utils.interpolate(0, 31, progress / 0.25);
          } else if (progress <= 0.45) {
            targetFrame = gsap.utils.interpolate(31, 45, (progress - 0.25) / 0.20);
          } else if (progress <= 0.68) {
            targetFrame = gsap.utils.interpolate(45, 71, (progress - 0.45) / 0.23);
          } else if (progress <= 0.9) {
            targetFrame = gsap.utils.interpolate(71, 84, (progress - 0.68) / 0.22);
          } else {
            targetFrame = gsap.utils.interpolate(84, 103, (progress - 0.9) / 0.1);
          }
          
          targetFrame = Math.floor(targetFrame);

          if (currentFrameRef.current !== targetFrame) {
            currentFrameRef.current = targetFrame;
            drawFrame(targetFrame);
          }
        },
      });

      // Cinematic text animations
      SECTIONS.forEach((section, index) => {
        const el = sectionsRef.current[index];
        if (!el) return;

        // Reset initially
        gsap.set(el, { opacity: 0, y: 50, filter: "blur(10px)" });

        // Animation Timeline for each section
        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${section.start * 100}% top`,
            end: `${section.end * 100}% top`,
            scrub: 1,
            // onEnter: () => console.log(`Entering ${section.id}`),
          }
        })
        .to(el, { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: 0.4 })
        .to(el, { opacity: 0, y: -50, filter: "blur(10px)", ease: "power2.in", duration: 0.4 }, "+=0.2");
      });
    });

    return () => context.revert();
  }, [loaded, drawFrame]);

  // Handle resize
  useEffect(() => {
    const onResize = () => drawFrame(Math.round(currentFrameRef.current));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawFrame]);

  return (
    <>
      {/* Loading Screen */}
      {!loaded && (
        <div className="loading-screen">
          <div className="loading-spinner mb-6" />
          <p className="text-white/40 text-sm tracking-widest uppercase">
            Loading portfolio animation...
          </p>
          <p className="text-white/20 text-xs mt-3">{loadProgress}%</p>
        </div>
      )}

      {/* Scroll container — 600vh gives plenty of scroll room */}
      <div ref={containerRef} id="home" style={{ height: "600vh" }} className="relative bg-black">
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: loaded ? 1 : 0 }}
          />

          {/* Text overlays — pointer-events off by default, on for interactive elements */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {SECTIONS.map((section, i) => (
              <div
                key={section.id}
                ref={(el) => { sectionsRef.current[i] = el; }}
                className={`
                  absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24
                  ${section.align === "center" ? "items-center text-center" : ""}
                  ${section.align === "right" ? "items-end text-right" : ""}
                  ${section.align === "left" ? "items-start text-left" : ""}
                `}
                style={{ opacity: 0 }}
              >
                {/* On mobile: push left/right sections to avoid covering face */}
                <div
                  className={`
                    flex flex-col
                    ${section.align === "center" ? "items-center" : ""}
                    ${section.align === "right" ? "items-end" : ""}
                    ${section.align === "left" ? "items-start" : ""}
                    ${section.align === "left" ? "md:mt-0 mt-[40vh]" : ""}
                    ${section.align === "right" ? "md:mt-0 -mt-[40vh]" : ""}
                  `}
                >
                  {section.label && (
                    <span className="text-white/30 text-xs tracking-[0.35em] uppercase mb-5 block font-light">
                      {section.label}
                    </span>
                  )}

                  <h2 className="text-white font-outfit font-black tracking-tighter leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    {section.heading.map((line, li) => (
                      <span key={li} className="block">
                        {line}
                      </span>
                    ))}
                  </h2>

                  {section.subtext && (
                    <div
                      className={`flex flex-col gap-2.5 mt-2 max-w-lg
                        ${section.align === "left" ? "items-start" : ""}
                        ${section.align === "center" ? "items-center" : ""}
                        ${section.align === "right" ? "items-end" : ""}
                      `}
                    >
                      {section.subtext.map((t, ti) => (
                        <span key={ti} className="text-white/60 text-base md:text-lg lg:text-xl font-light tracking-wide leading-relaxed">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {section.isCta && (
                    <div className="flex flex-wrap gap-4 mt-8 pointer-events-auto">
                       
                       
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator - hide during other sections */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
            style={{ opacity: 0.2 }}
          >
            <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </div>
      </div>
    </>
  );
}
