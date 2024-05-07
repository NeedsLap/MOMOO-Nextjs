import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hasCookie = request.cookies.has('uid');
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
    '/((?!api).*)/album/:albumName/',
    '/((?!api).*)/album/', // albumName '.'인 경우
    '/:uid/album/:albumName/feed',
    '/:uid/album/feed', // albumName '.'인 경우
    '/my',
    '/edit-profile',
  ],
};
