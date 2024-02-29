import {
  ConfirmModalDialog,
  Header,
} from '@/components/Modal/ConfirmModal/StyledConfirmModal';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowModal from '@/hooks/dialog/useShowModal';
import { closeDialogOnClick } from '@/utils/dialog';

export default function ConfirmModal({
  onClose,
  handleAgreeBtn,
  title,
  btnNameList,
}: {
  onClose: () => void;
  handleAgreeBtn: () => void;
  title: string;
  btnNameList: string[];
}) {
  const { showModal } = useShowModal();
  useEscDialog(onClose);

  return (
    <ConfirmModalDialog
      aria-labelledby="modal-select"
      ref={showModal}
      onClick={(e) => closeDialogOnClick(e, onClose)}
    >
      <Header className="modal-header" id="modal-select">
        <h2>{title}</h2>
      </Header>
      <div className="modalList">
        <button type="button" onClick={onClose}>
          {btnNameList[0]}
        </button>
        <button type="button" onClick={handleAgreeBtn}>
          {btnNameList[1]}
        </button>
      </div>
    </ConfirmModalDialog>
  );
}
