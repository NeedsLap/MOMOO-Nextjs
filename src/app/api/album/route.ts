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
  const feedListValues = album.map(
    (item) => item.feedList[item.feedList.length - 1],
  );
  const thumbnailPromises = feedListValues.map(async (feedId) => {
    const thumbnail = await getThumbnail(uid, feedId);
    if (thumbnail) {
      return thumbnail.imageUrl;
    } else return undefined;
  });

  const thumbnails = await Promise.all(thumbnailPromises);
  album.forEach((item, i) => {
    if (thumbnails[i] !== undefined) {
      // thumbnails[i]가 정의되어 있는 경우에만 처리
      item.imageUrl = thumbnails[i].toString();
    } else {
      item.imageUrl = null;
    }
  });

  return NextResponse.json(album);
}
