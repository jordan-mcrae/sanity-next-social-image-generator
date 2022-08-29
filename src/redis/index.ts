import redisLib from 'ioredis';

export const getRedis = (redisUrl: string) => new redisLib(redisUrl);
