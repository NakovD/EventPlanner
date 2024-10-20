import { useInfoModalInternal } from 'features/common/modal/infoModal/hooks/internal/useInfoModalInternal';
import { IInfoModalHandleProps } from 'features/common/modal/infoModal/models/infoModalHandleProps';
import { IInfoModalProps } from 'features/common/modal/infoModal/models/infoModalProps';
import { forwardRef } from 'react';

export const InfoModal = forwardRef<IInfoModalHandleProps, IInfoModalProps>(
  ({ children, heading, onClose }, ref) => {
    const { modalRef, handleClickInsideModal } = useInfoModalInternal({
      ref,
      onClose,
    });

    const isHeadingString = typeof heading === 'string';

    const isHeadingJSX = typeof heading === 'object';
    return (
      <dialog
        ref={modalRef}
        className="p-4 rounded-lg open:grid gap-4"
        onClick={handleClickInsideModal}
      >
        {isHeadingString && <h3>{heading}</h3>}
        {isHeadingJSX && heading}
        <div>{children}</div>
      </dialog>
    );
  },
);

InfoModal.displayName = 'InfoModal';
