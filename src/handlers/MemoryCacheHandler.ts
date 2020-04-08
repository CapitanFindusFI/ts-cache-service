import { ICacheHandler } from "../interfaces/ICacheHandler";

export class MemoryCacheHandler implements ICacheHandler {
  private readonly storage: Map<string, any>;

  constructor() {
    this.storage = new Map<string, any>();
  }

  public get(key: string): any {
    return this.storage.get(key);
  }

  public has(key: string): boolean {
    return this.storage.has(key);
  }

  public store(key: string, value: any): void {
    this.storage.set(key, value);
  }
}
