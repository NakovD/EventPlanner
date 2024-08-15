import { useAppContext } from 'AppContext';
import { useLogOutUserQuery } from 'features/authentication/common/hooks/useLogOutUser';
import { useHeaderUserNotificationsCountQuery } from 'features/common/header/hooks/useHeaderUserNotificationsCountQuery';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

export const useHeaderUser = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const { logout } = useAppContext();

  const { handleLogoutOnServer } = useLogOutUserQuery();

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const closeDropdown = () => setIsDropdownVisible(false);

  const ref = useDetectClickOutside({ onTriggered: closeDropdown });

  const { data } = useHeaderUserNotificationsCountQuery();

  const shouldShowNotificationsCount = (data ?? 0) > 0;

  const signOut = () => {
    logout();
    handleLogoutOnServer();
  };

  return {
    isDropdownVisible,
    shouldShowNotificationsCount,
    notificationsCount: data ?? 0,
    dropdownRef: ref,
    toggleDropdown,
    signOut,
  };
};
