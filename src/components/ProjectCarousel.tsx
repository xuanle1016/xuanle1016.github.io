import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// =========================================================
// PROJECT DATA
// =========================================================

const projects = [
  {
    title: "Financial AI Commodity Risk Analysis",
    category: "AI & DATA SCIENCE",
    badge: "Graph RAG & FinBERT",

    shortDesc:
      "End-to-end commodity intelligence system using GraphRAG and hybrid retrieval for autonomous risk analysis.",

    fullDesc:
      "Developed an end-to-end commodity intelligence system using GraphRAG, hybrid retrieval, FinBERT sentiment scoring, and reflection-based generation for autonomous market risk analysis. Evaluated retrieval performance rigorously with formal metrics and automated report generation.",

    image:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tbW9kaXR5JTIwZ29sZHxlbnwwfHwwfHx8MA%3D%3D",

    tags: [
      "GraphRAG",
      "FinBERT",
      "LLM",
      "Python",
      "RAG",
      "Hybrid Retrieval"
    ],

    github: "https://github.com/nltyh/DSA4265-Project",
    live: "#"
  },

  {
    title: "YouTube Bias Detection Engine",
    category: "MACHINE LEARNING & NLP",
    badge: "NLP & GPT-4o Integration",

    shortDesc:
      "NLP-powered analytics platform analysing media bias and recommendation patterns from YouTube.",

    fullDesc:
      "An analytics platform that processes watch history data to detect algorithmic bias. Utilizes GPT-4o for nuanced sentiment analysis and Streamlit for real-time data visualization of recommendation patterns.",

    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800",

    tags: [
      "NLP",
      "Streamlit",
      "GPT-4o",
      "Analytics",
      "Python"
    ],

    github:
      "https://github.com/zhiminng/dsa3101-2510-social-04",

    live: "#"
  },

  {
    title: "Stock Prediction via Time Series & NLP",
    category: "AI & DATA SCIENCE",
    badge: "Ensemble Stacking & Sentiment",

    shortDesc:
      "Machine learning system combining news sentiment with stock prices for movement prediction.",

    fullDesc:
      "Combined NLP for news sentiment analysis (specifically Tesla news) with historical price data. Built using ensemble stacking methods to improve forecasting accuracy across volatile market regimes.",

    image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800",

    tags: [
      "NLP",
      "Time Series",
      "ML",
      "Forecasting",
      "Ensemble"
    ],

    github:
      "https://github.com/Ervinoreo/Stock-Prediction-using-Time-Series-Forecasting-and-NLP-Techniques",

    live: "#"
  },

  {
    title: "ML-Driven Crypto Portfolio Simulator",
    category: "QUANTITATIVE FINANCE",
    badge: "Market Regime Analysis",

    shortDesc:
      "Platform that dynamically allocates capital across assets based on weekly market signals.",

    fullDesc:
      "A simulation engine that uses machine learning to identify market regimes. It dynamically rebalances portfolios across crypto, growth stocks, and gold using macro indicators and gradient boosting signals.",

    image:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800",

    tags: [
      "ML",
      "Portfolio Optimization",
      "Boosting",
      "Streamlit"
    ],

    github:
      "https://github.com/xuanle1016/dse4211-ML-Trader",

    live: "#"
  }
];


// =========================================================
// COMPONENT
// =========================================================

