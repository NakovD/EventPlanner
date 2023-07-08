import { IAuthResponse } from 'features/authentication/models/authResponse';
import { IUser } from 'features/authentication/models/user';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { constants } from 'infrastructure/constants';
import { useLocalStorage } from 'infrastructure/hooks/useLocalStorage';
import { hasValue } from 'infrastructure/utilities/hasValue';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface IAppContextProps {
  children: React.ReactNode;
}

type AppContext = {
  isAuthenticated: boolean;
  user: IUser | undefined;
  setIsAuthenticated: (token?: string) => void;
};

const AppContextValue = createContext<AppContext | null>(null);

export const AppContextProvider = ({ children }: IAppContextProps) => {
  const { getItem, setItem, deleteItem } = useLocalStorage();

  const token = getItem<string>(constants.localStorageTokenKey);

  const [user, setUser] = useState<IUser | undefined>(undefined);

  const { data, isError, isSuccess } = useReadQuery<IAuthResponse>({
    endpoint: replacePlaceholderWithId(endpoints.user.authenticate, token ?? ''),
    queryKey: ['authenticate-user'],
    enabled: user === undefined,
  });

  useEffect(() => {
    if (isError) return authCallback();
    if (data) authCallback(data.token);
    if (isSuccess && data)
      setUser({
        userEmail: data.userEmail,
        userName: data.userName,
        userId: data.userId,
      });
  }, [isError, isSuccess]);

  const [isAuthenticated, setIsAuthenticated] = useState(hasValue(token));

  const authCallback = useCallback((token?: string) => {
    const isTokenValid = hasValue(token);
    if (!isTokenValid) {
      setIsAuthenticated(false);
      deleteItem(constants.localStorageTokenKey);
      return;
    }
    setItem(constants.localStorageTokenKey, token);
    setIsAuthenticated(true);
  }, []);

  const context: AppContext = {
    user,
    isAuthenticated,
    setIsAuthenticated: authCallback,
  };

  return <AppContextValue.Provider value={context}>{children}</AppContextValue.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContextValue);

  if (!context)
    throw new Error('Wrap your components in AppContextProvider to use this context!');

  return context;
};
