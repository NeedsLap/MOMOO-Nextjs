import { useState } from 'react';

import { User } from '@firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';
import useAuthContext from '@/hooks/useAuthContext';

interface Props {
  user?: User | null;
  albumId: string;
}

export default function useDeleteAlbum() {
  const { user: contextUser } = useAuthContext();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAlbum = async ({ albumId, user = contextUser }: Props) => {
    if (user === null) {
      return;
    }

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
