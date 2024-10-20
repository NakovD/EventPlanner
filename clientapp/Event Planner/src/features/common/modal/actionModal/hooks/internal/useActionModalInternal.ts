import { IActionModalHandleProps } from 'features/common/modal/actionModal/models/actionModalHandleProps';
import { IActionModalProps } from 'features/common/modal/actionModal/models/actionModalProps';
import { ElementRef, ForwardedRef, useImperativeHandle, useRef } from 'react';
import { useBoolean } from 'usehooks-ts';

type IUseActionModalOptions = Omit<
  IActionModalProps,
  'children' | 'confirmLabel' | 'cancelLabel' | 'heading'
> & {
  ref: ForwardedRef<IActionModalHandleProps>;
};

export const useActionModalInternal = ({
  ref,
  onOpen,
  onClose,
  onConfirm,
}: IUseActionModalOptions) => {
  const { value, setTrue, setFalse } = useBoolean();

  const modalRef = useRef<ElementRef<'dialog'>>(null);

  const handleOpen = () => {
    onOpen?.();
    setTrue();
    modalRef.current?.showModal();
  };

  const handleClose = () => {
    onClose?.();
    setFalse();
    modalRef.current?.close();
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  useImperativeHandle<IActionModalHandleProps, IActionModalHandleProps>(ref, () => ({
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
    handleConfirm,
    handleClose,
    handleClickInsideModal,
  };
};
