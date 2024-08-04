import MoreModal from '@/components/Modal/MoreModal/MoreModal';

interface Props {
  closeModal: () => void;
  setIsEditAlbumModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSharingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AlbumMoreModal({
  closeModal,
  setIsEditAlbumModalOpen,
  setIsSharingModalOpen,
}: Props) {
  const openEditAlbumModal = () => {
    setIsEditAlbumModalOpen(true);
  };

  const openSharingModalOpen = () => {
    setIsSharingModalOpen(true);
  };

  return (
    <MoreModal
      title="게시물 변경"
      closeModal={closeModal}
      btnList={[
        {
          name: '수정하기',
          clickEventHandler: openEditAlbumModal,
        },
        {
          name: '공유 대상',
          clickEventHandler: openSharingModalOpen,
        },
      ]}
    />
  );
}
