import { useRouter } from 'next/navigation';
import { SetStateAction } from 'react';

import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import { deleteFeed } from '@/services/feed';

import type { Feed } from '@/types/feed';

export default function DeleteFeedModal({
  id,
  onClose,
  setFeedsData,
}: {
  id: string;
  onClose: () => void;
  setFeedsData: React.Dispatch<SetStateAction<Feed[]>>;
}) {
  const router = useRouter();

  const handleDeletePost = async () => {
    try {
      await deleteFeed(id);
      setFeedsData((prev) => prev.filter((v) => v.id !== id));
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
      text="모든 앨범에서 삭제됩니다"
      btnNameList={['아니요', '예']}
    />
  );
}
