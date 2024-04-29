import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, listAll, deleteObject } from 'firebase/storage';

import { adminAppAuth } from '@/firebase/adminConfig';
import { appFireStore, storage } from '@/firebase/config';
import { getUserByUid } from '@/utils/admin';
import { deleteImg, removeAlbumFromSharedAlbums } from '@/utils/SDKUtils';

import { User } from '@/types/user';

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
    const result = await adminAppAuth.getUser(uid);
    const user: User = {
      uid: result.uid,
      displayName: result.displayName || '',
      email: result.email || '',
      photoURL: result.photoURL || '',
    };

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}

const deletePhothURL = async (photoURL: string) => {
  if (photoURL) {
    await deleteImg(photoURL);
  }
};

const deleteFeedsImg = async (uid: string) => {
  const listRef = ref(storage, `feed/${uid}`);
  const res = await listAll(listRef);
  const promises = res.items.map(async (itemRef) => {
    return deleteObject(itemRef);
  });

  await Promise.all(promises);
};

const deleteUserDoc = async (uid: string) => {
  await deleteDoc(doc(appFireStore, uid, uid));
};

const deleteAlbumDocs = async (uid: string) => {
  const albumList = await getDocs(collection(appFireStore, uid, uid, 'album'));
  const promises = albumList.docs.map(async (albumDoc) => {
    await removeAlbumFromSharedAlbums(albumDoc);
    return deleteDoc(albumDoc.ref);
  });

  await Promise.all(promises);
};

const deleteFeedDocs = async (uid: string) => {
  const feedList = await getDocs(collection(appFireStore, uid, uid, 'feed'));
  const promises = feedList.docs.map((feedDoc) => {
    return deleteDoc(doc(appFireStore, uid, uid, 'feed', feedDoc.id));
  });

  await Promise.all(promises);
};

export async function DELETE() {
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
    const { photoURL } = await getUserByUid(uid);

    await Promise.all([
      deletePhothURL(photoURL),
      deleteFeedsImg(uid),
      deleteUserDoc(uid),
      deleteAlbumDocs(uid),
      deleteFeedDocs(uid),
    ]);

    await adminAppAuth.deleteUser(uid);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: '계정 삭제 중 예기치 못한 오류가 발생했습니다.',
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({
    status: 204,
  });
}
