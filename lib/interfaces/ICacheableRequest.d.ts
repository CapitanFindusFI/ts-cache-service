export interface ICacheableRequest {
    headers?: {
        [key: string]: string;
    };
    params?: {
        [key: string]: string;
    };
    body?: any;
}
