import Image from 'next/image';
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
      <Styled.CloseBtn className="closeBtn" onClick={close}>
        <Image
          src="/icons/x-white.svg"
          width={24}
          height={24}
          alt="닫기"
        ></Image>
      </Styled.CloseBtn>
    </Styled.StyledDialog>
  );
}
