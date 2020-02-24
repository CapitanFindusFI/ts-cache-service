"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SessionCacheHandler {
    constructor() {
        // nothing to do here
    }
    get(key) {
        return sessionStorage.getItem(key);
    }
    has(key) {
        return sessionStorage.getItem(key) !== null;
    }
    store(key, value) {
        sessionStorage.setItem(key, value);
    }
}
exports.SessionCacheHandler = SessionCacheHandler;
