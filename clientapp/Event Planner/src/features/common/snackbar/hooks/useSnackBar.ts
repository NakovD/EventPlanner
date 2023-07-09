import { ISnackBarProps } from 'features/common/snackbar/models/snackbarProps';
import { SnackBarType } from 'features/common/snackbar/models/snackBarType';
import { useState } from 'react';

interface IUseSnackBarOptions {
  message?: string;
  type: SnackBarType;
}

interface IUseSnackBarResult {
  snackBarProps: ISnackBarProps;
  openSnackBar: () => void;
}

export const useSnackBar = ({
  message,
  type,
}: IUseSnackBarOptions): IUseSnackBarResult => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    openSnackBar: () => setIsOpen(true),
    snackBarProps: {
      open: isOpen,
      message,
      type,
      onClose: () => setIsOpen(false),
    },
  };
};
