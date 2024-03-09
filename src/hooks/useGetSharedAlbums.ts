import { doc, getDoc } from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';
import useAuthState from '@/hooks/auth/useAuthState';

export default function useGetSharedAlbums() {
  const { user } = useAuthState();

  const getSharedAlbums = async () => {
    const userDocRef = doc(appFireStore, user.uid, user.uid);
    const userDocSnap = await getDoc(userDocRef);

    return userDocSnap.data()?.sharedAlbums || null;
  };

  return { getSharedAlbums };
}
