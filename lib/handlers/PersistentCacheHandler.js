"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PersistentCacheHandler {
    constructor() {
        // nothing to do here
    }
    get(key) {
        return localStorage.getItem(key);
    }
    has(key) {
        return localStorage.getItem(key) !== null;
    }
    store(key, value) {
        localStorage.setItem(key, value);
    }
}
exports.PersistentCacheHandler = PersistentCacheHandler;
