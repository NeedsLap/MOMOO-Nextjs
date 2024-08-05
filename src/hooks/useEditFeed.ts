import { doc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

import { appFireStore } from '@/firebase/config';

import { ReduxState } from '@/modules/model';
import type { FeedBase, FeedToUpdate } from '@/types/feed';

export default function useEditFeed() {
  const user = useSelector((state: ReduxState) => state.auth.user);

  const editFeed = async (updateData: FeedBase, id: string) => {
    const feedDocRef = doc(appFireStore, user.uid, user.uid, 'feed', id);
    await updateDoc(feedDocRef, updateData as FeedToUpdate);
  };

  return editFeed;
}
