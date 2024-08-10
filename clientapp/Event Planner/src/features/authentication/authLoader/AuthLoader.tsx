import { AppContextProvider } from 'AppContext';
import { useGetUserDataQuery } from 'features/authentication/common/hooks/useGetUserDataQuery';
import { ReactNode } from 'react';

interface IAuthLoaderProps {
  children: ReactNode;
}

export const AuthLoader = ({ children }: IAuthLoaderProps) => {
  const { data, isLoading, isSuccess } = useGetUserDataQuery();

  if (isLoading) return <p>Checking if you are logged in, please wait!</p>;

  if (isSuccess)
    return (
      <AppContextProvider
        isAuthenticated={true}
        user={{ ...data, userRoles: data.roles }}
      >
        {children}
      </AppContextProvider>
    );

  return <AppContextProvider isAuthenticated={false}>{children}</AppContextProvider>;
};
