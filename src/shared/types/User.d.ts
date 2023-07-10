export enum USER_ROLE { // eslint-disable-line no-unused-vars
  ADMIN = 'ROLE_ADMIN', // eslint-disable-line no-unused-vars
  USER = 'ROLE_USER' // eslint-disable-line no-unused-vars
}

export interface UserDetails {
  id?: number;
  username: string;
  email: string;
  role: string;
  picture: string;
}
