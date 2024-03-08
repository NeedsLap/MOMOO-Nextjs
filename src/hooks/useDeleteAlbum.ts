import { useState } from 'react';

import { doc, deleteDoc } from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';
import useAuthState from '@/hooks/auth/useAuthState';

interface Props {
  albumId: string;
}

export default function useDeleteAlbum() {
  const { user } = useAuthState();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAlbum = async ({ albumId }: Props) => {
    const userAlbumDocRef = doc(
      appFireStore,
      user.uid,
      user.uid,
      'album',
      albumId,
    );

    try {
      setIsPending(true);

      await deleteDoc(userAlbumDocRef);
      setIsPending(false);

      return { success: true, message: '앨범이 삭제되었습니다.' };
    } catch (error) {
      setError('앨범 삭제 중 오류가 발생했습니다.');
      setIsPending(false);
      return { success: false, message: '앨범 삭제 중 오류가 발생했습니다.' };
    }
  };

  return { deleteAlbum, isPending, error };
}
