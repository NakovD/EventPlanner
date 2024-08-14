import { useAppContext } from 'AppContext';
import { routePaths } from 'infrastructure/routing/routePaths';
import { Navigate } from 'react-router-dom';

interface IAuthOutletProps {
  children: React.ReactNode;
}

export const AuthOutlet = ({ children }: IAuthOutletProps) => {
  const { isAuthenticated, user } = useAppContext();

  const canAccess = isAuthenticated && !!user;

  return canAccess ? children : <Navigate to={routePaths.login.path} />;
};
