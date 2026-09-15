import React, { useEffect, useRef } from 'react';
import { RibbonConfig } from '../types';

interface RibbonWavesBackgroundProps {
  config: RibbonConfig;
}

interface Point {
  x: number;
  y: number;
}

interface RibbonWave {
  baseYFactor: number;
  startXFactor: number;
  amplitudeX: number;
  amplitudeY: number;
  wavelength: number;
  phaseSpeed: number;
  phase: number;
  colorStops: { stop: number; color: string }[];
  strands: number;
  strandSpread: number;
  type: 'top-sweep' | 'left-loop' | 'diagonal-flow';
}

const PRESET_PALETTES: Record<RibbonConfig['preset'], { stop: number; color: string }[][]> = {
  'rainbow-silk': [
    // Primary rainbow top arc (Green -> Cyan -> Royal Blue -> Magenta -> Red -> Yellow)
    [
      { stop: 0.0, color: 'rgba(34, 197, 94, 0.85)' },    // Green
      { stop: 0.2, color: 'rgba(6, 182, 212, 0.85)' },    // Cyan
      { stop: 0.4, color: 'rgba(59, 130, 246, 0.85)' },   // Blue
      { stop: 0.65, color: 'rgba(168, 85, 247, 0.85)' },  // Purple
      { stop: 0.82, color: 'rgba(236, 72, 153, 0.85)' },  // Pink/Magenta
      { stop: 1.0, color: 'rgba(245, 158, 11, 0.85)' },   // Amber
    ],
    // Left cascading ribbon loop (Cyan -> Deep Blue -> Violet -> Rose)
    [
      { stop: 0.0, color: 'rgba(16, 185, 129, 0.8)' },
      { stop: 0.25, color: 'rgba(14, 165, 233, 0.85)' },
      { stop: 0.55, color: 'rgba(99, 102, 241, 0.85)' },
      { stop: 0.8, color: 'rgba(217, 70, 239, 0.8)' },
      { stop: 1.0, color: 'rgba(244, 63, 94, 0.75)' },
    ],
    // Secondary sheer pink & gold wave veil
    [
      { stop: 0.0, color: 'rgba(236, 72, 153, 0.5)' },
      { stop: 0.4, color: 'rgba(244, 114, 182, 0.6)' },
      { stop: 0.75, color: 'rgba(251, 146, 60, 0.6)' },
      { stop: 1.0, color: 'rgba(234, 179, 8, 0.5)' },
    ],
    // Accent electric blue strand
    [
      { stop: 0.0, color: 'rgba(6, 182, 212, 0.9)' },
      { stop: 0.5, color: 'rgba(37, 99, 235, 0.9)' },
      { stop: 1.0, color: 'rgba(147, 51, 234, 0.85)' },
    ],
  ],
  'ocean-breeze': [
    [
      { stop: 0.0, color: 'rgba(45, 212, 191, 0.85)' },
      { stop: 0.35, color: 'rgba(14, 165, 233, 0.85)' },
      { stop: 0.7, color: 'rgba(37, 99, 235, 0.85)' },
      { stop: 1.0, color: 'rgba(79, 70, 229, 0.85)' },
    ],
    [
      { stop: 0.0, color: 'rgba(6, 182, 212, 0.8)' },
      { stop: 0.5, color: 'rgba(59, 130, 246, 0.85)' },
      { stop: 1.0, color: 'rgba(99, 102, 241, 0.8)' },
    ],
    [
      { stop: 0.0, color: 'rgba(125, 211, 252, 0.6)' },
      { stop: 0.6, color: 'rgba(96, 165, 250, 0.6)' },
      { stop: 1.0, color: 'rgba(167, 139, 250, 0.5)' },
    ],
  ],
  'aurora-violet': [
    [
      { stop: 0.0, color: 'rgba(56, 189, 248, 0.85)' },
      { stop: 0.4, color: 'rgba(168, 85, 247, 0.85)' },
      { stop: 0.75, color: 'rgba(236, 72, 153, 0.85)' },
      { stop: 1.0, color: 'rgba(244, 63, 94, 0.8)' },
    ],
    [
      { stop: 0.0, color: 'rgba(129, 140, 248, 0.85)' },
      { stop: 0.5, color: 'rgba(192, 132, 252, 0.85)' },
      { stop: 1.0, color: 'rgba(244, 114, 182, 0.8)' },
    ],
  ],
  'sunset-glow': [
    [
      { stop: 0.0, color: 'rgba(234, 179, 8, 0.85)' },
      { stop: 0.35, color: 'rgba(249, 115, 22, 0.85)' },
      { stop: 0.7, color: 'rgba(239, 68, 68, 0.85)' },
      { stop: 1.0, color: 'rgba(217, 70, 239, 0.85)' },
    ],
    [
      { stop: 0.0, color: 'rgba(251, 191, 36, 0.8)' },
      { stop: 0.5, color: 'rgba(244, 63, 94, 0.85)' },
      { stop: 1.0, color: 'rgba(168, 85, 247, 0.8)' },
    ],
  ],
  'emerald-spring': [
    [
      { stop: 0.0, color: 'rgba(74, 222, 128, 0.85)' },
      { stop: 0.4, color: 'rgba(20, 184, 166, 0.85)' },
      { stop: 0.75, color: 'rgba(6, 182, 212, 0.85)' },
      { stop: 1.0, color: 'rgba(59, 130, 246, 0.8)' },
    ],
  ],
};

