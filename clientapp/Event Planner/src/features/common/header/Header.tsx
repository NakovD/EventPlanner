import { ButtonLink } from 'features/common/button/ButtonLink';
import { HeaderAdminDropdown } from 'features/common/header/components/HeaderAdminDropdown';
import { HeaderUser } from 'features/common/header/components/HeaderUser';
import { useHeader } from 'features/common/header/hooks/useHeader';
import { routePaths } from 'infrastructure/routing/routePaths';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { isAuthenticated, canSeeAdminDropdown, isVisible, ref, toggleAdminDropdown } =
    useHeader();

  return (
    <header className="px-10 pb-7 bg-secondary-light flex justify-between items-center">
      <Link className="font-extrabold text-6xl" to={routePaths.index}>
        <img className="mt-2" width={100} src="/images/logo.png" />
      </Link>
      <nav
        className="max-w-[85rem] w-full mx-auto px-8 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              data-hs-collapse="#navbar-with-mega-menu"
              aria-controls="navbar-with-mega-menu"
              aria-label="Toggle navigation"
            >
              <svg
                className="hs-collapse-open:hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                className="hs-collapse-open:block hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-with-mega-menu"
          className="hs-collapse hidden transition-all duration-300 basis-full grow sm:block"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
            <Link
              className="font-medium hover:text-primary-light"
              aria-current="page"
              to={routePaths.allEvents.path}
            >
              {routePaths.allEvents.name}
            </Link>
            <Link
              className="font-medium text-gray-600 hover:text-primary-light dark:text-gray-400 dark:hover:text-gray-500"
              to={routePaths.userEvents.path}
            >
              {routePaths.userEvents.name}
            </Link>
            <Link
              className="font-medium text-gray-600 hover:text-primary-light dark:text-gray-400 dark:hover:text-gray-500"
              to={''}
            >
              Work
            </Link>
            <div
              ref={ref}
              className="hs-dropdown relative hs-dropdown-open [--strategy:static] sm:[--strategy:relative] [--adaptive:none]"
            >
              {canSeeAdminDropdown && (
                <>
                  <button
                    onClick={toggleAdminDropdown}
                    id="hs-mega-menu-basic-dr"
                    type="button"
                    className="flex items-center w-full text-gray-600 hover:text-primary-light font-medium dark:text-gray-400 dark:hover:text-gray-500 "
                  >
                    Admin Area
                    <svg
                      className="ml-2 w-2.5 h-2.5 text-gray-600"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </button>
                  <HeaderAdminDropdown isVisible={isVisible} />
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {isAuthenticated && <HeaderUser />}
      {!isAuthenticated && (
        <ButtonLink to={routePaths.login.path} label={routePaths.login.name} />
      )}
    </header>
  );
};
