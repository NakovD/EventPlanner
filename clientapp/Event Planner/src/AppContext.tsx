import { IUser } from 'features/authentication/common/models/user';
import { IBlockerStore } from 'features/common/blocker/models/blockerStore';
import { createBlockerStore } from 'features/common/blocker/store/blockerStore';
import { useSnackbarSetup } from 'features/common/snackbar/hooks/useSnackbarSetup';
import { ISnackbarResult } from 'features/common/snackbar/models/snackbarResult';
import { createContext, useCallback, useContext, useState } from 'react';
import { StoreApi, useStore } from 'zustand';

interface IAppContextBaseProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

interface IAppContextAuthenticatedProps extends IAppContextBaseProps {
  isAuthenticated: true;
  user: IUser;
}

interface IAppContextNotAuthenticatedProps extends IAppContextBaseProps {
  isAuthenticated: false;
}

type AppContextProps = IAppContextAuthenticatedProps | IAppContextNotAuthenticatedProps;

type AppContext = {
  isAuthenticated: boolean;
  user: IUser | undefined;
  setUser: (user: IUser) => void;
  logout: VoidFunction;
  blockerStore: StoreApi<IBlockerStore>;
  snackBar: ISnackbarResult;
};

const AppContextValue = createContext<AppContext | null>(null);

export const AppContextProvider = ({ children, ...rest }: AppContextProps) => {
  const [authState, setAuthState] = useState<{ isAuthenticated: boolean; user?: IUser }>({
    isAuthenticated: rest.isAuthenticated,
    user: rest.isAuthenticated ? rest.user : undefined,
  });

  const setUser = useCallback(
    (user: IUser) => setAuthState({ isAuthenticated: true, user }),
    [],
  );

  const [blockerStore] = useState(createBlockerStore);

  const { snackBarProps, openSnackBar } = useSnackbarSetup();

  const context: AppContext = {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    setUser,
    logout: () => setAuthState({ isAuthenticated: false, user: undefined }),
    blockerStore,
    snackBar: {
      snackBarProps,
      openSnackBar,
    },
  };

  return <AppContextValue.Provider value={context}>{children}</AppContextValue.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContextValue);

  if (!context)
    throw new Error('Wrap your components in AppContextProvider to use this context!');

  return context;
};

export const useBlockerStore = <U,>(selector: (state: IBlockerStore) => U) => {
  const { blockerStore } = useAppContext();

  return useStore<StoreApi<IBlockerStore>, U>(blockerStore, selector);
};
