import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';
import useAuthState from '@/hooks/auth/useAuthState';

interface Props {
  editAlbumName: string;
  albumId: string;
}

export default function useEditAlbum() {
  const { user } = useAuthState();

  const editAlbum = async ({ editAlbumName, albumId }: Props) => {
    const userAlbumDocRef = doc(
      appFireStore,
      user.uid,
      user.uid,
      'album',
      albumId,
    );

    try {
      const duplicateAlbumQuery = query(
        collection(appFireStore, user.uid, user.uid, 'album'),
        where('name', '==', editAlbumName),
      );

      const duplicateAlbumSnapshot = await getDocs(duplicateAlbumQuery);
      if (!duplicateAlbumSnapshot.empty) {
        return {
          success: false,
          error: '이미 동일한 이름의 앨범이 존재합니다.',
        };
      }

      await updateDoc(userAlbumDocRef, {
        name: editAlbumName,
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: '앨범을 수정하는 동안 오류가 발생했습니다.',
      };
    }
  };

  return editAlbum;
}
