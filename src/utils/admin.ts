import { cookies } from 'next/headers';

import { adminAppAuth } from '@/firebase/adminConfig';

const getProfile = async () => {
  const uid = cookies().get('uid')?.value || '';
  const user = await adminAppAuth.getUser(uid);
  const profile = {
    displayName: user.displayName || '',
    email: user.email || '',
    photoURL: user.photoURL || '',
  };

  return profile;
};

export { getProfile };
