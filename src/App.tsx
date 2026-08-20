import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroSection } from './components/HeroSection';
import { ProjectCarousel } from './components/ProjectCarousel';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsSection } from './components/SkillsSection';
// import { CertificationSection } from './components/CertificationSection';
import { Navbar } from './components/NavBar';
import { RibbonCustomizerDrawer } from './components/RibbonCustomizerDrawer';
import { RibbonConfig } from './types';
import { DEFAULT_RIBBON_CONFIG } from './data/defaultProfile';

gsap.registerPlugin(ScrollTrigger);

const PRESET_THEMES: Record<RibbonConfig['preset'], { from: string; via: string; to: string; accent: string }> = {
  'rainbow-silk':   { from: '#06b6d4', via: '#a855f7', to: '#ec4899', accent: '#3b82f6' },
  'ocean-breeze':   { from: '#2dd4bf', via: '#0ea5e9', to: '#4f46e5', accent: '#38bdf8' },
  'aurora-violet':  { from: '#38bdf8', via: '#a855f7', to: '#f43f5e', accent: '#c084fc' },
  'sunset-glow':    { from: '#eab308', via: '#f97316', to: '#d946ef', accent: '#ef4444' },
  'emerald-spring': { from: '#4ade80', via: '#14b8a6', to: '#3b82f6', accent: '#06b6d4' },
};

function App() {
  // We only need the ref for the Hero Overlay to pass it down
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [ribbonConfig, setRibbonConfig] = useState<RibbonConfig>(DEFAULT_RIBBON_CONFIG);

  useEffect(() => {
    const theme = PRESET_THEMES[ribbonConfig.preset];
    const root = document.documentElement;
    root.style.setProperty('--theme-from', theme.from);
    root.style.setProperty('--theme-via', theme.via);
    root.style.setProperty('--theme-to', theme.to);
    root.style.setProperty('--theme-accent', theme.accent);
  }, [ribbonConfig.preset]);
  
  // Refs for section title animations
  const projectsTitleRef = useRef<HTMLHeadingElement | null>(null);
  const experienceTitleRef = useRef<HTMLHeadingElement | null>(null);
  const skillsTitleRef = useRef<HTMLHeadingElement | null>(null);
  const certsTitleRef = useRef<HTMLHeadingElement | null>(null);
  const projectsSectionRef = useRef<HTMLDivElement | null>(null);
  const experienceSectionRef = useRef<HTMLDivElement | null>(null);
  const skillsSectionRef = useRef<HTMLDivElement | null>(null);

  // Scroll animation for Section Titles
  useEffect(() => {
    const titles = [
      projectsTitleRef.current,
      experienceTitleRef.current,
      skillsTitleRef.current,
      certsTitleRef.current
    ];

    titles.forEach((title) => {
      if (!title) return;
      gsap.set(title, { opacity: 0, y: 60 });
      gsap.to(title, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
        },
      });
    });
  }, []);

  return (
    <div className="relative min-h-screen">
        <Navbar onRibbonFxClick={() => setDrawerOpen(true)} />
        {/* All Hero/About logic is now self-contained here */}
        <HeroSection heroRef={heroRef} ribbonConfig={ribbonConfig} />

        {/* This container sits below the pinned About Me section */}
        <div className="relative z-10000 bg-transparent">

            {/* 1. PROJECTS CAROUSEL */}
            <div id="projects" ref={projectsSectionRef} className="py-20">
              <h2 ref={projectsTitleRef} className="projects-title">PROJECTS</h2>
              <ProjectCarousel />
            </div>

            {/* 2. WORK EXPERIENCE */}
            <div id="experience" ref={experienceSectionRef} className="py-20">
              <h2 ref={experienceTitleRef} className="projects-title">WORK EXPERIENCE</h2>
              <ExperienceTimeline />
            </div>
            
            {/* 3. SKILLS SECTION */}
            <div id="skills" ref={skillsSectionRef} className="py-20">
              <h2 ref={skillsTitleRef} className="projects-title">TECHNICAL STACK</h2>
              <SkillsSection />
            </div>


            {/* 4. CERTIFICATIONS
            <div className="py-20">
              <CertificationSection />
            </div> */}


            {/* FOOTER */}
            <footer id="contact" className="py-20 text-center border-slate-100">
              <p className="text-slate-400 font-bold tracking-[0.3em] text-xs uppercase mb-6">Connect with me</p>
              <div className="flex justify-center gap-6 font-black text-slate-900 text-sm">
                <a href="https://github.com/xuanle1016" className="transition-colors hover:opacity-70">GITHUB</a>
                <span className="text-slate-300">|</span>
                <a href="https://linkedin.com/in/xuan-le-sew" className="transition-colors hover:opacity-70">LINKEDIN</a>
                <span className="text-slate-300">|</span>
                <a href="mailto:xuanlesew@gmail.com" className="transition-colors hover:opacity-70">EMAIL</a>
              </div>

              <p className="mt-5 text-xs text-slate-400 font-bold tracking-[0.1em] uppercase">© 2026 XUAN LE</p>
            </footer>
        </div>

        <RibbonCustomizerDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          config={ribbonConfig}
          onChange={setRibbonConfig}
        />
    </div>
  );
}

export default App;