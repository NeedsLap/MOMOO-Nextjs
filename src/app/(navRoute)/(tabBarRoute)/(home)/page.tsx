import { Metadata } from 'next';
import { cookies } from 'next/headers';

import Home from '@/containers/home/Home';
import { getAlbumListHandle } from '@/utils/apis';

export const metadata: Metadata = {
  title: 'Home | MOMOO',
};

export default async function page() {
  const cookie = cookies().toString();
  const album = await getAlbumListHandle(cookie);

  return <Home album={album} />;
}
