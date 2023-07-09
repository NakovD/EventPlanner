import { SnackBarType } from 'features/common/snackbar/models/snackBarType';

export interface ISnackBarProps {
  open: boolean;
  message?: string;
  type: SnackBarType;
  onClose: () => void;
}
