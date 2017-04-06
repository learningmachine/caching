declare module 'caching/cache' {
	export interface cacheValue {
	    value: any;
	    expire: number;
	}
	export type cacheEntries = {
	    [key: string]: cacheValue;
	};
	export abstract class Cache {
	    abstract set<T>(key: string, value: T, durationMS?: number): void;
	    abstract get<T>(key: string): T;
	    abstract remove(key: string): void;
	}

}
declare module 'caching/helpers' {
	import { cacheValue } from 'caching/cache';
	export function isExpired(val: cacheValue): boolean;
	export function cacheFor(n: number): {
	    minutes: number;
	    seconds: number;
	    hours: number;
	};

}
declare module 'caching/memory-cache' {
	import { Cache } from 'caching/cache';
	export class MemoryCache implements Cache {
	    private cache;
	    set<T>(key: string, value: T, durationMS?: any): void;
	    get<T>(key: string): T;
	    remove(key: string): void;
	    clearAll(): void;
	}

}
declare module 'caching/cookie-cache' {
	import { Cache } from 'caching/cache';
	export class CookieCache implements Cache {
	    private CookieName;
	    constructor(CookieName?: string);
	    set<T>(key: string, value: T, durationMS?: any): void;
	    get<T>(key: string): T;
	    remove(key: string): void;
	    private getCacheEntries();
	    private setCacheEntries(entries);
	}

}
declare module 'caching/local-storage-cache' {
	import { Cache } from 'caching/cache';
	export class LocalStorageCache implements Cache {
	    set<T>(key: string, value: T, durationMS?: number): void;
	    get<T>(key: string): T;
	    remove(key: string): void;
	}

}
declare module 'caching/scoped-cache' {
	import { Cache } from 'caching/cache';
	export class ScopedCache implements Cache {
	    private scope;
	    private cache;
	    constructor(scope: string, cache: Cache);
	    setScope(scope: string): void;
	    set<T>(key: string, value: T, durationMS?: any): void;
	    get<T>(key: string): T;
	    remove(key: string): void;
	}

}
declare module 'caching' {
	export { Cache } from 'caching/cache';
	export { cacheFor } from 'caching/helpers';
	export { MemoryCache } from 'caching/memory-cache';
	export { CookieCache } from 'caching/cookie-cache';
	export { LocalStorageCache } from 'caching/local-storage-cache';
	export { ScopedCache } from 'caching/scoped-cache';

}
