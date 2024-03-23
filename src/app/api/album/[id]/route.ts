import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import { deleteDoc, doc, getDoc } from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';
import { removeAlbumFromSharedAlbums } from '@/utils/SDKUtils';

const deleteAlbum = async (uid: string, albumId: string) => {
  const userAlbumDocRef = doc(appFireStore, uid, uid, 'album', albumId);
  const albumDoc = await getDoc(userAlbumDocRef);
  await removeAlbumFromSharedAlbums(albumDoc);
  await deleteDoc(userAlbumDocRef);
};

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const albumId = params.id;
  const uid = cookies().get('uid')?.value || '';

  try {
    await deleteAlbum(uid, albumId);
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.error(error);

    return new Response('앨범 삭제 중 예기치 못한 오류가 발생했습니다', {
      status: 500,
    });
  }
}
