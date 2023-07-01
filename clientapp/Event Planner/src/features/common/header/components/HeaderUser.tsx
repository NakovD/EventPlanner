import { useAppContext } from 'AppContext';
import { routePaths } from 'infrastructure/routing/routePaths';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { Link } from 'react-router-dom';

export const HeaderUser = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const { setIsAuthenticated } = useAppContext();

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const closeDropdown = () => setIsDropdownVisible(false);

  const ref = useDetectClickOutside({ onTriggered: closeDropdown });

  const signOut = () => setIsAuthenticated();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={toggleDropdown}
        className="relative w-10 h-10 overflow-hidden rounded-full shrink-0 grid place-items-center"
      >
        <svg
          className="absolute w-12 h-12 text-gray-400 -left-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {isDropdownVisible && (
        <div
          id="dropdown"
          className="z-10 absolute right-4 bg-secondary-light divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <Link
                to={routePaths.allEvents.path}
                className="block px-4 py-2 hover:underline dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to={routePaths.allEvents.path}
                className="block px-4 py-2 hover:underline dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
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
