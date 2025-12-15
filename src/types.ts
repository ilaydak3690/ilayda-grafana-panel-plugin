type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  // Base options
  text: string;
  showSeriesCount: boolean;

  // Bonus 2 – basic customization
  circleRadius?: number;
  circleColor?: string;
  showSignature?: boolean;
  signatureText?: string;

  // Bonus 3 – theme & dynamic behavior
  autoColorByTheme?: boolean;

  // Bonus 4 – data‑driven radius
  radiusPerSeries?: number; // how much radius grows per series
  maxRadius?: number;       // maximum allowed radius
}
