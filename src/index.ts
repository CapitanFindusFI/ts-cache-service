import { MemoryCacheHandler } from "./handlers/MemoryCacheHandler";
import { PersistentCacheHandler } from "./handlers/PersistentCacheHandler";
import { SessionCacheHandler } from "./handlers/SessionCacheHandler";
import { ICacheHandler } from "./interfaces/ICacheHandler";
import CacheType from "./types";

interface ICacheableRequest {
  headers?: { [key: string]: string }
  params?: { [key: string]: string }
  body?: any
}

class CacheService {

  private static generateKey(request: ICacheableRequest): string {
    return "";
  }

  private static hasSessionStorage(): boolean {
    return (window && window.sessionStorage !== undefined);
  }

  private static hasLocalStorage(): boolean {
    return (window && window.localStorage !== undefined);
  }

  private keyGeneration: (request: ICacheableRequest) => string;
  private cacheHandler: ICacheHandler;

  constructor(cacheType: CacheType) {
    this.keyGeneration = CacheService.generateKey;

    if (cacheType === CacheType.SESSION && !CacheService.hasSessionStorage()) {
      console.warn("Session storage has been set, but it's not supported. fallback to memory");
      cacheType = CacheType.MEMORY;
    } else if (cacheType === CacheType.PERSISTENT && !CacheService.hasLocalStorage()) {
      console.warn("Local storage has been set, but it's not supported. fallback to memory");
      cacheType = CacheType.MEMORY;
    }

    switch (cacheType) {
      case CacheType.PERSISTENT:
        this.cacheHandler = new PersistentCacheHandler();
        break;
      case CacheType.SESSION:
        this.cacheHandler = new SessionCacheHandler();
        break;
      case CacheType.MEMORY:
      default:
        this.cacheHandler = new MemoryCacheHandler();
        break;
    }
  }

  public store(key: string, value: any): void {
    this.cacheHandler.store(key, value);
  }

  public get(key: string): any {
    return this.cacheHandler.get(key);
  }

  public has(key: string): boolean {
    return this.cacheHandler.has(key);
  }

  public storeResponse(request: ICacheableRequest, response: any): void {
    const cacheKey = this.keyGeneration(request);
    this.store(cacheKey, response);
  }

}

export default CacheService;
