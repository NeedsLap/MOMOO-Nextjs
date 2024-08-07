import { collection, query, where, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';

import { appFireStore } from '@/firebase/config';
import { addAlbum } from '@/utils/SDKUtils';

import { ReduxState } from '@/modules/model';
import type { Album, AlbumOfDatabase } from '@/types/album';

interface Props {
  albumName: string;
}

export default function useAddAlbum() {
  const user = useSelector((state: ReduxState) => state.auth.user);
  const validateAndAddAlbum = async ({ albumName }: Props) => {
    const userAlbumDocRef = collection(
      appFireStore,
      user.uid,
      user.uid,
      'album',
    );
    const duplicateAlbumQuery = query(
      userAlbumDocRef,
      where('name', '==', albumName),
    );

    const duplicateAlbumSnapshot = await getDocs(duplicateAlbumQuery);
    if (!duplicateAlbumSnapshot.empty) {
      // 유효성 검사: 이미 동일한 이름의 앨범이 존재하는 경우 처리
      return { success: false, error: '이미 동일한 이름의 앨범이 존재합니다.' };
    }

    try {
      await addAlbum(user.uid, albumName);
      const querySnapshot = await getDocs(duplicateAlbumQuery);
      if (querySnapshot) {
        const doc = querySnapshot.docs[0];
        const albumData = doc.data() as AlbumOfDatabase;
        const updateData: Album = {
          ...albumData,
          createdTime: albumData.createdTime.toMillis(),
          id: doc.id,
          imageUrl: null,
          user: { uid: user.uid },
        };

        return {
          updateData,
          success: true,
        };
      } else {
        return { updateData: null, success: true };
      }
    } catch (error) {
      return {
        success: false,
        error: '앨범을 추가하는 동안 오류가 발생했습니다.',
      };
    }
  };

  return validateAndAddAlbum;
}
