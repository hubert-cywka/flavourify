export interface TokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  email: string;
  roles: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}
