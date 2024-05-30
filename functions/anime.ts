import Redis from "ioredis";

import { PopularAnimeResponse, TrendingAnimeResponse } from "@/types/consumet";

let redis: Redis | undefined = undefined;

if (process.env.REDIS_URI) {
  redis = new Redis(process.env.REDIS_URI);
} else {
  redis = undefined;
}

export { redis };

const fetchAndCache = async (url: string, cacheKey: string = "c") => {
  try {
    if (redis) {
      const data = await redis.get(cacheKey);

      if (data) {
        if (JSON.parse(data).message) {
          await redis.del(cacheKey);
          const response = await fetch(url);
          const jsonData = await response.json();

          await redis.set(cacheKey, JSON.stringify(jsonData), "EX", 3 * 3600);

          return jsonData;
        }

        return JSON.parse(data);
      } else {
        const response = await fetch(url);
        const jsonData = await response.json();

        await redis.set(cacheKey, JSON.stringify(jsonData), "EX", 3 * 3600);

        return jsonData;
      }
    } else {
      const response = await fetch(url);

      return await response.json();
    }
  } catch (err) {
    throw err;
  }
};

export const getTrendingAnime = async (page = 1, perPage = 24) => {
  return (await fetchAndCache(
    `${process.env.CONSUMET_API}/meta/anilist/trending?page=${page}&perPage=${perPage}`,
    "trending",
  )) as TrendingAnimeResponse;
};

export const getPopularAnime = async (page = 1, perPage = 24) => {
  return (await fetchAndCache(
    `${process.env.CONSUMET_API}/meta/anilist/popular?page=${page}&perPage=${perPage}`,
    "popular",
  )) as PopularAnimeResponse;
};
