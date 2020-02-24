import { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import CacheService from "../../src";
import CacheType from "../../src/types";

class AxiosExample {
  private instance: AxiosInstance;
  private cacheService: CacheService;

  constructor(instance: AxiosInstance) {
    this.cacheService = new CacheService(CacheType.MEMORY);

    this.instance = instance;
    this.instance.defaults.adapter = this.requestAdapter.bind(this);
    this.instance.interceptors.response.use(this.onResponse.bind(this));
  }

  public get<T>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get(url, config);
  }

  private requestAdapter(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
      const cachedData = this.cacheService.get(config);
      if (cachedData) {
        resolve({
          config,
          data: cachedData,
          headers: {},
          request: {},
          status: 200,
          statusText: "OK"
        });
      } else {
        return this.instance.request(config);
      }
    });
  }

  private onResponse(response: AxiosResponse): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      if (response.status >= 400) {
        reject(response);
      } else {
        this.cacheService.store(response.request, response.data);
        resolve(response);
      }
    });
  }
}
