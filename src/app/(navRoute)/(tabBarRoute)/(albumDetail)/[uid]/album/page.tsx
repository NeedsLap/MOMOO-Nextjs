import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import AlbumDetail from '@/containers/albumDetail/AlbumDetail';
import { getFeedsAndHandleException } from '@/utils/apis';

import type { AlbumDetailParams } from '@/app/(navRoute)/(tabBarRoute)/(albumDetail)/[uid]/album/[albumName]/model';

export const generateMetadata = () => {
  return { title: `. | MOMOO` };
};

export default async function Page({ params }: { params: AlbumDetailParams }) {
  const pageSize = 15;
  const albumName = '.'; // chrome - 앨범 이름 .인 경우, albumName 제거됨
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
    return notFound();
  }

  return <AlbumDetail feeds={feeds} pageSize={pageSize} />;
}
