import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Feed from '@/containers/feed/Feed';
import getFeedsAndHandleException from '@/utils/apis';

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
  const initialItemsCountBeforeStart = 5;
  const initialItemsCountAfterStart = 10;
  const pageSize = initialItemsCountBeforeStart + initialItemsCountAfterStart;

  const albumName = params.albumName;
  const uid = params.uid;
  const start = parseInt(searchParams.start || '0');
  const limit = start + initialItemsCountAfterStart;
  const skip =
    start - initialItemsCountBeforeStart > 0
      ? start - initialItemsCountBeforeStart
      : 0;
  const getFeedsQuery = {
    limit,
    skip,
    uid,
    albumName,
    cookie: cookies().toString(),
  };
  const feeds = await getFeedsAndHandleException(getFeedsQuery);

  if (feeds === 'not-found') {
    redirect('/404');
  }

  return <Feed feeds={feeds} initialFetchOpts={{ limit, skip, pageSize }} />;
}
