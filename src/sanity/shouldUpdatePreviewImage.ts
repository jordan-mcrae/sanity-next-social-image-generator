import { differenceInSeconds } from 'date-fns';
import Redis from 'ioredis';

const MIN_SECONDS_BETWEEN_UPDATES = 10;

export const shouldUpdatePreviewImage = async (id: string, redis: Redis): Promise<boolean> => {
  const lastUpdated = await redis.get(`previewImage-${id}`);

  if (!lastUpdated) return true;

  // Should only update at most once every 10 seconds to avoid infinite Sanity loop
  const shouldUpdate = differenceInSeconds(new Date(), new Date(lastUpdated)) >= MIN_SECONDS_BETWEEN_UPDATES;

  return shouldUpdate;
};
