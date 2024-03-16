import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';
import { getUserByUid } from '@/utils/admin';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const albumId = params.id;
  const userUid = cookies().get('uid')?.value || '';
  const albumDocRef = doc(appFireStore, userUid, userUid, 'album', albumId);

  try {
    const albumDoc = await getDoc(albumDocRef);
    const albumData = albumDoc.data();

    if (!albumData) {
      throw new Error('앨범 문서에 데이터가 없습니다');
    }

    const promises = albumData.sharedUsers.map(
      (user: { uid: string; permission: 'read' }) => getUserByUid(user.uid),
    );
    const sharedUsersProfile = await Promise.all(promises);

    return NextResponse.json(sharedUsersProfile);
  } catch (error) {
    console.error(error);

    return new Response(
      '데이터를 불러오는 중 예기치 못한 오류가 발생했습니다',
      {
        status: 500,
      },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const data = await req.json();
  const albumId = params.id;
  const uidToInvite = data.uid;
  const userUid = cookies().get('uid')?.value || '';
  const userDocRef = doc(appFireStore, uidToInvite, uidToInvite);
  const albumDocRef = doc(appFireStore, userUid, userUid, 'album', albumId);

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
