import { ICacheHandler } from "../interfaces/ICacheHandler";

export class PersistentCacheHandler implements ICacheHandler {

  constructor() {
    // nothing to do here
  }

  public get(key: string): any {
    return localStorage.getItem(key);
  }

  public has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  public store(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

}
