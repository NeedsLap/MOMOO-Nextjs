import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';
import useAuthContext from '@/hooks/useAuthContext';

export function useRemoveFeedIdFromFeedList() {
  const { user } = useAuthContext();

  const removeFeedIdFromFeedList = async (
    feedId: string,
    unSelectedAlbumId: string,
  ) => {
    if (!user) {
      return;
    }

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
  const { user } = useAuthContext();

  const addFeedIdFromFeedList = async (
    feedId: string,
    selectedAlbumId: string,
  ) => {
    if (!user) {
      return;
    }

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
