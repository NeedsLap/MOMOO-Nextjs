import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';
import useAuthState from '@/hooks/auth/useAuthState';

export function useRemoveFeedIdFromFeedList() {
  const { uid } = useAuthState();

  const removeFeedIdFromFeedList = async (
    feedId: string,
    unSelectedAlbumId: string,
  ) => {
    const albumRefQuery = doc(
      appFireStore,
      uid,
      uid,
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
  const { uid } = useAuthState();

  const addFeedIdFromFeedList = async (
    feedId: string,
    selectedAlbumId: string,
  ) => {
    const albumRefQuery = doc(appFireStore, uid, uid, 'album', selectedAlbumId);

    await updateDoc(albumRefQuery, {
      feedList: arrayUnion(feedId),
    });
  };

  return addFeedIdFromFeedList;
}
