import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import { arrayRemove, doc, updateDoc } from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; uid: string } },
) {
  const albumId = params.id;
  const uid = params.uid;
  const userUid = cookies().get('uid')?.value || '';
  const userDocRef = doc(appFireStore, uid, uid);
  const albumDocRef = doc(appFireStore, userUid, userUid, 'album', albumId);

  try {
    const addSharedAlbum = updateDoc(userDocRef, {
      sharedAlbums: arrayRemove(albumDocRef),
    });
    const addSharedUser = updateDoc(albumDocRef, {
      sharedUsers: arrayRemove({ uid, permission: 'read' }),
    });

    await Promise.all([addSharedAlbum, addSharedUser]);

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.error(error);

    return new Response('공유 대상 삭제 중 예기치 못한 오류가 발생했습니다', {
      status: 500,
    });
  }
}
