export interface IAuthResponse {
  userName: string;
  userEmail: string;
  roles: string[];
  userId: string;
  token: string;
  expiration: string;
}
