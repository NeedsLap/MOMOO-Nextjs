import Image from 'next/image';
import React, { useEffect } from 'react';

import {
  StyledArrayModal,
  Header,
} from '@/components/Modal/ArrayModal/StyledArrayModal';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowModal from '@/hooks/dialog/useShowModal';
import { closeDialogOnClick } from '@/utils/dialog';

interface ArrayModalProps {
  onClose: () => void;
  selectedOption: string | null;
  onOptionClick: (option: string) => void;
}

const ArrayModal: React.FC<ArrayModalProps> = ({
  onClose,
  selectedOption,
  onOptionClick,
}) => {
  const { showModal } = useShowModal();
  useEscDialog(onClose);

  useEffect(() => {
    if (selectedOption === null) {
      onOptionClick('latest');
    }
  }, [selectedOption, onOptionClick]);

  return (
    <StyledArrayModal
      role="dialog"
      aria-labelledby="modal-select"
      ref={showModal}
      onClick={(e) => closeDialogOnClick(e, onClose)}
    >
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
            <Image width={20} height={20} src="/icons/Select.svg" alt="선택" />
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
            <Image width={20} height={20} src="/icons/Select.svg" alt="선택" />
          )}
        </button>
      </div>
    </StyledArrayModal>
  );
};

export default ArrayModal;
