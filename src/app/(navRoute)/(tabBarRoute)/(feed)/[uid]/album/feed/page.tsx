import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import Feed from '@/containers/feed/Feed';
import { getFeedsAndHandleException } from '@/utils/apis';

export const metadata: Metadata = {
  title: 'Feed | MOMOO'
};

export default async function Page({
  params,
  searchParams
}: {
  params: { albumName: string; uid: string };
  searchParams: { start?: string };
}) {
  const pageSize = 15;

  const albumName = '.'; // chrome - 앨범 이름 .인 경우, albumName 제거됨
  const { uid } = params;
  const start = parseInt(searchParams.start || '0', 10);
  const getFeedsQuery = {
    limit: start + pageSize,
    skip: start,
    uid,
    albumName,
    cookie: cookies().toString()
  };
  const feeds = await getFeedsAndHandleException(getFeedsQuery);

  if (feeds === 'not-found') {
    return notFound();
  }

  return <Feed feeds={feeds} pageSize={pageSize} />;
}
