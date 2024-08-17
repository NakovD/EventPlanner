import { useAppContext } from 'AppContext';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export const useErrorHandler = (error: AxiosError | null) => {
  const { logout } = useAppContext();

  useEffect(() => {
    if (!error) return;

    if (error.response?.status !== 401) return;

    logout();
  }, [error]);
};
