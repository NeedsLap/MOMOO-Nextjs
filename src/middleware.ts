import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hasCookie = cookies().has('uid');
  const nonAuthPaths = ['/login', '/signup'];

  if (hasCookie && nonAuthPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!hasCookie && !nonAuthPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/',
    '/:uid/album/:albumName',
    '/:uid/album/:albumName/feed',
    '/my',
    '/edit-profile',
  ],
};
