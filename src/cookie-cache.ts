import { Cache, cacheEntries } from "./cache";
import { isExpired } from "./helpers";

export class CookieCache implements Cache {
  constructor(private CookieName = "__cookie_cache") { }

  set<T>(key: string, value: T, durationMS = null) {
    const expire = durationMS ? Date.now() + durationMS : null;
    let currentEntries = this.getCacheEntries();
    currentEntries[key] = { value, expire };
    this.setCacheEntries(currentEntries);
  }

  get<T>(key: string): T {
    let currentEntries = this.getCacheEntries();

    const val = currentEntries[key];
    if (val) {
      if (!isExpired(val)) {
        return val.value as T;
      } else {
        // expired, delete
        this.remove(key);
      }
    }

    return null;
  }

  remove(key: string) {
    let currentEntries = this.getCacheEntries();
    delete currentEntries[key];
    this.setCacheEntries(currentEntries);
  }

  private getCacheEntries(): cacheEntries {
    const decoded = window.atob(document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)" + this.CookieName + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1"));
    return JSON.parse(decoded || "{}");
  }

  private setCacheEntries(entries: cacheEntries) {
    const encoded = window.btoa(JSON.stringify(entries));
    document.cookie = this.CookieName + "=" + encoded + ";  expires=0; path=/";
  }
}

