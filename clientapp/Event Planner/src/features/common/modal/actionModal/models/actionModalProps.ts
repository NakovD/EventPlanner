import { ReactNode } from 'react';

export interface IActionModalProps {
  children: ReactNode;
  heading?: string | JSX.Element;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: VoidFunction;
  onOpen?: VoidFunction;
  onClose?: VoidFunction;
}
