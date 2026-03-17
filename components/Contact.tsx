"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Gentle slide up for the main content
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pt-32 pb-8 px-6 md:px-12 lg:px-24 bg-[#050508] z-20 overflow-hidden relative" id="contact">
      <div className="max-w-[1400px] mx-auto min-h-[60vh] flex flex-col items-center justify-between text-center relative z-10" ref={textRef}>
        
        {/* Top: Next Step */}
        <div className="mt-12">
          <span className="text-white/20 text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold">
            NEXT STEP
          </span>
        </div>

        {/* Middle: Huge Headline */}
        <div className="flex flex-col items-center justify-center my-16 md:my-24 font-bold tracking-tighter leading-[0.95] text-[12vw] sm:text-7xl md:text-8xl lg:text-[9rem]">
          <h2 className="text-white">Let's build</h2>
          <h2>
            <span className="text-white/40">together</span>
            <span className="text-white">.</span>
          </h2>
        </div>

        {/* Bottom Contact Section */}
        <div className="flex flex-col items-center gap-12 sm:gap-16 w-full object-cover">
          
          {/* Email Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 group">
            <a href="mailto:shaiksuleman815@gmail.com?subject=Collaboration%20Inquiry&body=Hi%2C%0A%0AThanks%20for%20checking%20out%20my%20portfolio.%20I%E2%80%99m%20always%20open%20to%20collaborating%20on%20exciting%20projects%E2%80%94feel%20free%20to%20reach%20out.%0A%0ALooking%20forward%20to%20connecting%20with%20you." className="text-white/70 hover:text-white text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight transition-colors duration-300">
              shaiksuleman815@gmail.com
            </a>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-white/50 group-hover:text-white transition-colors duration-300" />
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-12 md:gap-16 text-xs md:text-sm text-white/40 font-semibold tracking-widest uppercase">
            <a href="https://www.linkedin.com/in/suleman-shaik-/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
              LINKEDIN
            </a>
            <a href="https://github.com/shaiksuleman786" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
              GITHUB
            </a>
          </div>

        </div>

        {/* Footer Base */}
        <div className="w-full mt-32 md:mt-48 flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 gap-6 md:gap-0">
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-white/30 text-[10px] md:text-xs tracking-widest uppercase font-medium">
            <div className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/50">
              S
            </div>
            <span>© 2026 Suleman Shaik - ALL RIGHTS RESERVED</span>
          </div>

          <div className="text-white/30 text-[10px] md:text-xs tracking-widest uppercase font-medium">
            DESIGNED WITH RESTRAINT
          </div>

        </div>

      </div>
    </section>
  );
}
