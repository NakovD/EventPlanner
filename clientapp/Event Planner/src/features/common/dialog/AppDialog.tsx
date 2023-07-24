import { Dialog, DialogContent } from '@mui/material';

interface IAppDialogProps {
  isOpen: boolean;
  onClose: VoidFunction;
  children: React.ReactNode;
}

export const AppDialog = ({ isOpen, onClose, children }: IAppDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
