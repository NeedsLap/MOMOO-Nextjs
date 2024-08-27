import { doc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

import { appFireStore } from '@/firebase/config';

import { ReduxState } from '@/modules/model';
import type { FeedToUpdateWithIndexSignature, FeedToUpdate } from '@/types/feed';

export default function useEditFeed() {
  const user = useSelector((state: ReduxState) => state.auth.user);

  const editFeed = async (updateData: FeedToUpdate, id: string) => {
    const feedDocRef = doc(appFireStore, user.uid, user.uid, 'feed', id);
    await updateDoc(feedDocRef, updateData as FeedToUpdateWithIndexSignature);
  };

  return editFeed;
}
