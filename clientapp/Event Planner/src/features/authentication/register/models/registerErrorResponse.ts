export interface IRegisterErrorResponse {
  code: 'DuplicateUserName' | 'DuplicateEmail';
  description: string;
}
