import { Cache, cacheEntries } from "./cache";
import { isExpired } from "./helpers";

export class MemoryCache implements Cache {
  private cache: cacheEntries = {};

  set<T>(key: string, value: T, durationMS = null) {
    const expire = durationMS ? Date.now() + durationMS : null;

    this.cache[key] = { value, expire };
  }

  get<T>(key: string): T {
    const val = this.cache[key];

    if (val) {
      if (!isExpired(val)) {
        return val.value as T;
      } else {
        this.remove(key);
      }
    }

    return null;
  }

  remove(key: string) {
    delete this.cache[key];
  }

  clearAll() {
    this.cache = {};
  }
}
