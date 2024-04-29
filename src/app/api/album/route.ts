import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { getAlbumList, getThumbnail } from '@/utils/SDKUtils';

export async function GET() {
  const uid = cookies().get('uid')?.value;

  if (!uid) {
    return new Response('인증되지 않은 사용자입니다.', {
      status: 401,
    });
  }
  const album = await getAlbumList(uid);
  const thumbnails = await Promise.allSettled(
    album.map(async (item) => {
      const lastFeedId = item.feedList[item.feedList.length - 1];
      if (lastFeedId === undefined) {
        return null;
      }
      const thumbnail = await getThumbnail(uid, lastFeedId);
      return thumbnail ?? null;
    }),
  );

  for (const [i, thumbnailPromise] of thumbnails.entries()) {
    const thumbnailResult =
      thumbnailPromise.status === 'fulfilled' ? thumbnailPromise.value : null;
    album[i].imageUrl = thumbnailResult;
  }

  // 최신순으로 return
  return NextResponse.json(
    [album[0], ...album.slice(1).reverse()].map((v) => {
      return { ...v, createdTime: v.createdTime.toMillis() };
    }),
  );
}
