import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const album = data.album;
  const uidToInvite = data.uid;
  const userUid = cookies().get('uid')?.value || '';
  const userDocRef = doc(appFireStore, uidToInvite, uidToInvite);
  const albumDocRef = doc(appFireStore, userUid, userUid, 'album', album);

  try {
    const addSharedAlbum = updateDoc(userDocRef, {
      sharedAlbums: arrayUnion(albumDocRef),
    });
    const addSharedUser = updateDoc(albumDocRef, {
      sharedUsers: arrayUnion({ uid: uidToInvite, permission: 'read' }),
    });

    await Promise.all([addSharedAlbum, addSharedUser]);

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.error(error);

    return new Response('공유 대상 등록 중 예기치 못한 오류가 발생했습니다', {
      status: 500,
    });
  }
}
