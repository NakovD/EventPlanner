export const parseToken = (token: string) => {
  return token.replaceAll('"', '');
};
