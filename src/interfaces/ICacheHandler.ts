export interface ICacheHandler {
  has(key: string): boolean;

  store(key: string, value: any): void;

  get(key: string): any;
}
