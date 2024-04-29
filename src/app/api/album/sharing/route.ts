import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { DocumentReference, getDoc } from 'firebase/firestore';

import { adminAppAuth } from '@/firebase/adminConfig';
import { getSharedAlbums, getThumbnail } from '@/utils/SDKUtils';

import { Album, AlbumMetadata } from '@/types/album';

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

    const sharedAlbumsData: Album[] = [];
    const promises = sharedAlbums.map(async (ref: DocumentReference) => {
      const albumDocSnap = await getDoc(ref);
      const albumData = albumDocSnap.data() as AlbumMetadata;
      const sharedAlbumUser = ref.path.split('/')[0];
      let thumbnail: string | null = null;

      if (albumData.feedList.length) {
        thumbnail = await getThumbnail(
          sharedAlbumUser,
          albumData.feedList[albumData.feedList.length - 1],
        );
      }
      const { displayName, email } = await adminAppAuth.getUser(uid);

      sharedAlbumsData.push({
        ...albumData,
        user: {
          uid: sharedAlbumUser,
          displayName,
          email,
        },
        imageUrl: thumbnail,
        id: albumDocSnap.id,
      });
    });

    await Promise.all(promises);

    sharedAlbumsData.sort((a, b) => {
      if (a.createdTime > b.createdTime) {
        return -1;
      } else {
        return 1;
      }
    });

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
