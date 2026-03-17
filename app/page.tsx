import FaceScroll from "@/components/FaceScroll";
import About from "@/components/About";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-black min-h-screen font-sans selection:bg-white/30">
      <FaceScroll />
      <About />
      <Services />
      <TechStack />
      <Projects />
      <Certificates />
      <Experience />
      <Contact />
    </main>
  );
}
