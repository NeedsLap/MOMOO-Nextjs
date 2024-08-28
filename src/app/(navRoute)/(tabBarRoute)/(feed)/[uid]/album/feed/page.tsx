import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { PAGE_SIZE } from '@/constants/feed';
import Feed from '@/containers/feed/Feed';
import { getFeedsAndHandleException } from '@/utils/apis';
import getInitialSkip from '@/utils/page/feed';

import { isNonNegativeInteger } from '@/types/common';

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
  const albumName = '.'; // chrome - 앨범 이름 .인 경우, albumName 제거됨
  const { uid } = params;
  const start = parseInt(searchParams.start || '0', 10);

  if (!isNonNegativeInteger(start)) {
    return notFound();
  }

  const skip = getInitialSkip(start);
  const getFeedsQuery = {
    limit: skip + PAGE_SIZE,
    skip,
    uid,
    albumName,
    cookie: cookies().toString()
  };
  const feeds = await getFeedsAndHandleException(getFeedsQuery);

  if (feeds === 'not-found') {
    return notFound();
  }

  if (!feeds) {
    throw new Error('not-working');
  }

  return <Feed feeds={feeds} />;
}
