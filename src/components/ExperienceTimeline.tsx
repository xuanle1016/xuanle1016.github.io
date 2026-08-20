import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Keppel Ltd.",
    role: "Data Analyst Intern",
    date: "Jun 2025 – Dec 2025",
    location: "Singapore",
    description: [
      "Developed an automated Python-based ETL pipeline scraping 100+ financial news articles weekly.",
      "Implemented RAG using AWS Bedrock for AI-powered analysis of large financial datasets.",
      "Designed scalable AWS architecture using S3, RDS, and DynamoDB.",
      "Developed analytics dashboards to monitor pipeline health and data quality."
    ],
    tags: ["Python", "AWS", "RAG", "LLM"],
    color: "from-cyan-400 to-blue-500"
  },
  {
    company: "National University of Singapore",
    role: "Data Analysis Assistant",
    date: "Jan 2025 – May 2025",
    location: "Singapore",
    description: [
      "Built interactive Power BI dashboards tracking 1,000+ funding agreements.",
      "Analyzed allocation datasets using Python and Power Query to identify strategic trends.",
      "Processed and standardized agreement data to ensure consistency across workflows."
    ],
    tags: ["Power BI", "Python", "Power Query", "Data Analytics"],
    color: "from-purple-400 to-pink-500"
  },
  {
    company: "Sony Electronics Singapore",
    role: "Business Intelligence Analyst",
    date: "May 2024 – Aug 2024",
    location: "Singapore",
    description: [
      "Transformed CrowdStrike cybersecurity datasets into actionable Power BI dashboards.",
      "Implemented bilingual (English–Japanese) reporting using Power BI Translation Builder.",
      "Designed standardized identifier naming conventions for improved data governance."
    ],
    tags: ["Power BI", "ETL", "Data Governance", "Data Visualization"],
    color: "from-green-400 to-cyan-500"
  }
];

export const ExperienceTimeline = () => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current.forEach((el) => {
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
    <section className="py-20 bg-transparent w-full relative">
      <div className="max-w-6xl mx-auto px-4">

        <div className="relative">
          {/* VERTICAL LINE */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full opacity-30 rounded-full hidden md:block" style={{background: 'linear-gradient(to bottom, var(--theme-from), var(--theme-via), var(--theme-to))'}}></div>

          {experiences.map((exp, index) => (
            <div key={index} ref={(el) => { itemRefs.current[index] = el; }} className={`relative mb-20 flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* DATE PILL */}
              <div className={`md:w-1/2 flex z-10 mb-6 md:mb-0 ${index % 2 === 0 ? 'justify-start md:justify-start pl-4 md:pl-8' : 'justify-start md:justify-end pr-4 md:pr-8'}`}>
                <div className="px-6 py-2 rounded-full text-white font-bold text-base shadow-lg shadow-black/10" style={{background: 'linear-gradient(to right, var(--theme-from), var(--theme-via))'}}>
                  {exp.date}
                </div>
              </div>

              {/* CENTER DOT */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-slate-800 z-20 hidden md:block"></div>

              {/* CONTENT CARD */}
              <div className="md:w-1/2 w-full px-4 md:px-12">
                <div className="glass-card p-8 rounded-[2rem] border border-white/50 shadow-xl hover:scale-[1.04] hover:shadow-2xl transition-all duration-300">
                  <span className="text-sm font-bold tracking-widest uppercase" style={{background: 'linear-gradient(to right, var(--theme-from), var(--theme-via))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>
                    {exp.location}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{exp.role}</h3>
                  <p className="text-xl font-bold text-slate-700 mb-4">{exp.company}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-base text-slate-600 leading-relaxed flex gap-2">
                        <span className="text-cyan-500">•</span> {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-white/40 rounded-lg text-xs font-bold text-slate-500 border border-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};