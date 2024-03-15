import { useParams, useRouter } from 'next/navigation';

import { doc, deleteDoc, DocumentData } from 'firebase/firestore';

import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import { appFireStore } from '@/firebase/config';
import useAuthState from '@/hooks/auth/useAuthState';
import useGetSavedAlbumList from '@/hooks/useGetSavedAlbumList';
import { useRemoveFeedIdFromFeedList } from '@/hooks/useUpdateFeedList';
import { deleteImg } from '@/utils/SDKUtils';

export default function DeleteFeedModal({
  onClose,
  imgUrlList,
}: {
  onClose: () => void;
  imgUrlList: string[];
}) {
  const getSavedAlbumList = useGetSavedAlbumList();
  const removeFeedIdFromFeedList = useRemoveFeedIdFromFeedList();
  const router = useRouter();

  const { id } = useParams<{ id: string }>();
  const { user } = useAuthState();

  const handleDeletePost = async () => {
    if (user) {
      const postDocRef = doc(appFireStore, user.uid, user.uid, 'feed', id);

      try {
        await deleteDoc(postDocRef);
        const getAlbumList = await getSavedAlbumList(id);

        if (getAlbumList !== undefined) {
          getAlbumList.forEach((albumDoc: DocumentData) => {
            removeFeedIdFromFeedList(id, albumDoc.id);
          });
        }

        router.back();

        imgUrlList.forEach(async (url) => await deleteImg(url));
      } catch (error) {
        console.error('게시글 삭제 오류:', error);
      }
    } else {
      console.error('사용자가 로그인되지 않았습니다.');
    }
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
      btnNameList={['아니요', '예']}
    />
  );
}
