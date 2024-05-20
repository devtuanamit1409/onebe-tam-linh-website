import { AxiosRequestConfig } from "axios";
export function RequestInterceptorFulfilled(config: AxiosRequestConfig<any>): AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>> {
  console.log("REQUEST INTERCEPTOR FULFILLED");
  return config;
}

export function RequestInterceptorRejected(config: AxiosRequestConfig<any>): AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>> {
  console.log("REQUEST INTERCEPTOR REJECTED");
  return config;
}
