"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Award, BookOpen, Layout, Video, Trophy, ChevronRight } from "lucide-react";

type Category = "COURSE" | "PROJECT" | "WEBINAR" | "HACKATHON";

const CATEGORIES: { id: Category; label: string; icon: any }[] = [
  { id: "COURSE", label: "Courses", icon: BookOpen },
  { id: "PROJECT", label: "Projects", icon: Layout },
  { id: "WEBINAR", label: "Webinars", icon: Video },
  { id: "HACKATHON", label: "Hackathons", icon: Trophy },
];

const CERTIFICATES = [
  {
    id: 1,
    title: "The Joy of Computing using Python",
    issuer: "NPTEL (IIT Madras)",
    type: "COURSE" as Category,
    date: "Apr 2025",
    image: "https://i.ibb.co/j96jxrYj/nptel.jpg",
    color: "#4ade80", // Emerald
    link: "https://i.ibb.co/j96jxrYj/nptel.jpg",
  },
  {
    id: 2,
    title: "Introduction to Databases",
    issuer: "NxtWave CCBP 4.0 Academy",
    type: "COURSE" as Category,
    date: "Jul 2025",
    image: "https://i.ibb.co/23CWVYKx/sql.jpg",
    link: "https://certificates.ccbp.in/academy/introduction-to-databases?id=TVVKAXFDEU",
    color: "#3b82f6", // Blue
  },
  {
    id: 3,
    title: "SQL (Basic)",
    issuer: "HackerRank",
    type: "COURSE" as Category,
    date: "Jun 2024",
    image: "https://i.im.ge/2026/03/16/eK0faJ.mysql.png",
    link: "https://www.hackerrank.com/certificates/iframe/312c5a375c02",
    color: "#f59e0b", // Amber
  },
  {
    id: 4,
    title: "Build Your Own Static Website",
    issuer: "NxtWave CCBP 4.0 Academy",
    type: "PROJECT" as Category,
    date: "Apr 2024",
    image: "https://i.im.ge/2026/03/17/eK0zpS.htmlandcss.jpeg",
    link: "https://certificates.ccbp.in/academy/static-website?id=LCUJDDOGGK",
    color: "#f43f5e", // Rose
  },
  {
    id: 5,
    title: "Build Your Own Responsive Website",
    issuer: "NxtWave CCBP 4.0 Academy",
    type: "PROJECT" as Category,
    date: "Apr 2024",
    image: "https://i.im.ge/2026/03/17/eK0p1z.bootstrapflexbox.jpeg",
    link: "https://certificates.ccbp.in/academy/build-your-own-responsive-website?id=ZUMBVFHJIV",
    color: "#8b5cf6", // Violet
  },
  // Placeholders for Webinars & Hackathons
  {
    id: 6,
    title: "Introduction to SQL",
    issuer: "SoloLearn",
    type: "COURSE" as Category,
    date: "Jun 2024",
    image: "https://i.ibb.co/PsR5bWBr/5661a251-5138-43c3-b465-5d89f7e939a9.jpg",
    color: "#ffffff",
    link: "https://i.ibb.co/PsR5bWBr/5661a251-5138-43c3-b465-5d89f7e939a9.jpg",
  },
  {
    id: 7,
    title: "Aadhrita Hack24 – Certificate of Recognition",
    issuer: "MVGR College of Engineering",
    type: "HACKATHON" as Category,
    date: "Mar 2026",
    image: "https://i.ibb.co/8LXkqj0t/mvgr.jpg",
    color: "#ffffff",
    link: "https://hacksphere.in/certificates/HRC-CERT-38915DB65C",
  },
  {
    id: 8,
    title: "Brain Fitness for High Achievers",
    issuer: "NxtWave | CCBP 4.0 Academy",
    type: "WEBINAR" as Category,
    date: "Mar 2025",
    image: "https://i.ibb.co/V0s1DQZd/9-V2-IO5-QELK.png",
    color: "#1e40af",
    link: "https://i.ibb.co/V0s1DQZd/9-V2-IO5-QELK.png",
  },
  {
    id: 9,
    title: "NxtCode AI Challenge – 25 Under 5",
    issuer: "NxtWave | CCBP 4.0 Academy",
    type: "HACKATHON" as Category,
    date: "Feb 2025",
    image: "https://i.ibb.co/PZqkFg9N/5-VL3-CZOYTC.png",
    color: "#020617",
    link: "https://i.ibb.co/PZqkFg9N/5-VL3-CZOYTC.png",
  },
  {
    id: 10,
    title: "Model Context Protocol Workshop",
    issuer: "NxtWave | CCBP 4.0 Academy",
    type: "WEBINAR" as Category,
    date: "Aug 2025",
    image: "https://i.ibb.co/s9V93fRf/65-CVY2-X5-ZW.png",
    color: "#f1f5f9",
    link: "https://i.ibb.co/s9V93fRf/65-CVY2-X5-ZW.png",
  },
  {
    id: 11,
    title: "NxtCode AI Challenge – Participation",
    issuer: "NxtWave | CCBP 4.0 Academy",
    type: "HACKATHON" as Category,
    date: "Feb 2025",
    image: "https://i.ibb.co/7Jq1dy8d/AFLEXZUWQ3.png",
    color: "#020617",
    link: "https://i.ibb.co/7Jq1dy8d/AFLEXZUWQ3.png",
  },
  {
    id: 12,
    title: "Beyond Tech: Skills that make you unstoppable",
    issuer: "NxtWave | CCBP 4.0 Academy",
    type: "WEBINAR" as Category,
    date: "Oct 2024",
    image: "https://i.ibb.co/RGj7b7tZ/AXJA54-IMGQ.png",
    color: "#020617",
    link: "https://i.ibb.co/RGj7b7tZ/AXJA54-IMGQ.png",
  },
  {
    id: 13,
    title: "MCP Project Completion",
    issuer: "NxtWave | CCBP 4.0 Academy",
    type: "PROJECT" as Category,
    date: "Aug 2025",
    image: "https://i.ibb.co/d0qcLTVd/AYSP9-Q0-K00.png",
    color: "#f8fafc",
    link: "https://i.ibb.co/d0qcLTVd/AYSP9-Q0-K00.png",
  },
  {
    id: 14,
    title: "NxtCode – 7 Under 7 Challenge",
    issuer: "NxtWave | CCBP 4.0 Academy",
    type: "HACKATHON" as Category,
    date: "Oct 2024",
    image: "https://i.ibb.co/9P7BNcw/nxt.jpg",
    color: "#ffffff",
    link: "https://i.ibb.co/9P7BNcw/nxt.jpg",
  },
  {
    id: 15,
    title: "NxtCode – 7 Under 7 (7 Day Milestone)",
    issuer: "NxtWave | CCBP 4.0 Academy",
    type: "HACKATHON" as Category,
    date: "Oct 2024",
    image: "https://i.ibb.co/Z6PZD06D/nxt2.jpg",
    color: "#0b0b0b",
    link: "https://i.ibb.co/Z6PZD06D/nxt2.jpg",
  },
  {
    id: 16,
    title: "NxtCode – 21 Day Milestone",
    issuer: "NxtWave | CCBP 4.0 Academy",
    type: "HACKATHON" as Category,
    date: "May 2024",
    image: "https://i.ibb.co/rR7Tq0th/nxt-c.png",
    color: "#ffffff",
    link: "https://i.ibb.co/rR7Tq0th/nxt-c.png",
  },
  {
    id: 17,
    title: "NxtCode Challenge – Participation",
    issuer: "NxtWave | CCBP 4.0 Academy",
    type: "HACKATHON" as Category,
    date: "May 2024",
    image: "https://i.ibb.co/bgCvp8cw/nxt-c2.png",
    color: "#ffffff",
    link: "https://i.ibb.co/bgCvp8cw/nxt-c2.png",
  },
  {
    id: 18,
    title: "Future Engineers – Google Podcast",
    issuer: "NxtWave | CCBP 4.0 Academy",
    type: "WEBINAR" as Category,
    date: "Aug 2025",
    image: "https://i.ibb.co/3yD7dcB1/OR3-OCWWUXM.png",
    color: "#020617",
    link: "https://i.ibb.co/3yD7dcB1/OR3-OCWWUXM.png",
  },
  {
    id: 19,
    title: "GenAI Buildathon – Generative AI Mastery Workshop",
    issuer: "OpenAI Academy x NxtWave",
    type: "HACKATHON" as Category,
    date: "Aug 2025",
    image: "https://i.ibb.co/bRB2qsT9/RU2-LYNT9-EO.png",
    color: "#020617",
    link: "https://i.ibb.co/bRB2qsT9/RU2-LYNT9-EO.png",
  },
  {
    id: 20,
    title: "How to Become a World Class Engineer",
    issuer: "NxtWave | CCBP 4.0 Academy",
    type: "WEBINAR" as Category,
    date: "Nov 2024",
    image: "https://i.ibb.co/DPyhRwdv/SLNICXN4-XT.png",
    color: "#ffffff",
    link: "https://i.ibb.co/DPyhRwdv/SLNICXN4-XT.png",
  },
  {
    id: 21,
    title: "Autonomous Vehicles – Career Masterclass",
    issuer: "NxtWave | CCBP 4.0 Academy",
    type: "WEBINAR" as Category,
    date: "Apr 2025",
    image: "https://i.ibb.co/sdX6WKwR/VKSXSAAFAO.png",
    color: "#020617",
    link: "https://i.ibb.co/sdX6WKwR/VKSXSAAFAO.png",
  },
  {
    id: 22,
    title: "UI/UX Mega Workshop",
    issuer: "NxtWave | CCBP 4.0 Academy",
    type: "WEBINAR" as Category,
    date: "Dec 2024",
    image: "https://i.ibb.co/93ST1WzW/Whats-App-Image-2024-12-24-at-00-54-39-d9c00233.jpg",
    color: "#ffffff",
    link: "https://i.ibb.co/93ST1WzW/Whats-App-Image-2024-12-24-at-00-54-39-d9c00233.jpg",
  },
];

