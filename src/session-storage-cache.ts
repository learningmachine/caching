import { Cache } from "./cache";

import {
  LocalOrSession,
  getVal,
  removeVal,
  setVal,
} from "./local-session-utils";

export class SessionStorageCache implements Cache {
  public set<T>(key: string, value: T, durationMS?: number): void {
    return setVal<T>(LocalOrSession.Session, key, value, durationMS);
  }

  public get<T>(key: string): T {
    return getVal<T>(LocalOrSession.Session, key);
  }

  public remove(key: string): void {
    return removeVal(LocalOrSession.Session, key);
  }
}
