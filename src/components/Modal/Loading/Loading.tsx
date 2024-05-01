import Image from 'next/image';

import StyledLoadingModal from '@/components/Modal/Loading/StyledLoadingModal';
import useShowModal from '@/hooks/dialog/useShowModal';

export default function LoadingModal({ text }: { text: string }) {
  const { showModal } = useShowModal();

  return (
    <StyledLoadingModal
      ref={showModal}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
        }
      }}
    >
      {text}
      <Image width={14} height={14} src="/icons/loading.svg" alt="" />
    </StyledLoadingModal>
  );
}
