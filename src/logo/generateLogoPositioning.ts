import axios from 'axios';
import sharp from 'sharp';

import { Logo, LogoArgs } from './types';

export const generateLogoPositioning = async ({
  logo,
  logoWidth,
  logoHeight,
  logoFit,
  width,
  height,
  logoPosition,
}: LogoArgs): Promise<Logo> => {
  let logoFile;

  if (typeof logo === 'string') {
    // If URL is provided, fetch the image
    logoFile = (await axios({ url: logo, responseType: 'arraybuffer' })).data as Buffer;
  }

  const sharpLogo = await sharp(logoFile).resize({ width: logoWidth, height: logoHeight, fit: logoFit }).toBuffer();
  const logoMeta = await sharp(sharpLogo).metadata();

  const DEFAULT_PADDING = Math.floor(width / 60);

  switch (logoPosition) {
    case 'topLeft':
      return {
        input: sharpLogo,
        left: DEFAULT_PADDING,
        top: DEFAULT_PADDING,
      };
    case 'topRight':
      return {
        input: sharpLogo,
        left: width - logoMeta.width - DEFAULT_PADDING,
        top: DEFAULT_PADDING,
      };
    case 'bottomRight':
      return {
        input: sharpLogo,
        left: width - logoMeta.width - DEFAULT_PADDING,
        top: height - logoMeta.height - DEFAULT_PADDING,
      };
    case 'bottomLeft':
      return {
        input: sharpLogo,
        left: DEFAULT_PADDING,
        top: height - logoMeta.height - DEFAULT_PADDING,
      };
    default:
      return {
        input: sharpLogo,
        left: width - logoMeta.width - DEFAULT_PADDING,
        top: height - logoMeta.height - DEFAULT_PADDING,
      };
  }
};
