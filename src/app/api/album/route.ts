import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { getAlbumList } from '@/utils/SDKUtils';

export async function GET() {
  const uid = cookies().get('uid')?.value;

  if (!uid) {
    return new Response('인증되지 않은 사용자입니다.', {
      status: 401,
    });
  }
  const album = await getAlbumList(uid);

  return NextResponse.json(album);
}
