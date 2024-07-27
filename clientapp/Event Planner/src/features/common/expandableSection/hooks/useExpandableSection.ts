import { useState } from 'react';

interface IUseExpanandableSectionOptions {
  defaultVisible: boolean;
}

export const useExpandableSection = ({
  defaultVisible,
}: IUseExpanandableSectionOptions) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);

  const toggleSection = () => setIsVisible(!isVisible);

  const sectionAccent = isVisible && 'font-bold';

  return {
    isVisible,
    sectionAccent,
    toggleSection,
  };
};
