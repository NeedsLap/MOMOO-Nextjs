import { doc, getDoc } from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';
import useAuthContext from '@/hooks/useAuthContext';

export default function useGetSharedAlbums() {
  const { user } = useAuthContext();

  async function getSharedAlbums() {
    if (!user) {
      return null;
    }

    const userDocRef = doc(appFireStore, user.uid, user.uid);
    const userDocSnap = await getDoc(userDocRef);

    return userDocSnap.data()?.sharedAlbums || null;
  }

  return { getSharedAlbums };
}
