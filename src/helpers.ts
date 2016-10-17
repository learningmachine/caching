import { cacheValue } from "./cache";

export function isExpired(val: cacheValue) {
  if (val.expire == null) return false;
  return val.expire < Date.now();
}

export function cacheFor(n: number) {
  const seconds = n * 1000;
  const minutes = n * 60 * 1000;
  const hours = n * 60 * 60 * 1000;

  return { minutes, seconds, hours };
}
