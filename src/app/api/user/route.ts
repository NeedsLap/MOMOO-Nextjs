import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, listAll, deleteObject } from 'firebase/storage';

import { adminAppAuth } from '@/firebase/adminConfig';
import { appFireStore, storage } from '@/firebase/config';
import { getUserByUid } from '@/utils/admin';
import { deleteImg, removeAlbumFromSharedAlbums } from '@/utils/SDKUtils';

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email') || '';

  try {
    const user = await adminAppAuth.getUserByEmail(email);
    const profile = {
      uid: user.uid,
      displayName: user.displayName || '',
      email: user.email || '',
      photoURL: user.photoURL || '',
    };

    return NextResponse.json({ user: profile });
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
    return deleteDoc(doc(appFireStore, uid, uid, 'album', albumDoc.id));
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
  const uid = cookies().get('uid')?.value || '';

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

    return new Response('계정 삭제 중 예기치 못한 오류가 발생했습니다', {
      status: 500,
    });
  }

  return new Response(null, {
    status: 204,
  });
}
