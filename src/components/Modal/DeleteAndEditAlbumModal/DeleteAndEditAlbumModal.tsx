import Image from 'next/image';
import React, { useState, SetStateAction, useEffect } from 'react';

import LoadingComponent from '@/components/Loading/LoadingComponent';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import {
  StyledDeleteAndEditAlbumDialog,
  Header,
} from '@/components/Modal/DeleteAndEditAlbumModal/StyledDeleteAndEditAlbumModal';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowModal from '@/hooks/dialog/useShowModal';
import useDeleteAlbum from '@/hooks/useDeleteAlbum';
import useEditAlbum from '@/hooks/useEditAlbum';
import { closeDialogOnClick } from '@/utils/dialog';

import type { Album } from '@/types/album';

interface DeleteAndEditAlbumModalProps {
  onClose: () => void;
  albumName: string;
  albumId: string;
  setAlbumsData: React.Dispatch<SetStateAction<Album[]>>;
  index: number;
}

export default function DeleteAndEditAlbumModal({
  onClose,
  albumName,
  albumId,
  setAlbumsData,
  index,
}: DeleteAndEditAlbumModalProps) {
  const [editAlbumName, setEditAlbumName] = useState(albumName);
  const [errMessage, setErrMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const editAlbum = useEditAlbum();
  const { deleteAlbumAndHandleException, isPending, error } = useDeleteAlbum();
  const { showModal } = useShowModal();
  useEscDialog(onClose);

  const handleEditAlbum = async () => {
    if (editAlbumName.trim() === '') {
      setErrMessage('제목을 입력해 주세요');
      return;
    }
    const result = await editAlbum({ editAlbumName, albumId });
    if (!result.success) {
      setErrMessage(result.error!);
      return;
    } else {
      setAlbumsData((prev) => [
        ...prev.slice(0, index),
        { ...prev[index], name: editAlbumName },
        ...prev.slice(index + 1),
      ]);
    }
    onClose();
  };

  const handleDeleteAlbum = () => {
    setShowConfirmModal(true);
  };

  const handleDeleteSuccess = async () => {
    const { success } = await deleteAlbumAndHandleException({ albumId });
    if (success) {
      setAlbumsData((prev) => [
        ...prev.slice(0, index),
        ...prev.slice(index + 1),
      ]);
      setShowConfirmModal(false);
    }
  };

  useEffect(() => {
    if (error) {
      setShowConfirmModal(false);
    }
  }, [error]);

  return (
    <>
      {error ? (
        <AlertModal message={'삭제를 실패하였습니다'} onClose={onClose} />
      ) : (
        <>
          <StyledDeleteAndEditAlbumDialog
            role="dialog"
            aria-labelledby="modal-select"
            ref={showModal}
            onClick={(e) => closeDialogOnClick(e, onClose)}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditAlbum();
              }}
            >
              <Header className="modal-header" id="modal-select">
                <h2>Edit Album</h2>
              </Header>
              <div className="modal-list">
                <p>이름</p>
                <input
                  type="text"
                  value={editAlbumName}
                  onChange={(e) => {
                    setEditAlbumName(e.target.value);
                  }}
                  placeholder="새로운 앨범명을 입력해주세요"
                />
                {errMessage !== '' && (
                  <strong role="alert">*{errMessage}</strong>
                )}
                <button type="button" onClick={handleDeleteAlbum}>
                  Delete
                  <Image
                    width={20}
                    height={20}
                    src="/icons/delete-red.svg"
                    alt="휴지통 아이콘"
                  />
                </button>
              </div>
              <button
                onClick={handleEditAlbum}
                className="edit-btn"
                type="submit"
              >
                저장
              </button>
              <button
                type="button"
                className="close-button"
                onClick={onClose}
                aria-label="모달 닫기"
              >
                <Image width={20} height={20} src="/icons/x.svg" alt="" />
              </button>
            </form>
          </StyledDeleteAndEditAlbumDialog>
          {showConfirmModal && (
            <ConfirmModal
              onClose={() => setShowConfirmModal(false)}
              handleAgreeBtn={handleDeleteSuccess}
              title={`앨범을 정말 삭제하시겠습니까?`}
              btnNameList={['취소', '확인']}
            />
          )}
          {isPending && <LoadingComponent />}
        </>
      )}
    </>
  );
}
