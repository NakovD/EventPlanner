import { useAppContext } from 'AppContext';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

export const useHeader = () => {
  const { isAuthenticated } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);

  const toggleAdminDropdown = () => setIsVisible(!isVisible);

  const closeAdminDropdown = () => setIsVisible(false);

  const ref = useDetectClickOutside({ onTriggered: closeAdminDropdown });

  return {
    isAuthenticated,
    isVisible,
    ref,
    toggleAdminDropdown,
    closeAdminDropdown,
  };
};
