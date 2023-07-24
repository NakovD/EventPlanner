import { useState } from 'react';

export const useAppDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return {
    openDialog: () => setIsDialogOpen(true),
    dialogProps: {
      isOpen: isDialogOpen,
      onClose: () => setIsDialogOpen(false),
    },
  };
};
