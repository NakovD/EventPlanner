import { useAppContext } from 'AppContext';
import { UserRoleType } from 'features/administration/enums/UserRoleType';
import { routePaths } from 'infrastructure/routing/routePaths';
import { Navigate } from 'react-router-dom';

interface IAuthorizeOutletProps {
  children: React.ReactNode;
}

export const AuthorizeOutlet = ({ children }: IAuthorizeOutletProps) => {
  const { user } = useAppContext();

  const canAccess = user?.userRoles.includes(UserRoleType.Admin);

  if (canAccess) return children;

  return <Navigate to={routePaths.userEvents.path} />;
};
