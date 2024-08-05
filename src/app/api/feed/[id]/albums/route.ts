import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { getSavedAlbumList } from '@/utils/SDKUtils';

async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const userUid = cookies().get('uid')?.value;
  const { id } = params;

  if (!userUid) {
    return NextResponse.json(
      {
        error: '인증되지 않은 사용자입니다.'
      },
      {
        status: 401
      }
    );
  }

  try {
    const albumList = await getSavedAlbumList(id, userUid);

    if (!albumList.length) {
      return NextResponse.json(
        {
          error: '존재하지 않는 피드입니다.'
        },
        {
          status: 404
        }
      );
    }

    return NextResponse.json(albumList);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: '데이터를 불러오는 중 에러가 발생했습니다.'
      },
      {
        status: 500
      }
    );
  }
}

export { GET };
