import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';
import { getUserByUid } from '@/utils/admin';

import { SharedUsers } from '@/types/album';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const albumId = params.id;
  const uid = cookies().get('uid')?.value || '';
  const albumDocRef = doc(appFireStore, uid, uid, 'album', albumId);

  try {
    const albumDoc = await getDoc(albumDocRef);
    const albumData = albumDoc.data();

    if (!albumData) {
      throw new Error('앨범 문서에 데이터가 없습니다');
    }

    const sharedUsers = albumData.sharedUsers as SharedUsers;

    if (!sharedUsers.length) {
      return NextResponse.json([]);
    }

    const promises = sharedUsers.map((sharedUser) =>
      getUserByUid(sharedUser.uid),
    );
    const sharedUsersProfile = await Promise.all(promises);

    return NextResponse.json(sharedUsersProfile);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: '데이터를 불러오는 중 예기치 못한 에러가 발생했습니다',
      },
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
  const uid = cookies().get('uid')?.value;

  if (!uid) {
    return NextResponse.json(
      {
        error: '인증되지 않은 사용자입니다.',
      },
      {
        status: 401,
      },
    );
  }

  const data = await req.json();
  const albumId = params.id;
  const invitedUid = data.uid;

  if (!albumId || !invitedUid) {
    return NextResponse.json(
      {
        error: '요청 매개변수가 누락되었습니다.',
      },
      {
        status: 400,
      },
    );
  }

  const userDocRef = doc(appFireStore, uid, uid);
  const invitedUserDocRef = doc(appFireStore, invitedUid, invitedUid);
  const albumDocRef = doc(appFireStore, uid, uid, 'album', albumId);

  try {
    const addSharedAlbumToUser = updateDoc(userDocRef, {
      sharedAlbums: arrayUnion(albumDocRef),
    });
    const addSharedAlbumToInvitedUser = updateDoc(invitedUserDocRef, {
      sharedAlbums: arrayUnion(albumDocRef),
    });
    const addSharedUser = updateDoc(albumDocRef, {
      sharedUsers: arrayUnion({ uid: invitedUid, permission: 'read' }),
    });

    await Promise.all([
      addSharedAlbumToUser,
      addSharedAlbumToInvitedUser,
      addSharedUser,
    ]);

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: '공유 대상 등록 중 예기치 못한 오류가 발생했습니다.',
      },
      {
        status: 500,
      },
    );
  }
}
