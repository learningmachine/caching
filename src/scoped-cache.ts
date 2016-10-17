import { Cache } from "./cache";

export class ScopedCache implements Cache {
  constructor(private scope: string, private cache: Cache) { }

  setScope(scope: string) {
    this.scope = scope;
  }

  set<T>(key: string, value: T, durationMS = null) {
    return this.cache.set<T>(this.scope + "-" + key, value, durationMS);
  }

  get<T>(key: string): T {
    return this.cache.get<T>(this.scope + "-" + key);
  }

  remove(key: string) {
    this.cache.remove(this.scope + "-" + key);
  }
}
