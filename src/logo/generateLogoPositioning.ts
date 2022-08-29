import axios from 'axios';
import sharp from 'sharp';

import { Logo, LogoArgs } from './types';

export const generateLogoPositioning = async ({
  logoUrl,
  logoWidth,
  logoHeight,
  logoFit,
  width,
  height,
  logoPosition,
}: LogoArgs): Promise<Logo> => {
  const logoFile = (await axios({ url: logoUrl, responseType: 'arraybuffer' })).data as Buffer;
  const logo = await sharp(logoFile).resize({ width: logoWidth, height: logoHeight, fit: logoFit }).toBuffer();
  const logoMeta = await sharp(logo).metadata();

  const DEFAULT_PADDING = Math.floor(width / 60);

  switch (logoPosition) {
    case 'topLeft':
      return {
        input: logo,
        left: DEFAULT_PADDING,
        top: DEFAULT_PADDING,
      };
    case 'topRight':
      return {
        input: logo,
        left: width - logoMeta.width - DEFAULT_PADDING,
        top: DEFAULT_PADDING,
      };
    case 'bottomRight':
      return {
        input: logo,
        left: width - logoMeta.width - DEFAULT_PADDING,
        top: height - logoMeta.height - DEFAULT_PADDING,
      };
    case 'bottomLeft':
      return {
        input: logo,
        left: DEFAULT_PADDING,
        top: height - logoMeta.height - DEFAULT_PADDING,
      };
    default:
      return {
        input: logo,
        left: width - logoMeta.width - DEFAULT_PADDING,
        top: height - logoMeta.height - DEFAULT_PADDING,
      };
  }
};
