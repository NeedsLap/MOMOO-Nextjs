import { Dispatch, SetStateAction } from 'react';

import EditFeedContents from '@/components/EditFeed/EditFeedContents';
import * as Styled from '@/components/Upload/UploadModal/StyledUploadModal';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowModal from '@/hooks/dialog/useShowModal';
import { closeDialogOnClick } from '@/utils/dialog';

import type { Feed } from '@/types/feed';

export default function EditFeedModal({
  feedData,
  closeEditFeedModal,
  setFeedData,
}: {
  feedData: Feed;
  closeEditFeedModal: () => void;
  setFeedData: Dispatch<SetStateAction<Feed | null>>;
}) {
  const { showModal } = useShowModal();
  useEscDialog(closeEditFeedModal);

  return (
    <Styled.StyledDialog
      ref={showModal}
      onClick={(e) => closeDialogOnClick(e, closeEditFeedModal)}
    >
      <EditFeedContents
        close={closeEditFeedModal}
        feedData={feedData}
        setFeedData={setFeedData}
      />
      <Styled.CloseBtn
        className="closeBtn"
        onClick={closeEditFeedModal}
        aria-label="닫기"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.4001 3.60059L3.60012 20.4006"
            stroke="white"
            strokeWidth="2"
          />
          <path
            d="M20.4001 20.3999L3.60012 3.59987"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </Styled.CloseBtn>
    </Styled.StyledDialog>
  );
}
