import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import AlbumDetail from '@/containers/albumDetail/AlbumDetail';
import getFeedsAndHandleException from '@/utils/apis';

import type { AlbumDetailParams } from '@/app/(albumDetail)/[uid]/[albumName]/model';

export const generateMetadata = ({ params }: { params: AlbumDetailParams }) => {
  return { title: `${decodeURI(params.albumName)} | MOMOO` };
};

export default async function Page({ params }: { params: AlbumDetailParams }) {
  const pageSize = 15;
  const albumName = params.albumName;
  const uid = params.uid;
  const getFeedsQuery = {
    limit: pageSize,
    skip: 0,
    uid,
    albumName,
    cookie: cookies().toString(),
  };
  const feeds = await getFeedsAndHandleException(getFeedsQuery);

  if (feeds === 'not-found') {
    redirect('/404');
  }

  return <AlbumDetail feeds={feeds} pageSize={pageSize} />;
}
