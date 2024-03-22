import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  DocumentData,
  or,
  orderBy,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytes,
} from 'firebase/storage';

import { storage, appFireStore } from '@/firebase/config';

async function deleteImg(url: string) {
  const imgRef = ref(storage, url);

  await deleteObject(imgRef);
}

async function uploadImg(path: string, file: File) {
  const storageRef = ref(storage, path);
  const uploadTask = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(uploadTask.ref);
  return downloadURL;
}

async function getAlbumByName(uid: string, name: string) {
  const albumRef = collection(appFireStore, uid, uid, 'album');

  const querySnapshot: DocumentData = await getDocs(
    query(albumRef, where('name', '==', name)),
  );

  if (!querySnapshot.docs.length) {
    return null;
  }

  return querySnapshot.docs[0];
}

const getFeedsData = async (feedIdList: string[], uid: string) => {
  const feeds: DocumentData[] = [];

  if (!feedIdList.length) {
    return feeds;
  }

  const feedRef = collection(appFireStore, uid, uid, 'feed');
  const searchList = feedIdList.map((feedId) => where('id', '==', feedId));
  const q = query(feedRef, or(...searchList), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    feeds.push(doc.data());
  });

  return feeds;
};

const getSharedAlbums = async (uid: string) => {
  const userDocRef = doc(appFireStore, uid, uid);
  const userDocSnap = await getDoc(userDocRef);

  return userDocSnap.data()?.sharedAlbums || null;
};

const checkAlbumPermission = async (
  albumDoc: DocumentData,
  sharedAlbums: DocumentData[] | null,
) => {
  if (!sharedAlbums) {
    return false;
  }

  for (const ref of sharedAlbums) {
    if (ref.path === albumDoc.ref.path) {
      return true;
    }
  }

  return false;
};

const addAlbum = async (uid: string, albumName: string) => {
  const userAlbumDocRef = collection(appFireStore, uid, uid, 'album');

  await addDoc(userAlbumDocRef, {
    feedList: [],
    createdTime: Timestamp.now(),
    name: albumName,
  });
};

export {
  deleteImg,
  uploadImg,
  getAlbumByName,
  getFeedsData,
  getSharedAlbums,
  checkAlbumPermission,
  addAlbum,
};
