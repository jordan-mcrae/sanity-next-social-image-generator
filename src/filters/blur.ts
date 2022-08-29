import sharp from 'sharp';

export const blurFilter = async (blur: number, image: sharp.Sharp): Promise<sharp.Sharp> => {
  return await image.blur(blur);
};
