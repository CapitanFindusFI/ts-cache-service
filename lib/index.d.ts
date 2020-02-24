import { ICacheableRequest } from "./interfaces/ICacheableRequest";
import { ICacheHandler } from "./interfaces/ICacheHandler";
import CacheType from "./types";
declare class CacheService {
    private static generateKey;
    private static hasSessionStorage;
    private static hasLocalStorage;
    private keyGeneration;
    private readonly cacheHandler;
    constructor(cacheType: CacheType);
    getHandler(): ICacheHandler;
    store(request: ICacheableRequest, response: any): void;
    get(request: ICacheableRequest): any;
    has(key: string): boolean;
}
export default CacheService;
