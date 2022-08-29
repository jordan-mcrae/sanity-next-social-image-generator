import { FitEnum } from 'sharp';

export type Fits = keyof FitEnum;

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
  filterColor?: string;
  dataset: string;
  projectId: string;
  apiVersion: string;
  useCdn: boolean;
  redisUrl: string;
}
