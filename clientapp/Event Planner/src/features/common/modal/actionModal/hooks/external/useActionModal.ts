import { IActionModalHandleProps } from 'features/common/modal/actionModal/models/actionModalHandleProps';
import { useRef } from 'react';

export const useActionModal = () => {
  const modalRef = useRef<IActionModalHandleProps>(null);

  return {
    modalRef: modalRef,
    openModal: () => {
      modalRef.current?.openModal();
    },
    closeModal: () => {
      modalRef.current?.closeModal();
    },
  };
};
