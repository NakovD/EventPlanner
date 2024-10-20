import { IInfoModalHandleProps } from 'features/common/modal/infoModal/models/infoModalHandleProps';
import { IInfoModalProps } from 'features/common/modal/infoModal/models/infoModalProps';
import { ElementRef, ForwardedRef, useImperativeHandle, useRef } from 'react';
import { useBoolean } from 'usehooks-ts';

type IUseInfoModalOptions = Omit<IInfoModalProps, 'children' | 'heading'> & {
  ref: ForwardedRef<IInfoModalHandleProps>;
};

export const useInfoModalInternal = ({ ref, onClose }: IUseInfoModalOptions) => {
  const { value, setTrue, setFalse } = useBoolean();

  const modalRef = useRef<ElementRef<'dialog'>>(null);

  const handleOpen = () => {
    setTrue();
    modalRef.current?.showModal();
  };

  const handleClose = () => {
    onClose?.();
    setFalse();
    modalRef.current?.close();
  };

  useImperativeHandle<IInfoModalHandleProps, IInfoModalHandleProps>(ref, () => ({
    openModal: handleOpen,
    closeModal: handleClose,
  }));

  const handleClickInsideModal: React.MouseEventHandler<HTMLDialogElement> = (e) => {
    if (!modalRef.current) return;
    const modalDimensions = modalRef.current.getBoundingClientRect();

    if (
      e.clientX < modalDimensions?.left ||
      e.clientX > modalDimensions?.right ||
      e.clientY < modalDimensions?.top ||
      e.clientY > modalDimensions?.bottom
    ) {
      modalRef.current?.close();
      handleClose();
    }
  };

  return {
    visible: value,
    modalRef,
    handleClose,
    handleClickInsideModal,
  };
};
