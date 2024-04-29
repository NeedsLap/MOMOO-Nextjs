import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
  StyledArrayModal,
  Header,
} from '@/components/Modal/ArrayModal/StyledArrayModal';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowNonModal from '@/hooks/dialog/useShowNonModal';

import type { AlbumSortOpt } from '@/components/Modal/ArrayModal/model';

interface ArrayModalProps {
  onClose: () => void;
  selectedOption: AlbumSortOpt;
  onOptionClick: (option: AlbumSortOpt) => void;
}

export default function ArrayModal({
  onClose,
  selectedOption,
  onOptionClick,
}: ArrayModalProps) {
  const { showNonModal } = useShowNonModal();
  useEscDialog(onClose);
  const [isOpenNonModal, setIsOpenNonModal] = useState(false);

  useEffect(() => {
    if (selectedOption === null) {
      onOptionClick('latest');
    }
  }, []);

  useEffect(() => {
    const closeNonModal = (e: MouseEvent) => {
      if (!isOpenNonModal) {
        setIsOpenNonModal(true);
        return;
      }

      const targetElement = e.target as Element;
      if (!targetElement.closest('dialog')) {
        onClose();
      }
    };

    window.addEventListener('click', closeNonModal);

    return () => window.removeEventListener('click', closeNonModal);
  }, [isOpenNonModal]);

  return (
    <StyledArrayModal
      role="dialog"
      aria-labelledby="modal-select"
      ref={showNonModal}
    >
      <div className="modal-wrap">
        <Header className="modal-header" id="modal-select">
          <h2>정렬기준</h2>
        </Header>
        <div className="modal-list">
          <button
            type="submit"
            onClick={() => {
              onOptionClick('latest');
              onClose();
            }}
            className={selectedOption === 'latest' ? 'selected' : ''}
          >
            최신순
            {selectedOption === 'latest' && (
              <Image
                width={20}
                height={20}
                src="/icons/select.svg"
                alt="선택"
              />
            )}
          </button>
          <button
            type="submit"
            onClick={() => {
              onOptionClick('oldest');
              onClose();
            }}
            className={selectedOption === 'oldest' ? 'selected' : ''}
          >
            오래된순
            {selectedOption === 'oldest' && (
              <Image
                width={20}
                height={20}
                src="/icons/select.svg"
                alt="선택"
              />
            )}
          </button>
        </div>
      </div>
    </StyledArrayModal>
  );
}
