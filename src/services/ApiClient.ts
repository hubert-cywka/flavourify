import axios, { AxiosHeaders, AxiosRequestConfig, HttpStatusCode } from 'axios';
import { getAuthToken, refreshToken, signOutUser } from './AuthService';
import AppRouter from 'router/AppRouter';
import ROUTE from 'router/RoutingConstants';

export const apiURL = process.env.REACT_APP_PROD_API_URL ?? 'http://localhost:8080';

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
      case HttpStatusCode.Unauthorized:
        if (!window.location.href.includes(ROUTE.AUTH)) {
          return refreshToken()
            .then(() => {
              return apiClient.request(error.config);
            })
            .catch(async (error) => {
              if (error?.response?.status === HttpStatusCode.Forbidden) {
                await signOutUser();
              }
            });
        }
        break;

      case HttpStatusCode.Forbidden:
        if (!window.location.href.includes(ROUTE.AUTH)) {
          AppRouter.navigate(ROUTE.ERROR, {
            state: { status: status },
            replace: true
          });
        }
        break;

      case HttpStatusCode.InternalServerError:
        AppRouter.navigate(ROUTE.ERROR, {
          state: { status: status },
          replace: true
        });
        break;
    }
    return Promise.reject(error);
  });
};
