import sharp from 'sharp';
import { Fits } from '../image/types';

export const resize = async (image: Buffer, width: number, height: number, fit: Fits): Promise<sharp.Sharp> => {
  return sharp(image).resize({ width, height, fit });
};
