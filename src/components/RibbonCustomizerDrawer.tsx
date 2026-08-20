import React from 'react';
import { X, Palette, Sliders, Play, Pause, MousePointer, RotateCcw, Sparkles } from 'lucide-react';
import { RibbonConfig } from '../types';
import { DEFAULT_RIBBON_CONFIG } from '../data/defaultProfile';

interface RibbonCustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: RibbonConfig;
  onChange: (config: RibbonConfig) => void;
}

export const RibbonCustomizerDrawer: React.FC<RibbonCustomizerDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onChange,
}) => {
  if (!isOpen) return null;

  const presets: { id: RibbonConfig['preset']; label: string; colors: string[] }[] = [
    {
      id: 'rainbow-silk',
      label: 'Rainbow Silk (Reference Style)',
      colors: ['#22c55e', '#06b6d4', '#3b82f6', '#a855f7', '#ec4899', '#f59e0b'],
    },
    {
      id: 'ocean-breeze',
      label: 'Ocean Breeze',
      colors: ['#2dd4bf', '#0ea5e9', '#2563eb', '#4f46e5'],
    },
    {
      id: 'aurora-violet',
      label: 'Aurora Violet',
      colors: ['#38bdf8', '#a855f7', '#ec4899', '#f43f5e'],
    },
    {
      id: 'sunset-glow',
      label: 'Sunset Glow',
      colors: ['#eab308', '#f97316', '#ef4444', '#d946ef'],
    },
    {
      id: 'emerald-spring',
      label: 'Emerald Spring',
      colors: ['#4ade80', '#14b8a6', '#06b6d4', '#3b82f6'],
    },
  ];

  return (
    <div 
      id="ribbon-customizer-backdrop"
      className="fixed inset-0 z-[99999] flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="ribbon-customizer-drawer"
        className="w-full max-w-md h-full shadow-2xl border-l border-slate-200 p-6 overflow-y-auto space-y-6 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Ribbon Waves Visuals
                </h3>
                <p className="text-xs text-slate-500">
                  Inspired by the silky flowing translucent wave artwork
                </p>
              </div>
            </div>
            <button
              id="ribbon-drawer-close-btn"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Color Presets */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Color Harmonization Preset
            </label>
            <div className="space-y-2">
              {presets.map((p) => {
                const isActive = config.preset === p.id;
                return (
                  <button
                    key={p.id}
                    id={`ribbon-preset-${p.id}`}
                    onClick={() => onChange({ ...config, preset: p.id })}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isActive
                        ? 'border-slate-900 bg-slate-50/80 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-900">
                        {p.label}
                      </div>
                      <div className="flex items-center gap-1 mt-1.5">
                        {p.colors.map((c, i) => (
                          <span
                            key={i}
                            className="w-4 h-4 rounded-full border border-white/50 shadow-2xs"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-[11px] font-bold text-cyan-700 bg-cyan-100/70 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Motion & Physics Controls */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Dynamics & Parameters
            </label>

            {/* Animation Speed */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Wave Flow Speed</span>
                <span className="text-slate-500 font-mono">{config.speed.toFixed(1)}x</span>
              </div>
              <input
                id="ribbon-slider-speed"
                type="range"
                min="0.2"
                max="2.5"
                step="0.1"
                value={config.speed}
                onChange={(e) => onChange({ ...config, speed: parseFloat(e.target.value) })}
                className="w-full accent-cyan-600"
              />
            </div>

            {/* Opacity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Silk Translucency / Opacity</span>
                <span className="text-slate-500 font-mono">{Math.round(config.opacity * 100)}%</span>
              </div>
              <input
                id="ribbon-slider-opacity"
                type="range"
                min="0.2"
                max="1.0"
                step="0.05"
                value={config.opacity}
                onChange={(e) => onChange({ ...config, opacity: parseFloat(e.target.value) })}
                className="w-full accent-cyan-600"
              />
            </div>

            {/* Ribbon Density */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Filament Density</span>
                <span className="text-slate-500 font-mono">{config.ribbonCount} Strands</span>
              </div>
              <input
                id="ribbon-slider-density"
                type="range"
                min="3"
                max="12"
                step="1"
                value={config.ribbonCount}
                onChange={(e) => onChange({ ...config, ribbonCount: parseInt(e.target.value) })}
                className="w-full accent-cyan-600"
              />
            </div>

            {/* Line Width */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Ribbon Line Thickness</span>
                <span className="text-slate-500 font-mono">{config.lineWidth.toFixed(1)}px</span>
              </div>
              <input
                id="ribbon-slider-linewidth"
                type="range"
                min="0.8"
                max="3.5"
                step="0.2"
                value={config.lineWidth}
                onChange={(e) => onChange({ ...config, lineWidth: parseFloat(e.target.value) })}
                className="w-full accent-cyan-600"
              />
            </div>
          </div>

          {/* Interactive Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              id="ribbon-toggle-mouse"
              onClick={() => onChange({ ...config, interactiveMouse: !config.interactiveMouse })}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <MousePointer className="w-4 h-4 text-cyan-600" />
                <span>Interactive Mouse Wave Deflection</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[11px] ${config.interactiveMouse ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                {config.interactiveMouse ? 'ON' : 'OFF'}
              </span>
            </button>

            <button
              id="ribbon-toggle-animate"
              onClick={() => onChange({ ...config, animate: !config.animate })}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                {config.animate ? <Pause className="w-4 h-4 text-amber-600" /> : <Play className="w-4 h-4 text-emerald-600" />}
                <span>Wave Continuous Animation</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[11px] ${config.animate ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                {config.animate ? 'PLAYING' : 'PAUSED'}
              </span>
            </button>
          </div>
        </div>

        {/* Reset / Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            id="ribbon-reset-btn"
            onClick={() => onChange(DEFAULT_RIBBON_CONFIG)}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Reference Defaults</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
