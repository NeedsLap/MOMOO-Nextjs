import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  DocumentData,
} from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';
import useAuthContext from '@/hooks/useAuthContext';

export default function useGetSavedAlbumList() {
  const { user } = useAuthContext();

  const getSavedAlbumList = async (feedId: string) => {
    if (user === null) {
      return;
    }

    try {
      const q = query(
        collection(appFireStore, user.uid, user.uid, 'album'),
        where('feedList', 'array-contains', feedId),
        orderBy('createdTime', 'desc'),
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
