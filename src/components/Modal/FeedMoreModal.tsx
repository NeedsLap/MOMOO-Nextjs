import { useParams, useRouter } from 'next/navigation';

import { useDispatch } from 'react-redux';

import MoreModal from '@/components/Modal/MoreModal/MoreModal';
import useWindowWidth from '@/hooks/useWindowWidth';
import { openEditFeedModal } from '@/modules/editFeedModal';

interface Props {
  closeModal: () => void;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setChangeAlbumModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FeedMoreModal({
  closeModal,
  setDeleteModalOpen,
  setChangeAlbumModalOpen,
}: Props) {
  const windowWidth = useWindowWidth();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDeleteFeed = () => {
    setDeleteModalOpen(true);
    closeModal();
  };

  const handleChangeAlbumModal = () => {
    setChangeAlbumModalOpen(true);
    closeModal();
  };

  const goToEditFeed = () => {
    if (windowWidth && windowWidth > 430) {
      dispatch(openEditFeedModal(id));
      closeModal();
    } else {
      router.push(`/edit/${id}`);
    }
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
          clickEventListener: goToEditFeed,
        },
        {
          name: '앨범 변경하기',
          clickEventListener: handleChangeAlbumModal,
        },
      ]}
    />
  );
}
