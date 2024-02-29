import Image from 'next/image';
import { useRef, useEffect } from 'react';

import StyledLoadingModal from '@/components/Modal/Loading/StyledLoadingModal';

export default function LoadingModal({ text }: { text: string }) {
  const modalRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {}, []);

  const setModalRef = (node: HTMLDialogElement) => {
    if (!modalRef.current) {
      modalRef.current = node;
      node.showModal();
    }
  };

  return (
    <StyledLoadingModal
      role="dialog"
      aria-labelledby="modal-select"
      ref={(node) => {
        if (node) {
          setModalRef(node);
        }
      }}
    >
      {text}
      <Image width={14} height={14} src="/icons/Loading.svg" alt="" />
    </StyledLoadingModal>
  );
}
