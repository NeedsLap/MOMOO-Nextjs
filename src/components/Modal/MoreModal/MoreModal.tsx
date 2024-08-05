import Image from 'next/image';

import { StyledDialog, Header } from '@/components/Modal/MoreModal/StyledMoreModal';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowModal from '@/hooks/dialog/useShowModal';
import closeDialogOnClick from '@/utils/dialog';

import type MoreModalProps from '@/components/Modal/MoreModal/model';

export default function MoreModal({ title, closeModal, btnList }: MoreModalProps) {
  const { showModal } = useShowModal();
  useEscDialog(closeModal);

  return (
    <StyledDialog
      aria-labelledby="modal-select"
      ref={showModal}
      onClick={e => closeDialogOnClick(e, closeModal)}
    >
      <div className="modal-content" role="document">
        <Header className="modal-header" id="modal-select">
          <strong>{title}</strong>
        </Header>
        <ul className="modal-list">
          {btnList.map(v => (
            <li key={v.name}>
              <button
                type="button"
                onClick={() => {
                  closeModal();
                  v.clickEventHandler();
                }}
              >
                {v.name}
              </button>
            </li>
          ))}
        </ul>
        <button type="button" className="close-button" onClick={closeModal} aria-label="모달 닫기">
          <Image width={16} height={16} src="/icons/x-small.svg" alt="" />
        </button>
      </div>
    </StyledDialog>
  );
}
