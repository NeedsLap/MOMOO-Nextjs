import { useRef } from 'react';

export default function useShowNonModal() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const showNonModal = (node: HTMLDialogElement) => {
    if (node && !dialogRef.current) {
      node.show();
      dialogRef.current = node;
    }
  };

  return { showNonModal };
}
