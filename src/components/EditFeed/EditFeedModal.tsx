import React, { SetStateAction, useRef } from 'react';

import EditFeedContents from '@/components/EditFeed/EditFeedContents';
import * as Styled from '@/components/Upload/UploadModal/StyledUploadModal';

import type { Feed } from '@/types/feed';

export default function EditFeedModal({
  feedData,
  closeEditFeedModal,
  setFeedData,
}: {
  feedData: Feed;
  closeEditFeedModal: () => void;
  setFeedData: React.Dispatch<SetStateAction<Feed | null>>;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  return (
    <Styled.StyledDialog
      ref={(node) => {
        if (node && !dialogRef.current) {
          node.showModal();
          dialogRef.current = node;
        }
      }}
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
