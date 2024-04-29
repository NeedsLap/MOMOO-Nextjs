import { useState } from 'react';

import InputModal from '@/components/Modal/InputModal/InputModal';
import useAddAlbum from '@/hooks/useAddAlbum';

import type { AlbumSortOpt } from '@/components/Modal/ArrayModal/model';
import type { Album } from '@/types/album';

interface NewAlbumModalProps {
  onClose: () => void;
  setAlbumData: React.Dispatch<React.SetStateAction<Album[]>>;
  selectedOption: AlbumSortOpt;
}

export default function NewAlbumModal({
  onClose,
  setAlbumData,
  selectedOption,
}: NewAlbumModalProps) {
  const [albumName, setAlbumName] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const validateAndAddAlbum = useAddAlbum();

  const handleAlbum = async () => {
    if (isDisabled) {
      return;
    }
    try {
      const { updateData, error } = await validateAndAddAlbum({ albumName });
      if (!updateData) {
        setErrMessage(error!);
        return;
      }

      if (selectedOption === 'oldest') {
        setAlbumData((prevState) => [...prevState, updateData]);
      } else {
        setAlbumData((prevState) => [
          prevState[0],
          updateData,
          ...prevState.slice(1),
        ]);
      }

      onClose();
    } finally {
      setIsDisabled(true);
    }
  };

  const handleValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length < 1 || e.target.value.trim().length > 20) {
      setIsDisabled(true);
      setErrMessage('1~20자 사이로 입력해 주세요');
    } else {
      setErrMessage('');
      setIsDisabled(false);
    }
  };
  return (
    <InputModal
      onClose={onClose}
      title="새로운 앨범"
      text="이 앨범의 이름을 입력해 주세요"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAlbum();
        }}
      >
        <input
          type="text"
          placeholder="이름을 입력해 주세요"
          value={albumName}
          onChange={(e) => {
            setAlbumName(e.target.value.trim());
            handleValidate(e);
          }}
        />
        {errMessage !== '' && <strong role="alert">*{errMessage}</strong>}
        <div className="btn-wrap">
          <button type="button" onClick={onClose}>
            취소
          </button>
          <button type="submit" disabled={isDisabled}>
            저장
          </button>
        </div>
      </form>
    </InputModal>
  );
}
