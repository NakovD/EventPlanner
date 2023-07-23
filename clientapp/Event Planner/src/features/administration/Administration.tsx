import { routePaths } from 'infrastructure/routing/routePaths';
import { Link } from 'react-router-dom';

export const Administration = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-12">Hi there, admin!</h1>
      <p className="mb-5">Here you can manage some of the entities in the site!</p>
      <Link
        className="text-lg text-light-blue font-semibold"
        to={routePaths.administrationCategories.path}
      >
        {routePaths.administrationCategories.name}
      </Link>
    </>
  );
};
