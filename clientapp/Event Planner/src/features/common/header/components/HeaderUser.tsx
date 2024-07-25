import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useHeaderUser } from 'features/common/header/hooks/useHeaderUser';
import { routePaths } from 'infrastructure/routing/routePaths';
import { Link } from 'react-router-dom';

export const HeaderUser = () => {
  const {
    isDropdownVisible,
    shouldShowNotificationsCount,
    notificationsCount,
    dropdownRef,
    signOut,
    toggleDropdown,
  } = useHeaderUser();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative w-10 h-10 rounded-full shrink-0 grid place-items-center"
      >
        <AccountBoxIcon sx={{ width: '40px', height: '40px' }} color="secondary" />
        {shouldShowNotificationsCount && (
          <div className="w-5 h-5 text-sm bg-primary-light rounded-full absolute top-0 -right-1">
            {notificationsCount}
          </div>
        )}
      </button>
      {isDropdownVisible && (
        <div
          id="dropdown"
          className="z-10 absolute right-0 bg-secondary-light divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <Link
                to={routePaths.notifications.path}
                className="flex justify-between px-4 py-2 hover:underline dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Notifications{' '}
                <NotificationsActiveIcon
                  color="info"
                  sx={{ width: '20px', height: '20px' }}
                />
              </Link>
            </li>
            <li>
              <Link
                to={routePaths.allEvents.path}
                className="block px-4 py-2 hover:underline dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Mark All notifications as readed
              </Link>
            </li>
            <li>
              <Link
                to={routePaths.allEvents.path}
                className="block px-4 py-2 hover:underline dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </Link>
            </li>
            <li>
              <button
                onClick={signOut}
                className="block px-4 py-2 hover:underline dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
