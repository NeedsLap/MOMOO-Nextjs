import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useSelector } from 'react-redux';

import { appFireStore } from '@/firebase/config';

import { ReduxState } from '@/modules/model';

export function useRemoveFeedIdFromFeedList() {
  const user = useSelector((state: ReduxState) => state.auth.user);
  const removeFeedIdFromFeedList = async (
    feedId: string,
    unSelectedAlbumId: string,
  ) => {
    const albumRefQuery = doc(
      appFireStore,
      user.uid,
      user.uid,
      'album',
      unSelectedAlbumId,
    );

    await updateDoc(albumRefQuery, {
      feedList: arrayRemove(feedId),
    });
  };

  return removeFeedIdFromFeedList;
}

export function useAddFeedIdFromFeedList() {
  const user = useSelector((state: ReduxState) => state.auth.user);

  const addFeedIdFromFeedList = async (
    feedId: string,
    selectedAlbumId: string,
  ) => {
    const albumRefQuery = doc(
      appFireStore,
      user.uid,
      user.uid,
      'album',
      selectedAlbumId,
    );

    await updateDoc(albumRefQuery, {
      feedList: arrayUnion(feedId),
    });
  };

  return addFeedIdFromFeedList;
}
