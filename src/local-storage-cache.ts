import { Cache } from "./cache";
import { isExpired } from "./helpers";

import { MemoryCache } from "./memory-cache";

let canUseLocalStorage = true;
let fallback: MemoryCache = null;

try {
  localStorage.setItem("__testing", "__testing");
  localStorage.removeItem("__testing");
} catch(err) {
  canUseLocalStorage = false;
  fallback = new MemoryCache();
}

export class LocalStorageCache implements Cache {
  public set<T>(key: string, value: T, durationMS?: number): void {
    if (!canUseLocalStorage) return fallback.set<T>(key, value, durationMS);

    const expire = durationMS ? Date.now() + durationMS : null;
    localStorage[key] = JSON.stringify({ value, expire });
  }

  public get<T>(key: string): T {
    if (!canUseLocalStorage) return fallback.get<T>(key);

    const val = JSON.parse(localStorage[key] || "null");

    if (val) {
      if (!isExpired(val)) {
        return val.value as T;
      } else {
        this.remove(key);
      }
    }

    return null;
  }

  public remove(key: string): void {
    if (!canUseLocalStorage) return fallback.remove(key);

    delete localStorage[key];
  }
}

