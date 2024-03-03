import { getDoc, doc } from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';
import useAuthState from '@/hooks/auth/useAuthState';

export default function useGetFeedData() {
  const { user } = useAuthState();

  const getFeedData = async (feedId: string, uid?: string) => {
    try {
      const docSnap = await getDoc(
        doc(appFireStore, uid || user.uid, uid || user.uid, 'feed', feedId),
      );

      return docSnap.data();
    } catch (error) {
      console.log(error);
    }
  };

  return getFeedData;
}
