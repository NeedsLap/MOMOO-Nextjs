import { Metadata } from 'next';

import My from '@/containers/my/My';
import { getProfile } from '@/utils/admin';

export const metadata: Metadata = {
  title: 'My | MOMOO'
};

export default async function page() {
  const profile = await getProfile();

  return <My profile={profile} />;
}
