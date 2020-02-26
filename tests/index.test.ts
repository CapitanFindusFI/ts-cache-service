import CacheService from "../src";
import { ICacheableRequest } from "../src/interfaces/ICacheableRequest";
import CacheType from "../src/types";

const service = CacheService;
const testRequest: ICacheableRequest = {
  headers: {
    "content-type": "application/json"
  },
  params: {
    foo: "bar"
  },
  url: "https://www.example.com"
};

const testResponse = {
  bar: "baz"
};

describe("cache service test suite", () => {
  it("should retrieve correct value", () => {
    const s = new service(CacheType.MEMORY);
    s.store(testRequest, testResponse);

    const cached = s.get(testRequest);
    const expected = { bar: "baz" };
    expect(cached).toStrictEqual(expected);
  });
});
