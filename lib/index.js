"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MemoryCacheHandler_1 = require("./handlers/MemoryCacheHandler");
const PersistentCacheHandler_1 = require("./handlers/PersistentCacheHandler");
const SessionCacheHandler_1 = require("./handlers/SessionCacheHandler");
const types_1 = require("./types");
class CacheService {
    constructor(cacheType) {
        this.keyGeneration = CacheService.generateKey;
        if (cacheType === types_1.default.SESSION && !CacheService.hasSessionStorage()) {
            console.warn("Session storage has been set, but it's not supported. fallback to memory");
            cacheType = types_1.default.MEMORY;
        }
        else if (cacheType === types_1.default.PERSISTENT && !CacheService.hasLocalStorage()) {
            console.warn("Local storage has been set, but it's not supported. fallback to memory");
            cacheType = types_1.default.MEMORY;
        }
        switch (cacheType) {
            case types_1.default.PERSISTENT:
                this.cacheHandler = new PersistentCacheHandler_1.PersistentCacheHandler();
                break;
            case types_1.default.SESSION:
                this.cacheHandler = new SessionCacheHandler_1.SessionCacheHandler();
                break;
            case types_1.default.MEMORY:
            default:
                this.cacheHandler = new MemoryCacheHandler_1.MemoryCacheHandler();
                break;
        }
    }
    static generateKey(request) {
        let cacheKey = "";
        if (request.headers) {
            cacheKey += JSON.stringify(request.headers);
        }
        if (request.params) {
            cacheKey += JSON.stringify(request.params);
        }
        if (request.body) {
            cacheKey += JSON.stringify(request.body);
        }
        cacheKey = btoa(cacheKey);
        return cacheKey;
    }
    static hasSessionStorage() {
        return (window && window.sessionStorage !== undefined);
    }
    static hasLocalStorage() {
        return (window && window.localStorage !== undefined);
    }
    getHandler() {
        return this.cacheHandler;
    }
    store(request, response) {
        const cacheKey = this.keyGeneration(request);
        this.cacheHandler.store(cacheKey, response);
    }
    get(request) {
        const cacheKey = this.keyGeneration(request);
        return this.cacheHandler.get(cacheKey);
    }
    has(key) {
        return this.cacheHandler.has(key);
    }
}
exports.default = CacheService;
