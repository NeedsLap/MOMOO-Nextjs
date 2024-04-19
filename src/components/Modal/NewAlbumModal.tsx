import { useState } from 'react';

import InputModal from '@/components/Modal/InputModal/InputModal';
import useAddAlbum from '@/hooks/useAddAlbum';

import type { Album } from '@/types/album';
interface NewAlbumModalProps {
  onClose: () => void;
  setAlbumData: React.Dispatch<React.SetStateAction<Album[]>>;
}
const NewAlbumModal = ({ onClose, setAlbumData }: NewAlbumModalProps) => {
  const [albumName, setAlbumName] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validateAndAddAlbum = useAddAlbum();

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

      const result = await validateAndAddAlbum({ albumName });
      if (result.updateData) {
        setAlbumData((prevState) => [...prevState, result.updateData]);
        onClose();
      } else {
        setErrMessage(result.error!);
        return;
      }

      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <InputModal
      onClose={onClose}
      title="새로운 앨범"
      text="이 앨범의 이름을 입력해주세요"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAlbum();
        }}
      >
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />
        {errMessage !== '' && <strong role="alert">*{errMessage}</strong>}
        <div className="btn-wrap">
          <button type="button" onClick={onClose}>
            취소
          </button>
          <button type="submit" disabled={isSubmitting}>
            저장
          </button>
        </div>
      </form>
    </InputModal>
  );
};
export default NewAlbumModal;