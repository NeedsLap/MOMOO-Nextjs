import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import {
  DocumentReference,
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { DocumentData } from 'firebase-admin/firestore';

import { appFireStore } from '@/firebase/config';
import { removeAlbumFromSharedAlbums } from '@/utils/SDKUtils';

const removeAlbumFromMySharedAlbums = async (
  uid: string,
  albumDocRef: DocumentReference<DocumentData, DocumentData>
) => {
  const userDocRef = doc(appFireStore, uid, uid);
  await updateDoc(userDocRef, {
    sharedAlbums: arrayRemove(albumDocRef)
  });
};

const deleteAlbum = async (uid: string, albumId: string) => {
  const albumDocRef = doc(appFireStore, uid, uid, 'album', albumId);
  const albumDoc = await getDoc(albumDocRef);

  if (albumDoc.data()?.sharedUsers.length) {
    await Promise.all([
      removeAlbumFromMySharedAlbums(uid, albumDocRef),
      removeAlbumFromSharedAlbums(albumDoc)
    ]);
  }

  await deleteDoc(albumDocRef);
};

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const albumId = params.id;
  const uid = cookies().get('uid')?.value || '';

  try {
    await deleteAlbum(uid, albumId);
    return new Response(null, {
      status: 204
    });
  } catch (error) {
    console.error(error);

    return new Response('앨범 삭제 중 예기치 못한 오류가 발생했습니다', {
      status: 500
    });
  }
}
