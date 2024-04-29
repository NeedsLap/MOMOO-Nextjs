import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { FirebaseError } from 'firebase/app';

import { adminAppAuth } from '@/firebase/adminConfig';

export async function GET(req: NextRequest) {
  const uid = cookies().get('uid')?.value;

  if (!uid) {
    return NextResponse.json(
      {
        error: '인증되지 않은 사용자입니다.',
      },
      {
        status: 401,
      },
    );
  }

  const email = req.nextUrl.searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      {
        error: '요청 매개변수가 누락되었습니다.',
      },
      {
        status: 400,
      },
    );
  }

  try {
    const user = await adminAppAuth.getUserByEmail(email);
    const profile = {
      uid: user.uid,
      displayName: user.displayName || '',
      email: user.email || '',
      photoURL: user.photoURL || '',
    };

    return NextResponse.json({ user: profile });
  } catch (error) {
    console.error(error);
    const { code } = error as FirebaseError;

    if (code === 'auth/invalid-email' || code === 'auth/user-not-found') {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json(
      {
        error: '사용자 검색 중 에러가 발생했습니다.',
      },
      {
        status: 500,
      },
    );
  }
}
