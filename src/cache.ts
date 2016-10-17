export interface cacheValue {
  value: any;
  expire: number;
}

export type cacheEntries = { [key: string]: cacheValue };

export abstract class Cache {
  public abstract set<T>(key: string, value: T, durationMS?: number): void;
  public abstract get<T>(key: string): T;
  public abstract remove(key: string): void;
}
