import { ReactNode } from 'react';

export interface IInfoModalProps {
  children: ReactNode;
  heading?: string | JSX.Element;
  onClose?: VoidFunction;
}
