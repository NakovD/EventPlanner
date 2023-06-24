import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';

export const getQueryKey = (endpoint: string) => {
  const values = Object.values(getRequestsOptions);
  const key = values.find((v) => v.endpoint === endpoint);

  if (!key) throw new Error(`No key was found for this endpoint: ${endpoint}`);

  return key;
};
