import { useState } from "react";
import { Certificates } from "./components/Certificates";
import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { NeuralBackground } from "./components/NeuralBackground";
import { Projects } from "./components/Projects";
import { ResumeViewer } from "./components/ResumeViewer";
import { About, Achievements, Experience, Skills } from "./components/Sections";
import { profile } from "./data/portfolio";

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const openResume = () => setResumeOpen(true);

  return (
    <>
      <NeuralBackground />
      <Navbar onViewResume={openResume} />
      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <Hero onViewResume={openResume} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certificates />
        <Achievements />
        <Contact />
      </main>
      <footer className="border-t border-line py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {profile.name}
      </footer>
      <ResumeViewer open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
