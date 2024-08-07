import StyledConfirmModal from '@/components/Modal/ConfirmModal/StyledConfirmModal';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowModal from '@/hooks/dialog/useShowModal';
import closeDialogOnClick from '@/utils/dialog';

import ConfirmModalProps from '@/components/Modal/ConfirmModal/model';

export default function ConfirmModal({
  onClose,
  handleAgreeBtn,
  title,
  text,
  btnNameList
}: ConfirmModalProps) {
  const { showModal } = useShowModal();
  useEscDialog(onClose);

  return (
    <StyledConfirmModal ref={showModal} onClick={e => closeDialogOnClick(e, onClose)}>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="btn-wrap">
        <button type="button" onClick={onClose}>
          {btnNameList[0]}
        </button>
        <button type="button" onClick={handleAgreeBtn}>
          {btnNameList[1]}
        </button>
      </div>
    </StyledConfirmModal>
  );
}
