import { cookies } from 'next/headers';

import adminAppAuth from '@/firebase/adminConfig';

const getProfile = async () => {
  const uid = cookies().get('uid')?.value || '';
  const user = await adminAppAuth.getUser(uid);
  const profile = {
    displayName: user.displayName || '',
    email: user.email || '',
    photoURL: user.photoURL || ''
  };

  return profile;
};

const getUserByUid = async (uid: string) => {
  const user = await adminAppAuth.getUser(uid);
  const userData = {
    uid,
    displayName: user.displayName || '',
    email: user.email || '',
    photoURL: user.photoURL || ''
  };

  return userData;
};

export { getProfile, getUserByUid };
