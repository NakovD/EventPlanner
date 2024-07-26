import { useAppContext } from 'AppContext';
import { useHeaderUserNotificationsCountQuery } from 'features/common/header/hooks/useHeaderUserNotificationsCountQuery';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

export const useHeaderUser = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const { setIsAuthenticated } = useAppContext();

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const closeDropdown = () => setIsDropdownVisible(false);

  const ref = useDetectClickOutside({ onTriggered: closeDropdown });

  const signOut = () => setIsAuthenticated();

  const { data } = useHeaderUserNotificationsCountQuery();

  const shouldShowNotificationsCount = (data ?? 0) > 0;

  return {
    isDropdownVisible,
    shouldShowNotificationsCount,
    notificationsCount: data ?? 0,
    dropdownRef: ref,
    toggleDropdown,
    signOut,
  };
};
