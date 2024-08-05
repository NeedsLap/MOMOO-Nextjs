import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';

import { appFireStore } from '@/firebase/config';

import { ReduxState } from '@/modules/model';

export default function useGetSavedAlbumList() {
  const user = useSelector((state: ReduxState) => state.auth.user);

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
