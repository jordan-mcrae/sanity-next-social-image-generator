import { GenerateOptions, TextOptions } from './types';

import axios from 'axios';
import sharp from 'sharp';

const constructMultilineSVGText = (
  containerWidth: number,
  containerHeight: number,
  fontSize: number,
  text: string,
): string => {
  const numCharactersPerLine = (containerWidth / fontSize) * 1.5;

  const rows: Array<Array<string>> = [[]];
  let currentRow = 0;
  let currentCharacterCount = 0;

  // Group words into rows based on allowed # of characters per line
  for (const word of text.split(' ')) {
    const canAddWordToRow = currentCharacterCount + word.length <= numCharactersPerLine;

    if (canAddWordToRow) {
      rows[currentRow].push(word);
      currentCharacterCount += word.length;
    } else {
      currentRow++;
      currentCharacterCount = 0;
      rows[currentRow] = [word];
    }
  }

  const heightPercentPerRow = Math.floor((fontSize / containerHeight) * 100) / 2;
  const containerYOffset = 50 - heightPercentPerRow * rows.length;

  // Create SVG <text> element that has <tspan> children for each row
  return `<text x="50%" y="${containerYOffset}%" text-anchor="middle" class="title">
    ${rows.reduce((acc, row) => (acc += `<tspan x="${containerWidth / 2}" dy="1em">${row.join(' ')}</tspan>`), '')}
  </text>`;
};

const buildTextSVGBuffer = (config: TextOptions): Buffer => {
  const svgText = constructMultilineSVGText(config.width, config.height, config.fontSize, config.text);

  const svg = `
    <svg width="${config.width}" height="${config.height}">
      <defs>
        <style type="text/css">
          .title {
            fill: ${config.color || 'white'};
            font-size: ${config.fontSize}px;
            font-family: "${config.fontName}";
          }
        </style>
      </defs>
      ${svgText}
    </svg>
  `;

  return Buffer.from(svg);
};

export const generateImage = async ({
  width = 1200,
  height = 600,
  fontColor = 'white',
  fontSize = 50,
  fit,
  backgroundImageUrl,
  text,
  fontName = 'Helvetica',
  blur = 0,
  darken = 0,
  lighten = 0,
}: GenerateOptions): Promise<void> => {
  const isJpeg = backgroundImageUrl.includes('.jpg') || backgroundImageUrl.includes('.jpeg');
  if (!isJpeg) throw Error('Background image must be a JPEG.');

  const imageFile = (await axios({ url: backgroundImageUrl, responseType: 'arraybuffer' })).data as Buffer;
  const image = await sharp(imageFile).resize({ width, height, fit });

  const composites = [];

  if (blur) await image.blur(blur);

  if (darken) {
    const overlay = `<svg width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="black" fill-opacity="${darken / 100}" />
    </svg>`;

    composites.push({ input: Buffer.from(overlay), left: 0, top: 0 });
  }

  if (lighten) await image.modulate({ brightness: lighten });

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

  await image.composite(composites).toFile(__dirname + '/test.jpg');

  return null;
};
