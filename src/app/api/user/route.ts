import { type NextRequest, NextResponse } from 'next/server';

import { adminAppAuth } from '@/firebase/adminConfig';

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email') || '';
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
    return NextResponse.json({ user: null });
  }
}
