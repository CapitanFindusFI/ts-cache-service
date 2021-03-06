import { AxiosRequestConfig } from "axios";
import CacheType from "./enums/CacheType";
import { MemoryCacheHandler } from "./handlers/MemoryCacheHandler";
import { PersistentCacheHandler } from "./handlers/PersistentCacheHandler";
import { SessionCacheHandler } from "./handlers/SessionCacheHandler";
import { ICacheableRequest } from "./interfaces/ICacheableRequest";
import { ICacheHandler } from "./interfaces/ICacheHandler";

class CacheService {
  private static generateKey(request: AxiosRequestConfig): string {
    let cacheKey = "";

    cacheKey += JSON.stringify({ url: request.url });

    if (request.headers) {
      cacheKey += JSON.stringify(request.headers);
    }

    if (request.params) {
      cacheKey += JSON.stringify(request.params);
    }

    if (request.data) {
      cacheKey += JSON.stringify(request.data);
    }

    cacheKey = btoa(cacheKey);

    return cacheKey;
  }

  private static hasSessionStorage(): boolean {
    return window && window.sessionStorage !== undefined;
  }

  private static hasLocalStorage(): boolean {
    return window && window.localStorage !== undefined;
  }

  private keyGeneration: (request: AxiosRequestConfig) => string;
  private readonly cacheHandler: ICacheHandler;

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

  public getHandler(): ICacheHandler {
    return this.cacheHandler;
  }

  public store(request: ICacheableRequest, response: any): void {
    const cacheKey = this.keyGeneration(request);
    this.cacheHandler.store(cacheKey, response);
  }

  public get(request: AxiosRequestConfig): any {
    const cacheKey = this.keyGeneration(request);
    return this.cacheHandler.get(cacheKey);
  }

  public has(key: string): boolean {
    return this.cacheHandler.has(key);
  }
}

export default CacheService;
