import React, { RefObject, useEffect, useRef } from 'react';
import { RibbonWavesBackground } from './RibbonWavesBackground';
import { RibbonConfig } from '../types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  heroRef: RefObject<HTMLDivElement>;
  ribbonConfig: RibbonConfig;
}

export const HeroSection = ({ heroRef, ribbonConfig }: HeroSectionProps) => {
  // Local Refs for the elements inside this component
  const maskRef = useRef<HTMLHeadingElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Ensure all elements exist before animating
    if (!heroRef.current || !maskRef.current || !headingRef.current || !descRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial hidden states
      gsap.set(maskRef.current, { opacity: 0, scale: 12 });
      gsap.set(headingRef.current, { opacity: 0, y: 40 });
      gsap.set(descRef.current, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".transition-section",
          start: "top top",
          end: "bottom top",
          scrub: 0.8, // Smoothly ties animation to scroll
          pin: true,  // Freezes the screen during the transition
        },
      });

      // ─────────────────────────
      // STAGE 1 — HERO FADES & MASK SHRINKS (The "Sucking" Effect)
      // ─────────────────────────
      tl.to(heroRef.current, {
        autoAlpha: 0,        // Fades opacity and handles visibility
        pointerEvents: "none",
        duration: 1,
      }, 0);

      tl.fromTo(maskRef.current, 
        { opacity: 0, scale: 12 }, // Start massive (glitch-safe scale)
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1, 
          ease: "power2.inOut" 
        }, 
        0 // Starts at the exact same time as hero fade
      );

      // ─────────────────────────
      // STAGE 2 — TEXT REVEAL
      // ─────────────────────────
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, ">-0.2");

      tl.to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, ">-0.1");

    });

    return () => ctx.revert(); // Cleanup on unmount
  }, [heroRef]); // Re-run if heroRef changes

  return (
    <>
      {/* 1. THE HERO OVERLAY (The landing view) */}
      <div ref={heroRef} className="hero-overlay">
        <div className="flex flex-col">
          <div className="hero-name-container">
            <span className="hero-name-intro">Hi, I'm</span>
            <span className="hero-name-line">Xuan Le</span>
          </div>

          <div className="hero-sub">
            <span>AI</span> | <span>DATA</span> | <span>CLOUD</span>
          </div>

          <div className="social-bar">
            <a href="https://github.com/xuanle1016" target="_blank" rel="noreferrer" className="social-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://linkedin.com/in/xuan-le-sew" target="_blank" rel="noreferrer" className="social-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="mailto: xuanlesew@gmail.com" className="social-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
            <a href="tel:+65 81516030" className="social-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </a>
          </div>
        </div>
      </div>

      <RibbonWavesBackground config={ribbonConfig} />

      {/* 2. THE TRANSITION CONTENT (Now using Refs) */}
      <div className="relative z-10">
        <section id="about" className="transition-section">
          <div className="transition-content">
            {/* Added ref={maskRef} */}
            <h1 ref={maskRef} className="about-me-mask">ABOUT ME</h1>
            
            <div className="about-reveal-content">
               {/* Added ref={headingRef} */}
               <h2 ref={headingRef} className="about-heading">Data Science, Cloud Computing & Applied AI</h2>
               
               {/* Added ref={descRef} */}
               <p ref={descRef} className="about-description">
              I am a Data Science and Analytics graduate from the National University of Singapore (NUS). 
              My core focus lies in data analytics, artificial intelligence, and cloud technologies, 
              with a passion for turning data into meaningful insights and intelligent solutions.

               </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};