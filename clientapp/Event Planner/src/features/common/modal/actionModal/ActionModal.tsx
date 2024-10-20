import { Button } from 'features/common/button/Button';
import { useActionModalInternal } from 'features/common/modal/actionModal/hooks/internal/useActionModalInternal';
import { IActionModalHandleProps } from 'features/common/modal/actionModal/models/actionModalHandleProps';
import { IActionModalProps } from 'features/common/modal/actionModal/models/actionModalProps';
import { forwardRef } from 'react';

export const ActionModal = forwardRef<IActionModalHandleProps, IActionModalProps>(
  ({ heading, children, confirmLabel, cancelLabel, onOpen, onClose, onConfirm }, ref) => {
    const { modalRef, handleConfirm, handleClose, handleClickInsideModal } =
      useActionModalInternal({
        ref,
        onClose,
        onOpen,
        onConfirm,
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
        <div className="grid justify-items-center items-center grid-cols-2 grid-rows-1">
          <Button label={confirmLabel} onClick={handleConfirm} />
          <Button label={cancelLabel} onClick={handleClose} />
        </div>
      </dialog>
    );
  },
);

ActionModal.displayName = 'ActionModal';
