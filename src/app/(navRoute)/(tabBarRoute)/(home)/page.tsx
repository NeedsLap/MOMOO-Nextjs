import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import Home from '@/containers/home/Home';
import { getAlbumListHandle } from '@/utils/apis';

export const metadata: Metadata = {
  title: 'Home | MOMOO',
};

export default async function page() {
  const hasCookie = cookies().has('uid');

  if (!hasCookie) {
    return redirect('/login');
  }

  const cookie = cookies().toString();
  const album = await getAlbumListHandle(cookie);

  if (album === 'not-found') {
    return notFound();
  }

  return <Home album={album} />;
}
