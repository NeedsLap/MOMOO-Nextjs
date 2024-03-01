import StyledAlertModal from '@/components/Modal/AlertModal/StyledAlertModal';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowModal from '@/hooks/dialog/useShowModal';
import { closeDialogOnClick } from '@/utils/dialog';

export default function AlertModal({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  const { showModal } = useShowModal();
  useEscDialog(onClose);

  return (
    <StyledAlertModal
      role="dialog"
      aria-labelledby="modal-select"
      ref={showModal}
      onClick={(e) => closeDialogOnClick(e, onClose)}
    >
      <p id="dialog-label">{message}</p>
      <button type="button" onClick={onClose}>
        확인
      </button>
    </StyledAlertModal>
  );
}
