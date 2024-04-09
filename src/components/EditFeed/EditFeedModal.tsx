import React, { SetStateAction, useRef } from 'react';

import EditFeedContents from '@/components/EditFeed/EditFeedContents';
import * as Styled from '@/components/Upload/UploadModal/StyledUploadModal';

import type { Feed } from '@/types/feed';

export default function EditFeedModal({
  id,
  setIsModalOpen,
  setFeedData,
}: {
  id: string;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setFeedData: React.Dispatch<SetStateAction<Feed | null>>;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const close = () => {
    setIsModalOpen(false);
  };

  return (
    <Styled.StyledDialog
      ref={(node) => {
        if (node && !dialogRef.current) {
          node.showModal();
          dialogRef.current = node;
        }
      }}
    >
      <EditFeedContents close={close} id={id} setFeedData={setFeedData} />
      <Styled.CloseBtn className="closeBtn" onClick={close} aria-label="닫기">
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
