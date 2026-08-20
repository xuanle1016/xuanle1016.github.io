export interface RibbonConfig {
  preset: 'rainbow-silk' | 'ocean-breeze' | 'aurora-violet' | 'sunset-glow' | 'emerald-spring';
  speed: number;
  ribbonCount: number;
  lineWidth: number;
  opacity: number;
  animate: boolean;
  interactiveMouse: boolean;
  blurLevel: number;
}