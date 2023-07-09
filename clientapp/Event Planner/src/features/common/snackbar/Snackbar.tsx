import Snackbar from '@mui/material/Snackbar';
import { Alert } from 'features/common/alert/Alert';
import { ISnackBarProps } from 'features/common/snackbar/models/snackbarProps';
import { SnackBarType } from 'features/common/snackbar/models/snackBarType';

export const SnackBar = ({ open, message, type, onClose }: ISnackBarProps) => {
  const alertType = getAlert(type, message);
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      {alertType}
    </Snackbar>
  );
};

const getAlert = (type: SnackBarType, message?: string) => {
  switch (type) {
    case 'success':
      return <Alert severity="success">{message ? message : 'Success!'}</Alert>;
    case 'error':
      return (
        <Alert severity="error">{message ? message : 'Something went wrong!'}</Alert>
      );
    case 'warning':
      return (
        <Alert severity="warning">
          {message ? message : 'Something bad might have happened!'}
        </Alert>
      );
    default:
      return (
        <Alert severity="info">
          <Alert severity="warning">
            {message ? message : 'This is some important info!'}
          </Alert>
        </Alert>
      );
  }
};
