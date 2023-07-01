import { constants } from 'infrastructure/constants';
import { useLocalStorage } from 'infrastructure/hooks/useLocalStorage';
import { hasValue } from 'infrastructure/utilities/hasValue';
import { createContext, useCallback, useContext, useState } from 'react';

interface IAppContextProps {
  children: React.ReactNode;
}

type AppContext = {
  isAuthenticated: boolean;
  setIsAuthenticated: (token?: string) => void;
};

const AppContextValue = createContext<AppContext | null>(null);

export const AppContextProvider = ({ children }: IAppContextProps) => {
  const { getItem, setItem, deleteItem } = useLocalStorage();

  const token = getItem<string>(constants.localStorageTokenKey);

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
