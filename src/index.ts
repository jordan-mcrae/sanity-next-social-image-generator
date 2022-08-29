import { GenerateOptions } from './types';
import { loadImage, resize } from './background';
import { buildTextSVGBuffer } from './text';
import { generateLogoPositioning } from './logo';
import { blurFilter, darkenFilter, colorize, brighten } from './filters';

export const generateImage = async ({
  // Image settings
  width = 1200,
  height = 600,
  fontColor = 'white',
  fontSize = 50,
  backgroundFit = 'cover',
  backgroundImageUrl,
  text,
  fontName = 'Helvetica',
  blur = 0,
  darken = 0,
  lighten = 0,
  logoUrl = '',
  logoPosition = 'bottomRight',
  logoWidth = 200,
  logoHeight = null,
  logoFit = 'cover',
  filterColor = '',
  // Uploads
  dataset,
  projectId,
  apiVersion = '2022-08-28',
  useCdn = false,
  redisUrl,
}: GenerateOptions): Promise<void> => {
  const imageFile = await loadImage(backgroundImageUrl);
  const image = await resize(imageFile, width, height, backgroundFit);

  const composites = [];

  // Blur
  if (blur) await blurFilter(blur, image);

  // Darken
  if (darken) {
    composites.push({
      input: await darkenFilter(darken, width, height),
      left: 0,
      top: 0,
    });
  }

  // Filter color
  if (filterColor) {
    composites.push({
      input: await colorize(filterColor, width, height),
      left: 0,
      top: 0,
    });
  }

  // Brighten
  if (lighten) await brighten(lighten, image);

  // Add text
  if (text) {
    const buffer = buildTextSVGBuffer({
      width,
      height,
      text,
      color: fontColor,
      fontSize,
      fontName,
    });

    composites.push({ input: buffer, left: 0, top: 0 });
  }

  // Logo
  if (logoUrl) {
    const logo = await generateLogoPositioning({
      logoUrl,
      logoWidth,
      logoHeight,
      logoFit,
      width,
      height,
      logoPosition,
    });

    composites.push(logo);
  }

  await image.composite(composites).toFile(__dirname + '/test.jpg');

  return null;
};
