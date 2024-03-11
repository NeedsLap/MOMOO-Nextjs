import { Metadata } from 'next';

import EditProfile from '@/containers/editProfile/EditProfile';
import { getUser } from '@/utils/admin';

export const metadata: Metadata = {
  title: 'Edit profile | MOMOO',
};

export default async function page() {
  const user = await getUser();
  const userData = {
    displayName: user.displayName || '',
    email: user.email || '',
    photoURL: user.photoURL || '',
  };

  return <EditProfile userData={userData} />;
}
