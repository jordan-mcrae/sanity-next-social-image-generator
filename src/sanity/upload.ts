import { shouldUpdatePreviewImage } from './shouldUpdatePreviewImage';
import { getClient } from './client';
import { getRedis } from '../redis';

export const uploadToSanity = (
  image: Buffer,
  _id: string,
  dataset: string,
  projectId: string,
  apiVersion: string,
  useCdn: boolean = false,
  redisUrl: string,
) => {
  return new Promise<void>(async (resolve) => {
    const redis = getRedis(redisUrl);

    const shouldUpdate = await shouldUpdatePreviewImage(_id, redis);

    // If this document's image has already been updated in the last 10 seconds, ignore.
    // This avoids the infinite "update" webhook loop
    if (!shouldUpdate) return resolve();

    const client = await getClient(dataset, projectId, apiVersion, useCdn);

    const filePath = `socialImages/${_id}.jpg`;

    const sanityFile = await client.assets.upload('image', image, {
      filename: `${filePath}.jpg`,
    });

    // Patch the document with the image reference
    await client
      .patch(_id)
      .set({
        shareImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: sanityFile._id,
          },
        },
      })
      .commit();

    await redis.set(`previewImage-${_id}`, new Date().toString());

    resolve();
  });
};
