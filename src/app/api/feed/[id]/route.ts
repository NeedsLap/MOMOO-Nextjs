import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { DocumentData } from 'firebase-admin/firestore';

import { appFireStore } from '@/firebase/config';
import { deleteImg, getFeed, getSavedAlbumList, removeFeedIdFromFeedList } from '@/utils/SDKUtils';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const userUid = cookies().get('uid')?.value;
  const { id } = params;

  if (!userUid) {
    return NextResponse.json(
      {
        error: '인증되지 않은 사용자입니다.'
      },
      {
        status: 401
      }
    );
  }

  try {
    const feed = await getFeed(id, userUid);

    if (!feed) {
      return NextResponse.json(
        {
          error: '존재하지 않는 피드입니다.'
        },
        {
          status: 404
        }
      );
    }

    return NextResponse.json(feed);
  } catch (error) {
    return NextResponse.json(
      {
        error: '데이터를 불러오는 중 에러가 발생했습니다.'
      },
      {
        status: 500
      }
    );
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const userUid = cookies().get('uid')?.value || '';

  if (!userUid) {
    return NextResponse.json(
      {
        error: '인증되지 않은 사용자입니다.'
      },
      {
        status: 401
      }
    );
  }

  const feedDocRef = doc(appFireStore, userUid, userUid, 'feed', id);

  try {
    const feed = (await getDoc(feedDocRef)).data();

    if (!feed) {
      return NextResponse.json(
        {
          error: '존재하지 않는 피드입니다.'
        },
        {
          status: 404
        }
      );
    }

    await deleteDoc(feedDocRef);
    const getAlbumList = await getSavedAlbumList(id, userUid);

    if (getAlbumList) {
      getAlbumList.forEach((albumDoc: DocumentData) => {
        removeFeedIdFromFeedList(id, albumDoc.id, userUid);
      });
    }

    feed.imageUrl.forEach(async (url: string) => deleteImg(url));
  } catch (error) {
    console.error('게시글 삭제 오류:', error);

    return NextResponse.json(
      {
        error: '게시물 삭제 중 에러가 발생했습니다.'
      },
      {
        status: 500
      }
    );
  }
}
