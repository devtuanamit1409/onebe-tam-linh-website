import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export function ResponseInterceptorFulfilled(response: AxiosResponse<any, any>): any {
  console.log("RESPONSE INTERCEPTOR FULFILLED");
  return response.data;
}

export function ResponseInterceptorRejected(error: AxiosError): Promise<string> {
  console.log("RESPONSE INTERCEPTOR REJECTED");
  return Promise.reject(error.message);
}
