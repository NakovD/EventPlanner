import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IAuthResponse } from 'features/authentication/common/models/authResponse';
import { API } from 'infrastructure/api';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';

export const useGetUserDataQuery = () => {
  const queryFn = () => API.GET<IAuthResponse>(getRequestsOptions.GetUserData.endpoint);

  const query = useQuery<IAuthResponse, AxiosError>(
    [getRequestsOptions.GetUserData.queryKey],
    queryFn,
  );

  return query;
};
