import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import Feed from '@/containers/feed/Feed';
import { getFeedsAndHandleException } from '@/utils/apis';

export const metadata: Metadata = {
  title: 'Feed | MOMOO',
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { albumName: string; uid: string };
  searchParams: { start?: string };
}) {
  const pageSize = 15;

  const albumName = params.albumName;
  const uid = params.uid;
  const start = parseInt(searchParams.start || '0');
  const getFeedsQuery = {
    limit: start + pageSize,
    skip: start,
    uid,
    albumName,
    cookie: cookies().toString(),
  };
  const feeds = await getFeedsAndHandleException(getFeedsQuery);

  if (feeds === 'not-found') {
    return notFound();
  }

  return <Feed feeds={feeds} pageSize={pageSize} />;
}
