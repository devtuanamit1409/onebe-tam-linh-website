import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
export function RequestInterceptorFulfilled(
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> {
  console.log("REQUEST INTERCEPTOR FULFILLED");
  return config;
}

export function RequestInterceptorRejected(
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> {
  console.log("REQUEST INTERCEPTOR REJECTED");
  return config;
}
