import { useState } from 'react';

export default function useOpenDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return { isDialogOpen, openDialog, closeDialog };
}
