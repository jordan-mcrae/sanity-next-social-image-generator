import { FitEnum } from 'sharp';

type Fits = keyof FitEnum;

export interface GenerateOptions {
  id: string;
  backgroundImageUrl: string;
  text?: string;
  width?: number;
  height?: number;
  backgroundFit?: Fits;
  fontColor?: string;
  fontSize?: number;
  fontName?: string;
  blur?: number;
  darken?: number;
  lighten?: number;
  logoUrl?: string;
  logoPosition?: 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft';
  logoWidth?: number;
  logoHeight?: number;
  logoFit?: Fits;
}

export interface TextOptions {
  color?: string;
  fontSize?: number;
  width?: number;
  height?: number;
  text?: string;
  fontName?: string;
}
