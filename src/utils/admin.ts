import { cookies } from 'next/headers';

import { adminAppAuth } from '@/firebase/adminConfig';

const getUser = async () => {
  const uid = cookies().get('uid')?.value || '';
  const user = await adminAppAuth.getUser(uid);

  return user;
};

export { getUser };
