"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryCacheHandler {
    constructor() {
        this.storage = {};
    }
    get(key) {
        return this.storage[key];
    }
    has(key) {
        return this.storage.hasOwnProperty(key);
    }
    store(key, value) {
        this.storage[key] = value;
    }
}
exports.MemoryCacheHandler = MemoryCacheHandler;
