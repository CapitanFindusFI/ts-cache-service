#TS Cache Service

This is a simple utilty lib which helps "caching" things based on a Map of key/value objects,
which can be stored in different ways.

It can be useful to store for example huge API responses, which are being almost never updated

### The Cache Service class

CacheService class, found in `src/CacheService.ts` is a simple class with a `KeyGeneration` property (which is a function)
and a `cacheHandler` property, which is a `ICacheHandler` interface

Passing a `CacheType` to its constructor, will auto create a `cacheHandler` instance with a factory

Currently, there are 3 types of caching system:

#####`CacheType.MEMORY`

using `handlers/MemoryCacheHandler.ts` class, will store key/values in a simple object

##### `CacheType.SESSION`

using `handlers/SessionCacheHandler.ts` class, will store key/values inside `window.sessionStorage`

##### `CacheType.PERSISTENT`

using `handlers/PersistentCacheHandler.ts` class, will store key/values inside `window.localStorage`

It does automatically check if `window.sessionStorage` or `window.localStorage` are available,
and fallback to `CacheType.MEMORY` as default

inside `examples/axios` you can find an example using the Axios library with an adapter and a response interceptor to integrate with `CacheService`
