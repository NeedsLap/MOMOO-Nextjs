import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { getFeed } from '@/utils/SDKUtils';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const userUid = cookies().get('uid')?.value;
  const id = params.id;

  if (!userUid) {
    return new Response('인증되지 않은 사용자입니다.', {
      status: 401,
    });
  }

  try {
    const feed = await getFeed(id, userUid);

    if (!feed) {
      return NextResponse.json(
        {
          error: '존재하지 않는 피드입니다.',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(feed);
  } catch (error) {
    return NextResponse.json(
      {
        error: '데이터를 불러오는 중 에러가 발생했습니다.',
      },
      {
        status: 500,
      },
    );
  }
}
