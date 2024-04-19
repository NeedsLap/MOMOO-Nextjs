import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { DocumentData, DocumentReference, getDoc } from 'firebase/firestore';

import { getSharedAlbums, getThumbnail } from '@/utils/SDKUtils';

export async function GET() {
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

  try {
    const sharedAlbums = await getSharedAlbums(uid);

    if (!sharedAlbums) {
      return NextResponse.json([]);
    }

    const sharedAlbumsData: DocumentData[] = [];
    const promises = sharedAlbums.map(async (ref: DocumentReference) => {
      const albumDocSnap = await getDoc(ref);
      const albumData = albumDocSnap.data();

      if (albumData) {
        const sharedAlbumUser = ref.path.split('/')[0];
        albumData.uid = sharedAlbumUser;
        const thumbnail =
          (await getThumbnail(
            sharedAlbumUser,
            albumData.feedList[albumData.feedList.length - 1],
          )) || null;
        albumData.imageUrl = thumbnail;
        sharedAlbumsData.push(albumData);
      }
    });

    await Promise.all(promises);

    return NextResponse.json(sharedAlbumsData);
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
