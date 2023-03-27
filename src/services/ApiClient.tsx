import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';

//export const apiURL = 'https://fd04-212-51-207-126.eu.ngrok.io';
export const apiURL = 'http://localhost:6868';

export const apiClient = axios.create({
  baseURL: apiURL
});

apiClient.interceptors.request.use((request: AxiosRequestConfig) => {
  let headers: AxiosHeaders = new AxiosHeaders();
  Object.assign(headers, request.headers);
  headers.set('ngrok-skip-browser-warning', true);
  request.headers = headers;
  return {
    ...request,
    headers: headers
  };
});
