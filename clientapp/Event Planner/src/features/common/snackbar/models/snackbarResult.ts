import { ISnackBarProps } from 'features/common/snackbar/models/snackbarProps';
import { SnackBarType } from 'features/common/snackbar/models/snackBarType';

export interface ISnackbarResult {
  openSnackBar: (type: SnackBarType, message?: string) => void;
  snackBarProps: ISnackBarProps;
}
