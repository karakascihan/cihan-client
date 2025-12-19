import axios, { AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders, Method } from "axios";



export async function apiRequest<T>(
  method: Method,
  url: string,
  headers?:any,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  // Varsayılan header
  const mergedConfig: AxiosRequestConfig = {
    method,
    url,
    data,
    ...config,
    headers:headers
  };
  axios.defaults.headers.common["Accept-Language"] = "TR";
  const response = await axios.request<T>(mergedConfig);
  return response.data;
}