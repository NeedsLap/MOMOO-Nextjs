import { ConfirmModalDialog } from '@/components/Modal/ConfirmModal/StyledConfirmModal';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowModal from '@/hooks/dialog/useShowModal';
import { closeDialogOnClick } from '@/utils/dialog';

export default function ConfirmModal({
  onClose,
  handleAgreeBtn,
  title,
  text,
  btnNameList,
}: {
  onClose: () => void;
  handleAgreeBtn: () => void;
  title: string;
  text?: string;
  btnNameList: string[];
}) {
  const { showModal } = useShowModal();
  useEscDialog(onClose);

  return (
    <ConfirmModalDialog
      ref={showModal}
      onClick={(e) => closeDialogOnClick(e, onClose)}
    >
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
    </ConfirmModalDialog>
  );
}
