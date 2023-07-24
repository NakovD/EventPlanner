import { Dialog, DialogContent } from '@mui/material';

interface IAppDialogProps {
  isOpen: boolean;
  children: React.ReactNode;
  actions?: React.ReactNode;
  onClose: VoidFunction;
}

export const AppDialog = ({ isOpen, actions, children, onClose }: IAppDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>{children}</DialogContent>
      {actions && actions}
    </Dialog>
  );
};
