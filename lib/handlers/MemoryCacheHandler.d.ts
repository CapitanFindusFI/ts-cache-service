import { ICacheHandler } from "../interfaces/ICacheHandler";
export declare class MemoryCacheHandler implements ICacheHandler {
    private readonly storage;
    constructor();
    get(key: string): any;
    has(key: string): boolean;
    store(key: string, value: any): void;
}
