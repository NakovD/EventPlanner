import { IInfoModalHandleProps } from 'features/common/modal/infoModal/models/infoModalHandleProps';
import { useRef } from 'react';

export const useInfoModal = () => {
  const modalRef = useRef<IInfoModalHandleProps>(null);

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
