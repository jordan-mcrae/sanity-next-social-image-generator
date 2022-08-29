import { Client, ClientConfigOptions } from './types';

import { generateImage } from '../image/generateImage';
export const createImageClient = ({
  dataset,
  projectId,
  apiVersion = '2022-08-28',
  useCdn = false,
  redisUrl,
}: ClientConfigOptions): Client => {
  return {
    generateImage,
  };
};
