import { doc, updateDoc } from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';
import useAuthState from '@/hooks/auth/useAuthState';

import type { FeedToUpdate } from '@/types/feed';

export default function useEditFeed() {
  const { user } = useAuthState();

  const editFeed = async (updateData: FeedToUpdate, id: string) => {
    const feedDocRef = doc(appFireStore, user.uid, user.uid, 'feed', id);
    await updateDoc(feedDocRef, updateData);
  };

  return editFeed;
}
