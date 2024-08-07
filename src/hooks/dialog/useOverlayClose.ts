import { useEffect } from 'react';

const useOverlayClose = (
  dialogRef: React.RefObject<HTMLDialogElement>,
  closeFunction: () => void
) => {
  useEffect(() => {
    const handleOverlayClick = (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        closeFunction();
      }
    };

    const dialog = dialogRef.current;
    dialog?.addEventListener('click', handleOverlayClick);

    return () => {
      dialog?.removeEventListener('click', handleOverlayClick);
    };
  }, []);
};

export default useOverlayClose;
