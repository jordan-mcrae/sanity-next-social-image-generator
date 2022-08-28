import { FitEnum } from 'sharp';

type Fits = keyof FitEnum;

export interface GenerateOptions {
  id: string;
  backgroundImageUrl: string;
  text?: string;
  width?: number;
  height?: number;
  darken?: number;
  fit?: Fits;
  fontColor?: string;
  fontSize?: number;
}

export interface TextOptions {
  color?: string;
  fontSize?: number;
  width?: number;
  height?: number;
  text?: string;
}
