import { ICacheHandler } from "../interfaces/ICacheHandler";

export class SessionCacheHandler implements ICacheHandler {
  constructor() {
    // nothing to do here
  }

  public get(key: string): any {
    return sessionStorage.getItem(key);
  }

  public has(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }

  public store(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }

}
