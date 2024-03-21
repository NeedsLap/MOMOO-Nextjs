import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const nonAuthPaths = ['/login', '/signup'];
const authPaths = [
  '/',
  '/:uid/:albumName',
  '/:uid/:albumName/feed',
  '/my',
  '/upload',
  '/edit-feed', // 경로 확정 전
  '/edit-profile',
];

export function middleware(request: NextRequest) {
  const hasCookie = cookies().has('uid');

  if (hasCookie && nonAuthPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!hasCookie && !nonAuthPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [...nonAuthPaths, authPaths],
};
