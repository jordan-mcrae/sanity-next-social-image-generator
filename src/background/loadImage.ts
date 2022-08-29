import axios from 'axios';

export const loadImage = async (backgroundImageUrl: string): Promise<Buffer> => {
  return (
    await axios({
      url: backgroundImageUrl,
      responseType: 'arraybuffer',
    })
  ).data as Buffer;
};
