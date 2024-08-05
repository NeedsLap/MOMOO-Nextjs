import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';

export async function DELETE(_: NextRequest, { params }: { params: { id: string; uid: string } }) {
  const albumId = params.id;
  const { uid } = params;
  const userUid = cookies().get('uid')?.value || '';
  const userDocRef = doc(appFireStore, uid, uid);
  const albumDocRef = doc(appFireStore, userUid, userUid, 'album', albumId);

  try {
    const updateSharedAlbum = updateDoc(userDocRef, {
      sharedAlbums: arrayRemove(albumDocRef)
    });
    const updateSharedUser = updateDoc(albumDocRef, {
      sharedUsers: arrayRemove({ uid, permission: 'read' })
    });
    await Promise.all([updateSharedAlbum, updateSharedUser]);
    const albumDoc = await getDoc(albumDocRef);

    if (!albumDoc.data()?.sharedUsers.length) {
      const albumUserDocRef = doc(appFireStore, userUid, userUid);
      await updateDoc(albumUserDocRef, {
        sharedAlbums: arrayRemove(albumDocRef)
      });
    }

    return new Response(null, {
      status: 204
    });
  } catch (error) {
    console.error(error);

    return new Response('공유 대상 삭제 중 예기치 못한 오류가 발생했습니다', {
      status: 500
    });
  }
}
