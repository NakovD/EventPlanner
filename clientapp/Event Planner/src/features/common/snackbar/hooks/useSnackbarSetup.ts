import { ISnackbarResult } from 'features/common/snackbar/models/snackbarResult';
import { SnackBarType } from 'features/common/snackbar/models/snackBarType';
import { useState } from 'react';

interface ISnackBarOptions {
  type: SnackBarType;
  message?: string;
}

export const useSnackbarSetup = (): ISnackbarResult => {
  const [snackBarOptions, setSnackbarOptions] = useState<ISnackBarOptions>({
    message: 'This is info message',
    type: 'info',
  });

  const [isOpen, setIsOpen] = useState(false);

  const openSnackBar = () => setIsOpen(true);

  const closeSnackBar = () => setIsOpen(false);

  return {
    snackBarProps: {
      open: isOpen,
      message: snackBarOptions.message,
      type: snackBarOptions.type,
      onClose: closeSnackBar,
    },
    openSnackBar: (type: SnackBarType, message?: string) => {
      setSnackbarOptions({ message, type: type });
      openSnackBar();
    },
  };
};
