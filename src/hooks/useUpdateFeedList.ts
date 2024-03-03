import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';
import useAuthState from '@/hooks/auth/useAuthState';

export function useRemoveFeedIdFromFeedList() {
  const { user } = useAuthState();

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
  const { user } = useAuthState();

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
