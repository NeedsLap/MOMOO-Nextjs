import MoreModal from '@/components/Modal/MoreModal/MoreModal';

interface Props {
  closeModal: () => void;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setChangeAlbumModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openEditFeedModal: () => void;
}

export default function FeedMoreModal({
  closeModal,
  setDeleteModalOpen,
  setChangeAlbumModalOpen,
  openEditFeedModal,
}: Props) {
  const handleDeleteFeed = () => {
    setDeleteModalOpen(true);
    closeModal();
  };

  const handleChangeAlbumModal = () => {
    setChangeAlbumModalOpen(true);
    closeModal();
  };

  const handleEditFeed = () => {
    closeModal();
    openEditFeedModal();
  };

  return (
    <MoreModal
      title="게시물 변경"
      closeModal={closeModal}
      btnList={[
        {
          name: '삭제하기',
          clickEventListener: handleDeleteFeed,
        },
        {
          name: '수정하기',
          clickEventListener: handleEditFeed,
        },
        {
          name: '앨범 변경하기',
          clickEventListener: handleChangeAlbumModal,
        },
      ]}
    />
  );
}
