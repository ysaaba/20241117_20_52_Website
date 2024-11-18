declare module 'canvas-confetti' {
  function confetti(options?: {
    particleCount?: number;
    spread?: number;
    origin?: { x: number; y: number };
    colors?: string[];
    ticks?: number;
  }): void;
  export default confetti;
} 