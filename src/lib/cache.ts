"use server";
import Cookies from "universal-cookie";

const CACHE_KEY = "product_cache";
const CACHE_DURATION = 24 * 60 * 60; // 24 hours in seconds

interface CacheData<T> {
  data: T;
  timestamp: number;
}

export async function setCache<T>(data: T) {
  const cookies = new Cookies();
  const cacheData: CacheData<T> = {
    data,
    timestamp: Date.now(),
  };

  cookies.set(CACHE_KEY, JSON.stringify(cacheData), {
    path: "/",
    maxAge: CACHE_DURATION,
    sameSite: "strict",
  });
}

export async function getCache<T>(): Promise<T | null> {
  try {
    const cookies = new Cookies();
    const cached = cookies.get(CACHE_KEY);

    if (!cached) return null;

    const cacheData: CacheData<T> = JSON.parse(cached);
    if (Date.now() - cacheData.timestamp > CACHE_DURATION * 1000) {
      cookies.remove(CACHE_KEY);
      return null;
    }

    return cacheData.data;
  } catch (error) {
    console.error("Cache read error:", error);
    return null;
  }
}