export const ProjectCarousel = () => {

  const [selectedProject, setSelectedProject] = useState<any>(null);

  const sectionRef = useRef<HTMLElement>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);


  // =======================================================
  // GSAP CARD ANIMATION
  // =======================================================

  useEffect(() => {

    const timeout = setTimeout(() => {

      cardRefs.current.forEach((el) => {

        if (!el) return;

        gsap.set(el, {
          opacity: 0,
          y: 60
        });

        gsap.to(el, {
          opacity: 1,
          y: 0,
          ease: 'power2.out',

          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 1
          }
        });

      });

    }, 300);


    return () => {
      clearTimeout(timeout);
    };

  }, []);


  // =======================================================
  // CLOSE MODAL
  // =======================================================

  const closeModal = () => {
    setSelectedProject(null);
  };


  // =======================================================
  // RENDER
  // =======================================================

  return (

    <section
      ref={sectionRef}
      className="py-20 bg-transparent w-full relative"
    >

      {/* ===================================================
          PROJECT CAROUSEL
          =================================================== */}

      <Swiper

        effect="coverflow"

        grabCursor={true}

        centeredSlides={true}

        slidesPerView="auto"

        navigation={true}

        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: false
        }}

        modules={[
          EffectCoverflow,
          Pagination,
          Navigation
        ]}

        className="w-full py-10"
      >


        {/* =================================================
            PROJECT CARDS
            ================================================= */}

        {projects.map((project, index) => (

          <SwiperSlide
            key={index}
            className="w-[340px] md:w-[380px]"
          >

            <div
              ref={(el) => {
                cardRefs.current[index] = el;
              }}

              className="project-card flex flex-col h-[500px]"
            >


              {/* =========================================
                  PROJECT IMAGE
                  ========================================= */}

              <div className="relative h-44 overflow-hidden">

                <img
                  src={project.image}
                  className="w-full h-full object-cover"
                  alt={project.title}
                />


                {/* Badge */}

                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2">

                  <span className="text-cyan-400 text-xs">
                    ✦
                  </span>

                  <span className="text-white text-[11px] font-bold tracking-wide uppercase">
                    {project.badge}
                  </span>

                </div>

              </div>


              {/* =========================================
                  CARD BODY
                  ========================================= */}

              <div className="p-6 flex-1 flex flex-col">


                {/* Category */}

                <span className="project-category text-[12px] font-bold tracking-widest mb-2 uppercase">

                  {project.category}

                </span>


                {/* Title */}

                <h3 className="project-title text-xl font-bold leading-tight mb-3">

                  {project.title}

                </h3>


                {/* Description */}

                <p className="project-description text-sm leading-relaxed mb-4 line-clamp-3">

                  {project.shortDesc}

                </p>


                {/* =======================================
                    TECHNOLOGY TAGS
                    ======================================= */}

                <div className="flex flex-wrap gap-1.5 mt-auto mb-4">


                  {/* First 3 tags */}

                  {project.tags
                    .slice(0, 3)
                    .map((tag) => (

                      <span
                        key={tag}
                        className="project-tag px-2.5 py-1 text-[13px] font-bold rounded-md"
                      >

                        {tag}

                      </span>

                    ))}


                  {/* Remaining tag counter */}

                  {project.tags.length > 3 && (

                    <span className="project-tag-more px-2.5 py-1 text-[13px] font-bold rounded-md">

                      +{project.tags.length - 3}

                    </span>

                  )}

                </div>


                {/* =======================================
                    CARD FOOTER
                    ======================================= */}

                <div className="project-footer flex items-center justify-between pt-4">


                  {/* Learn More */}

                  <button
                    onClick={() => setSelectedProject(project)}

                    className="project-learn-more text-sm font-bold flex items-center gap-1 transition-colors"
                  >

                    Learn more

                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >

                      <line
                        x1="7"
                        y1="17"
                        x2="17"
                        y2="7"
                      />

                      <polyline
                        points="7 7 17 7 17 17"
                      />

                    </svg>

                  </button>


                  {/* GitHub Icon */}

                  <div className="project-icons flex gap-4 opacity-30">

                    <svg
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >

                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />

                    </svg>

                  </div>

                </div>

              </div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>


      {/* ===================================================
          PROJECT MODAL
          =================================================== */}

      {selectedProject && (

        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">


          {/* =============================================
              MODAL OVERLAY
              ============================================= */}

          <div
            className="project-modal-overlay absolute inset-0"

            onClick={closeModal}
          />


          {/* =============================================
              MODAL CONTAINER
              ============================================= */}

          <div className="project-modal relative w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">


            {/* =========================================
                CLOSE BUTTON
                ========================================= */}

            <button

              onClick={closeModal}

              className="project-modal-close absolute top-5 right-5 z-20 w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm"

              aria-label="Close project details"
            >

              ✕

            </button>


            {/* =========================================
                MODAL IMAGE
                ========================================= */}

            <div className="relative h-64">

              <img
                src={selectedProject.image}
                className="w-full h-full object-cover"
                alt={selectedProject.title}
              />


              {/* Badge */}

              <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2">

                <span className="text-cyan-400">
                  ✦
                </span>

                <span className="text-white text-xs font-bold uppercase tracking-wider">

                  {selectedProject.badge}

                </span>

              </div>

            </div>


            {/* =========================================
                MODAL CONTENT
                ========================================= */}

            <div className="p-8 md:p-10">


              {/* Category */}

              <span className="project-modal-category text-xs font-bold tracking-[0.3em] uppercase mb-4 block">

                {selectedProject.category}

              </span>


              {/* Title */}

              <h2 className="project-modal-title text-3xl font-bold mb-6 leading-tight">

                {selectedProject.title}

              </h2>


              {/* Description */}

              <p className="project-modal-description text-base leading-relaxed mb-8">

                {selectedProject.fullDesc}

              </p>


              {/* =======================================
                  TECHNOLOGIES
                  ======================================= */}

              <div className="mb-8">


                <h4 className="project-modal-skills-title text-[11px] font-bold uppercase tracking-widest mb-4">

                  Technologies & Skills

                </h4>


                <div className="flex flex-wrap gap-2">

                  {selectedProject.tags.map(
                    (tag: string) => (

                      <span
                        key={tag}
                        className="project-modal-tag px-3 py-1.5 text-[13px] font-bold rounded-lg"
                      >

                        {tag}

                      </span>

                    )
                  )}

                </div>

              </div>


              {/* =======================================
                  ACTION BUTTONS
                  ======================================= */}

              <div className="project-modal-actions flex flex-col md:flex-row gap-4 pt-6">


                {/* GitHub */}

                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"

                  className="project-github-button flex-1 text-base font-bold py-4 rounded-2xl text-center transition-all flex items-center justify-center gap-2"
                >

                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >

                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />

                  </svg>


                  View on GitHub

                </a>

              </div>

            </div>

          </div>

        </div>

      )}

    </section>
  );
};