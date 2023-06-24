import { Button } from 'features/common/button/Button';
import { routePaths } from 'infrastructure/routing/routePaths';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="px-10 bg-secondary-light flex justify-between items-center">
      <Link className="font-extrabold text-6xl" to={routePaths.home}>
        <img className="mt-2" width={100} src="/images/logo.png" />
      </Link>
      <Button to={routePaths.login} label="Login" />
    </header>
  );
};
