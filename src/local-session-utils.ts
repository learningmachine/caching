import { MemoryCache } from "./memory-cache";
import { isExpired } from "./helpers";

export enum LocalOrSession {
  Local,
  Session,
}

let canUseLocalStorage = true;
let canUseSessionStorage = true;
const localFallBack: MemoryCache = new MemoryCache();
const sessionFallBack: MemoryCache = new MemoryCache();

try {
  localStorage.setItem("__testing", "__testing");
  localStorage.removeItem("__testing");
} catch (err) {
  canUseLocalStorage = false;
}

try {
  sessionStorage.setItem("__testing", "__testing");
  sessionStorage.removeItem("__testing");
} catch (err) {
  canUseSessionStorage = false;
}

export const setVal = <T>(
  s: LocalOrSession,
  key: string,
  value: T,
  durationMS?: number,
): void => {
  const expire = durationMS ? Date.now() + durationMS : null;

  switch (s) {
    case LocalOrSession.Local:
      if (!canUseLocalStorage)
        return localFallBack.set<T>(key, value, durationMS);

      localStorage[key] = JSON.stringify({ value, expire });

      break;

    case LocalOrSession.Session:
      if (!canUseSessionStorage)
        return sessionFallBack.set<T>(key, value, durationMS);

      sessionStorage[key] = JSON.stringify({ value, expire });
      break;
  }
};

export const getVal = <T>(s: LocalOrSession, key: string): T => {
  let val = null;

  switch (s) {
    case LocalOrSession.Local:
      if (!canUseLocalStorage) return localFallBack.get<T>(key);

      val = JSON.parse(localStorage[key] || "null");
      break;

    case LocalOrSession.Session:
      if (!canUseSessionStorage) return sessionFallBack.get<T>(key);

      val = JSON.parse(sessionStorage[key] || "null");
      break;
  }

  if (val) {
    if (!isExpired(val)) {
      return val.value as T;
    } else {
      removeVal(s, key);
    }
  }

  return null;
};

export const removeVal = (s: LocalOrSession, key: string): void => {
  switch (s) {
    case LocalOrSession.Local:
      if (!canUseLocalStorage) return localFallBack.remove(key);

      delete localStorage[key];
      break;

    case LocalOrSession.Session:
      if (!canUseSessionStorage) return sessionFallBack.remove(key);

      delete sessionStorage[key];
      break;
  }
};
