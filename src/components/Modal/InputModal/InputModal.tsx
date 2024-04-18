import { ReactNode } from 'react';

import {
  StyledInputModal,
  Header,
} from '@/components/Modal/InputModal/StyledInputModal';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowModal from '@/hooks/dialog/useShowModal';
import { closeDialogOnClick } from '@/utils/dialog';

export default function InputModal({
  onClose,
  title,
  text,
  children,
}: {
  onClose: () => void;
  title: string;
  text: string;
  children: ReactNode;
}) {
  const { showModal } = useShowModal();
  useEscDialog(onClose);

  return (
    <StyledInputModal
      ref={showModal}
      onClick={(e) => closeDialogOnClick(e, onClose)}
    >
      <Header className="modal-header">
        <h3>{title}</h3>
        <p>{text}</p>
      </Header>
      {children}
    </StyledInputModal>
  );
}