function CertificateCard({ cert }: { cert: typeof CERTIFICATES[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-[360px] rounded-[2rem] overflow-hidden bg-[#0A0A0F] border-[1.5px] border-white/60 hover:border-white transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{ boxShadow: `inset 0 0 50px ${cert.color}20, 0 0 25px ${cert.color}10` }}
      />
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0" style={{ transform: "translateZ(-10px)" }}>
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        {/* Minimal Gradient for clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
      </div>

      {/* Glass Content Overlay */}
      <div className="absolute inset-x-4 bottom-4 z-10 p-6 rounded-[1.5rem] bg-black/40 backdrop-blur-xl border border-white/5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500" style={{ transform: "translateZ(30px)" }}>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
              {cert.issuer}
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase">
              {cert.date}
            </span>
          </div>
          <h3 className="text-white text-lg font-bold leading-tight group-hover:text-white transition-colors">
            {cert.title}
          </h3>

          <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">View Credential</span>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Floating Badge (Top Right) */}
      <div className="absolute top-6 right-6 z-10" style={{ transform: "translateZ(50px)" }}>
        <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
          <ExternalLink className="w-4 h-4 text-white group-hover:text-black transition-colors" />
        </div>
      </div>

      {/* Dynamic Glow Line */}
      <div
        className="absolute bottom-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ backgroundColor: cert.color, boxShadow: `0 0 20px ${cert.color}` }}
      />
    </motion.a>
  );
}

export default function Certificates() {
  const [activeTab, setActiveTab] = useState<Category>("COURSE");

  const filteredCerts = CERTIFICATES.filter((cert) => cert.type === activeTab);

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#050505] relative overflow-hidden" id="certificates">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col gap-12 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-emerald-500/30" />
              <span className="text-emerald-400 text-[10px] md:text-sm tracking-[0.5em] uppercase font-bold">
                Achievements & Credits
              </span>
            </div>
            <h2 className="text-white font-bold tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl leading-[1]">
              A journey of <span className="text-white/30">excellence</span> expressed in credentials.
            </h2>
          </div>

          {/* New Modern Tabs */}
          <div className="flex flex-wrap items-center gap-4">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              const count = CERTIFICATES.filter(c => c.type === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-500 ${isActive
                      ? "bg-white border-white text-black"
                      : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/20 hover:text-white"
                    }`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                  <span className="text-xs font-bold tracking-widest uppercase">{cat.label}</span>
                  <span className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full border ${isActive ? "bg-black/5 border-black/10 text-black" : "bg-white/5 border-white/10 text-white/20"
                    }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtered Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <CertificateCard key={cert.id} cert={cert} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCerts.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-white/10" />
            </div>
            <h3 className="text-white/40 font-bold tracking-widest uppercase mb-2">No Certificates Found</h3>
            <p className="text-white/10 text-sm max-w-xs uppercase tracking-tighter">Add your latest achievements to this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
