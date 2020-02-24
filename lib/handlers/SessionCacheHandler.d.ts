import { ICacheHandler } from "../interfaces/ICacheHandler";
export declare class SessionCacheHandler implements ICacheHandler {
    constructor();
    get(key: string): any;
    has(key: string): boolean;
    store(key: string, value: any): void;
}
