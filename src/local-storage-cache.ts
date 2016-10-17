import { Cache } from "./cache";
import { isExpired } from "./helpers";

export class LocalStorageCache implements Cache {
  public set<T>(key: string, value: T, durationMS?: number): void {
    const expire = durationMS ? Date.now() + durationMS : null;

    localStorage[key] = JSON.stringify({ value, expire });
  }

  public get<T>(key: string): T {
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
    delete localStorage[key];
  }
}

