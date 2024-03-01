import { useState } from 'react';

import {
  NewAlbumDialog,
  Header,
} from '@/components/Modal/NewAlbumModal/StyledNewAlbumModal';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowModal from '@/hooks/dialog/useShowModal';
import useAddAlbum from '@/hooks/useAddAlbum';
import { closeDialogOnClick } from '@/utils/dialog';

const NewAlbumModal = ({ onClose }: { onClose: () => void }) => {
  const [albumName, setAlbumName] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addAlbum = useAddAlbum();
  const { showModal } = useShowModal();
  useEscDialog(onClose);

  const handleAlbum = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (albumName.trim().length < 1 || albumName.trim().length > 20) {
        setErrMessage('1자에서 20자 사이로 입력해 주세요');
        return;
      }

      const result = await addAlbum({ albumName });

      if (!result.success) {
        setErrMessage(result.error!);
        return;
      }

      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <NewAlbumDialog
      role="dialog"
      aria-labelledby="modal-select"
      ref={showModal}
      onClick={(e) => closeDialogOnClick(e, onClose)}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAlbum();
        }}
      >
        <Header className="modal-header" id="modal-select">
          <h2 tabIndex={0}>새로운 앨범</h2>
          <p>이 앨범의 이름을 입력해주세요</p>
          <input
            type="text"
            placeholder="이름을 입력해주세요"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
          />
          {errMessage !== '' && <strong role="alert">*{errMessage}</strong>}
        </Header>
        <div className="modal-list">
          <button type="button" onClick={onClose}>
            취소
          </button>
          <button type="submit" onClick={handleAlbum} disabled={isSubmitting}>
            저장
          </button>
        </div>
      </form>
    </NewAlbumDialog>
  );
};
export default NewAlbumModal;
