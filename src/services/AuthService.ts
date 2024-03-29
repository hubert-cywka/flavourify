import jwtDecode from 'jwt-decode';
import { apiClient } from './ApiClient';
import appRouter from 'router/AppRouter';
import ROUTE from 'router/RoutingConstants';
import { SignInRequest, SignInResponse, TokenRefreshResponse } from 'shared/types/Auth';
import { UserDetails, USER_ROLE } from 'shared/types/User.d';

const AUTH_KEY = 'AUTH_TOKEN';
const AUTH_REFRESH_KEY = 'AUTH_REFRESH_TOKEN';

export function getAuthToken(): string | null {
  return window.sessionStorage.getItem(AUTH_KEY);
}

function setAuthToken(token: string) {
  window.sessionStorage.setItem(AUTH_KEY, token);
}

function clearAuthToken() {
  window.sessionStorage.removeItem(AUTH_KEY);
}

export function getRefreshToken(): string | null {
  return window.sessionStorage.getItem(AUTH_REFRESH_KEY);
}

function setRefreshToken(token: string) {
  window.sessionStorage.setItem(AUTH_REFRESH_KEY, token);
}

function clearRefreshToken() {
  window.sessionStorage.removeItem(AUTH_REFRESH_KEY);
}

export function hasUserPermission() {
  return !!getAuthToken();
}

export function hasAdminPermission() {
  const code = getAuthToken();
  if (!code) return false;
  try {
    const decoded: UserDetails = jwtDecode(code);
    return decoded.role === USER_ROLE.ADMIN;
  } catch (e) {
    return false;
  }
}

function storeTokens(data: SignInResponse | TokenRefreshResponse) {
  setAuthToken(data.accessToken);
  setRefreshToken(data.refreshToken);
}

function cleanupOnSignOut() {
  clearAuthToken();
  clearRefreshToken();
}

export const signInUser = async (userData: SignInRequest) => {
  const { data } = await apiClient.post<SignInResponse>(`/auth/signin`, userData);
  storeTokens(data);
  return data;
};

export const refreshToken = async () => {
  const token = getRefreshToken();
  const { data } = await apiClient.post<TokenRefreshResponse>(`/auth/refreshtoken`, {
    refreshToken: token
  });
  storeTokens(data);
  return data;
};

export const signOutUser = async () => {
  apiClient.post(`/auth/signout`).finally(() => {
    appRouter.navigate(ROUTE.AUTH);
    cleanupOnSignOut();
  });
};
