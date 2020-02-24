import { ICacheHandler } from "../interfaces/ICacheHandler";
export declare class PersistentCacheHandler implements ICacheHandler {
    constructor();
    get(key: string): any;
    has(key: string): boolean;
    store(key: string, value: any): void;
}
