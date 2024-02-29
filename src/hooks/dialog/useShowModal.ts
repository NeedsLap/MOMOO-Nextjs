import { useRef } from 'react';

export default function useShowModal() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const showModal = (node: HTMLDialogElement) => {
    if (node && !dialogRef.current) {
      node.showModal();
      dialogRef.current = node;
    }
  };

  return { showModal };
}
