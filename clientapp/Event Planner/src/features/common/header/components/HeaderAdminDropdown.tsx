import classNames from 'classnames';
import { routePaths } from 'infrastructure/routing/routePaths';
import { Link } from 'react-router-dom';

interface IHeaderAdminDropdownProps {
  isVisible: boolean;
}

export const HeaderAdminDropdown = ({ isVisible }: IHeaderAdminDropdownProps) => {
  const opacity = isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none';

  const styles = classNames(
    'hs-dropdown-menu absolute bg-secondary-light top-10 transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] sm:w-48 z-10 bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute sm:border before:-top-5 before:left-0 before:w-full before:h-5',
    opacity,
  );
  return (
    <>
      <div className={styles}>
        <Link
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          to={routePaths.administration.path}
        >
          Admin Home page
        </Link>
        <Link
          className="flex top items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          to={routePaths.administrationCategories.path}
        >
          {routePaths.administrationCategories.name}
        </Link>

        <Link
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          to={routePaths.administrationEvents.path}
        >
          {routePaths.administrationEvents.name}
        </Link>
      </div>
    </>
  );
};
