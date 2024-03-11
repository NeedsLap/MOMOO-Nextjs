import { Metadata } from 'next';

import EditProfile from '@/containers/editProfile/EditProfile';
import { getProfile } from '@/utils/admin';

export const metadata: Metadata = {
  title: 'Edit profile | MOMOO',
};

export default async function page() {
  const profile = await getProfile();

  return <EditProfile profile={profile} />;
}