export const RibbonWavesBackground: React.FC<RibbonWavesBackgroundProps> = ({ config }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!config.interactiveMouse) return;
      mousePos.current.targetX = e.clientX;
      mousePos.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initial mouse placement
    mousePos.current.x = width * 0.5;
    mousePos.current.y = height * 0.3;
    mousePos.current.targetX = width * 0.5;
    mousePos.current.targetY = height * 0.3;

    const paletteList = PRESET_PALETTES[config.preset] || PRESET_PALETTES['rainbow-silk'];

    // Setup ribbons
    const ribbons: RibbonWave[] = [
      // Ribbon 1: Arching across the top from left to right (Primary Rainbow)
      {
        baseYFactor: 0.12,
        startXFactor: -0.05,
        amplitudeX: 60,
        amplitudeY: 45,
        wavelength: 0.0028,
        phaseSpeed: 0.009,
        phase: 0,
        colorStops: paletteList[0 % paletteList.length],
        strands: 18,
        strandSpread: 22,
        type: 'top-sweep',
      },
      // Ribbon 2: Secondary wide sheer pink/violet arch lower across top
      {
        baseYFactor: 0.24,
        startXFactor: -0.02,
        amplitudeX: 50,
        amplitudeY: 40,
        wavelength: 0.0022,
        phaseSpeed: 0.007,
        phase: 1.4,
        colorStops: paletteList[1 % paletteList.length] || paletteList[0],
        strands: 14,
        strandSpread: 35,
        type: 'top-sweep',
      },
      // Ribbon 3: Left downward swooping ribbon (curls down the left margin)
      {
        baseYFactor: 0.05,
        startXFactor: 0.14,
        amplitudeX: 40,
        amplitudeY: 55,
        wavelength: 0.0035,
        phaseSpeed: 0.011,
        phase: 2.8,
        colorStops: paletteList[1 % paletteList.length] || paletteList[0],
        strands: 16,
        strandSpread: 20,
        type: 'left-loop',
      },
      // Ribbon 4: Electric accent ribbon crossing near top-left vertex
      {
        baseYFactor: 0.08,
        startXFactor: 0.02,
        amplitudeX: 45,
        amplitudeY: 30,
        wavelength: 0.004,
        phaseSpeed: 0.013,
        phase: 4.2,
        colorStops: paletteList[3 % paletteList.length] || paletteList[0],
        strands: 10,
        strandSpread: 12,
        type: 'diagonal-flow',
      },
    ];

    let time = 0;

    const render = () => {
      // Smooth mouse easing
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // We render on a clean crisp backdrop
      ctx.globalCompositeOperation = 'source-over';

      if (config.animate) {
        time += 0.015 * config.speed;
      }

      ribbons.forEach((ribbon, rIdx) => {
        const currentPhase = ribbon.phase + (config.animate ? time * (ribbon.phaseSpeed * 10) : 0);

        // Render multiple parallel fine strands for the silky filament effect
        const totalStrands = Math.min(Math.floor(ribbon.strands * (config.ribbonCount / 5)), 28);
        const spread = ribbon.strandSpread * (config.lineWidth / 1.5);

        for (let s = 0; s < totalStrands; s++) {
          const strandOffset = (s - totalStrands / 2) * (spread / totalStrands);
          const points: Point[] = [];

          if (ribbon.type === 'top-sweep') {
            // Horizontal wave sweeping across the top and right
            const steps = 45;
            const startX = -50;
            const endX = width + 50;

            for (let i = 0; i <= steps; i++) {
              const x = startX + (i / steps) * (endX - startX);
              const progress = i / steps;

              // Arc math: dips in the middle, lifts at edges, natural curve
              const arc = Math.sin(progress * Math.PI) * (height * 0.18);
              const sineWave = Math.sin(x * ribbon.wavelength + currentPhase + s * 0.08) * ribbon.amplitudeY;
              const cosWave = Math.cos(x * 0.0015 - currentPhase * 0.6) * (ribbon.amplitudeY * 0.5);

              // Mouse displacement effect
              let mouseEffectY = 0;
              let mouseEffectX = 0;
              if (config.interactiveMouse) {
                const dx = x - mousePos.current.x;
                const dy = (height * ribbon.baseYFactor + arc) - mousePos.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 260) {
                  const force = (1 - dist / 260) * 35;
                  mouseEffectY = Math.sin(dist * 0.05 - time * 2) * force;
                  mouseEffectX = (dx / dist) * force * 0.5;
                }
              }

              const y = height * ribbon.baseYFactor + arc + sineWave + cosWave + strandOffset * (1 + progress * 0.6) + mouseEffectY;
              points.push({ x: x + mouseEffectX, y });
            }
          } else if (ribbon.type === 'left-loop') {
            // Vertical / S-curve wave cascading down the left side
            const steps = 45;
            const startY = -40;
            const endY = height * 1.05;

            for (let i = 0; i <= steps; i++) {
              const y = startY + (i / steps) * (endY - startY);
              const progress = i / steps;

              // Left loop bow curve
              const bow = Math.sin(progress * Math.PI * 0.9) * (width * 0.14);
              const sineWave = Math.sin(y * ribbon.wavelength + currentPhase + s * 0.1) * ribbon.amplitudeX;
              const secondHarmonic = Math.cos(y * 0.002 - currentPhase * 0.8) * 20;

              let mouseEffectX = 0;
              if (config.interactiveMouse) {
                const dx = (width * ribbon.startXFactor + bow) - mousePos.current.x;
                const dy = y - mousePos.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 240) {
                  const force = (1 - dist / 240) * 30;
                  mouseEffectX = Math.sin(dist * 0.04 - time * 2) * force;
                }
              }

              const x = width * ribbon.startXFactor + bow + sineWave + secondHarmonic + strandOffset * (1 + (1 - progress) * 0.8) + mouseEffectX;
              points.push({ x, y });
            }
          } else {
            // Diagonal crossing ribbon (adds that intricate layered crossweave from the photo)
            const steps = 40;
            for (let i = 0; i <= steps; i++) {
              const progress = i / steps;
              const x = (progress * 0.7 - 0.05) * width;
              const y = (progress * 0.65 - 0.05) * height;

              const wave = Math.sin((x + y) * ribbon.wavelength + currentPhase + s * 0.12) * 35;
              const wave2 = Math.cos(x * 0.003 - currentPhase) * 15;

              points.push({
                x: x + wave + strandOffset,
                y: y + wave2 + strandOffset * 0.8,
              });
            }
          }

          // Create dynamic linear gradient along the wave path
          if (points.length > 2) {
            const startPt = points[0];
            const endPt = points[points.length - 1];
            const grad = ctx.createLinearGradient(startPt.x, startPt.y, endPt.x, endPt.y);

            ribbon.colorStops.forEach((cs) => {
              grad.addColorStop(cs.stop, cs.color);
            });

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            // Smooth Catmull-Rom or Quadratic Bézier spline through points
            for (let i = 0; i < points.length - 1; i++) {
              const xc = (points[i].x + points[i + 1].x) / 2;
              const yc = (points[i].y + points[i + 1].y) / 2;
              ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
            }
            ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

            ctx.strokeStyle = grad;
            // Central strands have slightly higher opacity, outer strands fade for silky depth
            const alphaCenter = 1 - Math.abs(s - totalStrands / 2) / (totalStrands / 2);
            ctx.globalAlpha = Math.max(0.12, alphaCenter * config.opacity);
            ctx.lineWidth = Math.max(0.8, (config.lineWidth * 0.85) * (0.8 + alphaCenter * 0.6));
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
          }
        }
      });

      // Reset global alpha
      ctx.globalAlpha = 1.0;

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [config]);

  return (
    <div
      id="ribbon-background-container"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Background overlay */}
      <div className="ribbon-overlay absolute inset-0" />

      {/* High-performance dynamic ribbon canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{
          filter:
            config.blurLevel > 0
              ? `blur(${config.blurLevel}px)`
              : 'none',
        }}
      />

      {/* Cyan ambient glow */}
      <div className="ribbon-glow-cyan absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl" />

      {/* Pink ambient glow */}
      <div className="ribbon-glow-pink absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl" />
    </div>
  );
};
