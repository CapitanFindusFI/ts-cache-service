import { AxiosInstance, AxiosRequestConfig } from "axios";

const mockResponse = (config: AxiosRequestConfig, data: any) => {
  return {
    data,
    request: config,
    status: 200,
    statusText: "OK"
  };
};

const mockAxios = {
  create: jest.fn(function() {
    // @ts-ignore
    return this;
  }),
  get: jest.fn((config: AxiosRequestConfig) => {
    return Promise.resolve(
      mockResponse(config, {
        foo: "bar"
      })
    );
  })
};

export default mockAxios;
