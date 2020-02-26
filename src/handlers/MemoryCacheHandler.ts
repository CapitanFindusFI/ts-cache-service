import { ICacheHandler } from '../interfaces/ICacheHandler';

export class MemoryCacheHandler implements ICacheHandler {
  private readonly storage: { [key: string]: any };

  constructor() {
    this.storage = {};
  }

  public get(key: string): any {
    return this.storage[key];
  }

  public has(key: string): boolean {
    return this.storage.hasOwnProperty(key);
  }

  public store(key: string, value: any): void {
    this.storage[key] = value;
  }
}
