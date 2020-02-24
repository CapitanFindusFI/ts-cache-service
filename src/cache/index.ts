import {CacheType} from "./types";

class CacheService {
    private cacheType: CacheType = CacheType.MEMORY;

    private cacheStorage: { [key: string]: any };

    constructor() {
    }

    onRequest(request){

    }

}

export default CacheService
