import { useRouter } from 'next/navigation';
import React, { SetStateAction } from 'react';

import { doc, deleteDoc, DocumentData } from 'firebase/firestore';

import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import { appFireStore } from '@/firebase/config';
import useAuthState from '@/hooks/auth/useAuthState';
import useGetSavedAlbumList from '@/hooks/useGetSavedAlbumList';
import { useRemoveFeedIdFromFeedList } from '@/hooks/useUpdateFeedList';
import { deleteImg } from '@/utils/SDKUtils';

import type { Feed } from '@/types/feed';

export default function DeleteFeedModal({
  id,
  onClose,
  imgUrlList,
  setFeedData,
}: {
  id: string;
  onClose: () => void;
  imgUrlList: string[];
  setFeedData: React.Dispatch<SetStateAction<Feed | null>>;
}) {
  const getSavedAlbumList = useGetSavedAlbumList();
  const removeFeedIdFromFeedList = useRemoveFeedIdFromFeedList();
  const { user } = useAuthState();

  const router = useRouter();

  const handleDeletePost = async () => {
    const postDocRef = doc(appFireStore, user.uid, user.uid, 'feed', id);

    try {
      await deleteDoc(postDocRef);
      const getAlbumList = await getSavedAlbumList(id);

      if (getAlbumList !== undefined) {
        getAlbumList.forEach((albumDoc: DocumentData) => {
          removeFeedIdFromFeedList(id, albumDoc.id);
        });
      }

      imgUrlList.forEach(async (url) => await deleteImg(url));
      setFeedData(null);
      router.refresh();
    } catch (error) {
      console.error('게시글 삭제 오류:', error);
    }

    onClose();
  };

  return (
    <ConfirmModal
      onClose={onClose}
      handleAgreeBtn={() => {
        (async () => {
          await handleDeletePost();
        })();
      }}
      title="게시물을 삭제하시겠습니까?"
      text="해당 앨범에서만 삭제됩니다"
      btnNameList={['아니요', '예']}
    />
  );
}
