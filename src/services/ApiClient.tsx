import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';
import ROUTE from '../components/router/RoutingConstants';
import { getAuthToken, refreshToken, signOutUser } from './AuthService';
import AppRouter from '../components/router/AppRouter';

//export const apiURL = 'https://fd04-212-51-207-126.eu.ngrok.io';
export const apiURL = 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export const setupInterceptors = () => {
  apiClient.interceptors.request.use((request: AxiosRequestConfig) => {
    let headers: AxiosHeaders = new AxiosHeaders();
    Object.assign(headers, request.headers);
    const token = getAuthToken();
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('ngrok-skip-browser-warning', true);
    request.headers = headers;
    return {
      ...request,
      headers: headers
    };
  });

  apiClient.interceptors.response.use(null, (error) => {
    const status = error?.response?.status;
    switch (status) {
      case 401:
        if (!window.location.href.includes(ROUTE.AUTH)) {
          return refreshToken()
            .then(() => {
              return apiClient.request(error.config);
            })
            .catch(async (error) => {
              if (error?.response?.status === 403) {
                await signOutUser();
              }
            });
        }
        break;

      case 403:
        if (!window.location.href.includes(ROUTE.AUTH)) {
          AppRouter.navigate(ROUTE.ERROR, {
            state: { status: status },
            replace: true
          });
        }
        break;

      case 500:
        AppRouter.navigate(ROUTE.ERROR, {
          state: { status: status },
          replace: true
        });
        break;
    }
    return Promise.reject(error);
  });
};
