import { Client, ClientConfigOptions } from './types';

import { generateImage } from '../image/generateImage';
import { GenerateOptions } from '../image/types';
import { uploadToSanity } from '../sanity';

export const createImageClient = ({
  dataset,
  projectId,
  apiVersion = '2022-08-28',
  useCdn = false,
  token,
  redisUrl,
}: ClientConfigOptions): Client => {
  return {
    generateImage: async (args: GenerateOptions): Promise<Buffer | {}> => {
      try {
        const image = await generateImage(args);

        // If our client can authenticate with Sanity, update the corresponding document
        if (args.id && dataset && projectId && redisUrl) {
          await uploadToSanity({
            image,
            documentId: args.id,
            dataset,
            projectId,
            apiVersion,
            token,
            useCdn,
            redisUrl,
          });
        }

        return image;
      } catch (e) {
        return e;
      }
    },
  };
};
