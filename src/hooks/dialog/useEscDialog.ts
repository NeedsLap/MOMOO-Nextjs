import { useEffect } from 'react';

export default function useEscDialog(closeDialog: () => void) {
  useEffect(() => {
    const escDialog = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        closeDialog();
      }
    };

    window.addEventListener('keydown', escDialog);

    return () => {
      window.removeEventListener('keydown', escDialog);
    };
  }, []);
}
