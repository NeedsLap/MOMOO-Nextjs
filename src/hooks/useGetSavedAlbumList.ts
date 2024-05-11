import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
} from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';
import useAuthState from '@/hooks/auth/useAuthState';

export default function useGetSavedAlbumList() {
  const { user } = useAuthState();

  const getSavedAlbumList = async (feedId: string) => {
    try {
      const q = query(
        collection(appFireStore, user.uid, user.uid, 'album'),
        where('feedList', 'array-contains', feedId),
      );

      const querySnapshot = await getDocs(q);
      const albumList: DocumentData[] = [];

      querySnapshot.forEach((doc) => {
        albumList.push(doc);
      });

      return albumList;
    } catch (error) {
      console.log(error);
    }
  };

  return getSavedAlbumList;
}
