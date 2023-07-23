import { useAppContext } from 'AppContext';
import { UserRoleType } from 'features/administration/enums/UserRoleType';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

export const useHeader = () => {
  const { isAuthenticated, user } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);

  const toggleAdminDropdown = () => setIsVisible(!isVisible);

  const closeAdminDropdown = () => setIsVisible(false);

  const ref = useDetectClickOutside({ onTriggered: closeAdminDropdown });

  const canSeeAdminDropdown =
    isAuthenticated && user?.userRoles.includes(UserRoleType.Admin);

  return {
    isAuthenticated,
    canSeeAdminDropdown,
    isVisible,
    ref,
    toggleAdminDropdown,
    closeAdminDropdown,
  };
};
