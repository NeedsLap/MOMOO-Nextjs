import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import {
  checkAlbumPermission,
  getAlbumByName,
  getFeedsData,
  getSharedAlbums,
} from '@/utils/SDKUtils';

export async function GET(req: NextRequest) {
  const userUid = cookies().get('uid')?.value;
  const limit = req.nextUrl.searchParams.get('limit');
  const skip = req.nextUrl.searchParams.get('skip');
  const albumName = req.nextUrl.searchParams.get('album');
  const uid = req.nextUrl.searchParams.get('uid');

  if (!userUid) {
    return new Response('인증되지 않은 사용자입니다.', {
      status: 401,
    });
  }

  if (!limit || !skip || !albumName || !uid) {
    return new Response('요청 매개변수가 누락되었습니다.', {
      status: 400,
    });
  }

  const albumDoc = await getAlbumByName(uid, albumName);

  if (!albumDoc) {
    return new Response('존재하지 않는 앨범입니다.', {
      status: 404,
    });
  }

  let hasPermission = true;

  if (userUid !== uid) {
    const sharedAlbums = (await getSharedAlbums(userUid)) || null;
    hasPermission = await checkAlbumPermission(albumDoc, sharedAlbums);
  }

  if (!hasPermission) {
    return new Response('접근 권한이 없는 앨범입니다.', {
      status: 403,
    });
  }

  const feedList: string[] = [...albumDoc.data().feedList];
  const feeds = await getFeedsData(
    feedList.slice(parseInt(skip), parseInt(limit)),
    uid,
  );

  return NextResponse.json(feeds);
}
