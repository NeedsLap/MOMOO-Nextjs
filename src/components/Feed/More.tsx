import { Dispatch, SetStateAction } from 'react';

import MoreBtn from '@/components/common/MoreBtn/MoreBtn';
import EditFeedModal from '@/components/EditFeed/EditFeedModal';
import ChangeAlbumModal from '@/components/Modal/ChangeAlbumModal/ChangeAlbumModal';
import DeleteFeedModal from '@/components/Modal/DeleteFeedModal';
import MoreModal from '@/components/Modal/MoreModal/MoreModal';
import useOpenDialog from '@/hooks/dialog/useOpenDialog';
import useModalWithWebView from '@/hooks/useModalWithWebView';

import { Feed } from '@/types/feed';

export default function More({
  feed,
  setFeedsData
}: {
  feed: Feed;
  setFeedsData: Dispatch<SetStateAction<Feed[]>>;
}) {
  const {
    isDialogOpen: isMoreModalOpen,
    openDialog: openMoreModal,
    closeDialog: closeMoreModal
  } = useOpenDialog();

  const {
    isDialogOpen: isDeleteModalOpen,
    openDialog: openDeleteModal,
    closeDialog: closeDeleteModal
  } = useOpenDialog();

  const {
    isDialogOpen: isChangeAlbumModalOpen,
    openDialog: openChangeAlbumModal,
    closeDialog: closeChangeAlbumModal
  } = useOpenDialog();

  const {
    isModalOpen: isEditFeedModalOpen,
    openModal: openEditFeedModal,
    closeModal: closeEditFeedModal
  } = useModalWithWebView();

  return (
    <>
      <MoreBtn
        handleOnClick={openMoreModal}
        style={{
          float: 'right'
        }}
      />

      {isMoreModalOpen && (
        <MoreModal
          title="게시물 변경"
          closeModal={closeMoreModal}
          btnList={[
            {
              name: '삭제하기',
              clickEventHandler: openDeleteModal
            },
            {
              name: '수정하기',
              clickEventHandler: openEditFeedModal
            },
            {
              name: '앨범 변경하기',
              clickEventHandler: openChangeAlbumModal
            }
          ]}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteFeedModal id={feed.id} onClose={closeDeleteModal} setFeedsData={setFeedsData} />
      )}
      {isChangeAlbumModalOpen && (
        <ChangeAlbumModal
          id={feed.id}
          onClose={closeChangeAlbumModal}
          setFeedsData={setFeedsData}
        />
      )}
      {isEditFeedModalOpen && (
        <EditFeedModal
          feed={feed}
          closeEditFeedModal={closeEditFeedModal}
          setFeedsData={setFeedsData}
        />
      )}
    </>
  );
}
