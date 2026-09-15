import React from 'react';

const certifications = [
  { logo: "/logos/aws.png", link: "https://aws.amazon.com/verification" },
  { logo: "/logos/trm.png", link: "https://trmlabs.com" },
  { logo: "/logos/hackerrank.png", link: "https://hackerrank.com" },
  { logo: "/logos/datacamp.png", link: "https://datacamp.com" },
  { logo: "/logos/coursera.png", link: "https://coursera.org" },
  { logo: "/logos/aisg.png", link: "https://aisingapore.org" },
];

export const CertificationSection = () => {
  // We double the array to ensure the loop is seamless
  const scrollingLogos = [...certifications, ...certifications];

  return (
    <section className="py-16 w-full overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto px-6 mb-10">
         <h2 className="text-center text-sm font-black text-slate-400 tracking-[0.3em] uppercase">
           Certifications & Credentials
         </h2>
      </div>

      {/* THE MARQUEE CONTAINER */}
      <div className="relative flex overflow-hidden">
        
        {/* INNER SCROLLER */}
        <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
          {scrollingLogos.map((cert, idx) => (
            <a 
              key={idx}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 group"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 glass-card rounded-3xl flex items-center justify-center p-6 border border-white/40 shadow-lg group-hover:scale-110 group-hover:bg-white/40 transition-all duration-300">
                <img 
                  src={cert.logo} 
                  alt="Certification" 
                  className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/100x100?text=Cert"; }}
                />
              </div>
            </a>
          ))}
        </div>

        {/* FADE GRADIENTS ON EDGES (Makes it look cinematic) */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};