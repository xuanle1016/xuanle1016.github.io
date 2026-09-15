import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: "Programming",
    emoji: "💻",
    skills: ["Python (Pandas, NumPy)", "Scikit-Learn", "TensorFlow", "R Language", "SQL / Postgres"],
    color: "cyan",
    gradient: "from-cyan-400 to-blue-500",
    icon: "code"
  },
  {
    category: "Data & AI",
    emoji: "🤖",
    skills: ["ETL Pipelines", "Web Scraping", "NLP / LLMs", "Machine Learning", "RAG / Bedrock"],
    color: "purple",
    gradient: "from-purple-400 to-pink-500",
    icon: "cpu"
  },
  {
    category: "Cloud",
    emoji: "☁️",
    skills: ["AWS (S3, RDS, DynamoDB, Lambda, ECS, EC2)", "Git", "Docker Containers"],
    color: "emerald",
    gradient: "from-emerald-400 to-teal-500",
    icon: "cloud"
  },
  {
    category: "Visualization",
    emoji: "📊",
    skills: ["Power BI", "Streamlit", "Excel", "React.js"],
    color: "orange",
    gradient: "from-orange-400 to-red-500",
    icon: "bar-chart"
  }
];

const PILLAR_GRADIENTS = [
  { from: 'var(--theme-from)', to: 'var(--theme-accent)' },
  { from: 'var(--theme-accent)', to: 'var(--theme-via)' },
  { from: 'var(--theme-via)', to: 'var(--theme-to)' },
  { from: 'var(--theme-from)', to: 'var(--theme-to)' },
];

export const SkillsSection = () => {
  const pillarsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    pillarsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 60 });
      gsap.to(el, {
        opacity: 1, y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
        },
      });
    });
  }, []);

  return (
    <section className="py-24 w-full relative z-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* 4 PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillGroups.map((group, idx) => {
            const pg = PILLAR_GRADIENTS[idx];
            const gradientStyle = { background: `linear-gradient(to right, ${pg.from}, ${pg.to})` };
            const gradientTextStyle = { ...gradientStyle, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' };
            return (
            <div
              key={idx}
              ref={(el) => { pillarsRef.current[idx] = el; }}
              className="glass-card group relative flex flex-col rounded-[2rem] border border-white/40 overflow-hidden hover:scale-[1.04] hover:shadow-2xl transition-all duration-300 shadow-xl"
            >
              {/* TOP COLOR BAR */}
              <div className="h-2 w-full" style={gradientStyle}></div>
              
              <div className="p-8 flex flex-col h-full">
                {/* PILLAR TITLE */}
                <h3 className="text-xl font-black mb-6 uppercase tracking-wider flex items-center gap-2">
                  <span style={{WebkitTextFillColor: 'initial', color: 'initial'}}>{group.emoji}</span>
                  <span style={gradientTextStyle}>{group.category}</span>
                </h3>

                {/* SKILLS LIST */}
                <ul className="space-y-4 flex-1">
                  {group.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-3 text-slate-700 font-medium text-base">
                      <div className="w-1.5 h-1.5 rounded-full" style={gradientStyle}></div>
                      {skill}
                    </li>
                  ))}
                </ul>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 to-transparent rounded-[2rem]" />
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};