import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  DocumentData,
  addDoc,
  Timestamp,
  arrayRemove,
  updateDoc,
  DocumentSnapshot,
  DocumentReference,
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
  if (!feedIdList.length) {
    return [];
  }

  const feeds: DocumentData[] = [];
  const promises = feedIdList.map(async (feedId) => {
    const docRef = doc(appFireStore, uid, uid, 'feed', feedId);
    const result = await getDoc(docRef);
    const feed = result.data();

    if (feed) {
      feeds.push(feed);
    }
  });

  await Promise.all(promises);

  return feeds;
};

const getSharedAlbums = async (
  uid: string,
): Promise<DocumentReference[] | null> => {
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
    sharedUsers: [],
  });
};

const removeAlbumFromSharedAlbums = async (
  albumDoc: DocumentSnapshot<DocumentData, DocumentData>,
) => {
  const albumData = albumDoc.data();

  if (!albumData) {
    return;
  }

  const albumDocRef = albumDoc.ref;
  const promises = albumData.sharedUsers.map(({ uid }: { uid: string }) => {
    const userDocRef = doc(appFireStore, uid, uid);
    return updateDoc(userDocRef, {
      sharedAlbums: arrayRemove(albumDocRef),
    });
  });

  await Promise.all(promises);
};
const getAlbumList = async (uid: string) => {
  const albumDataList: DocumentData[] = [];
  const albumDocRef = collection(appFireStore, uid, uid, 'album');
  const q = query(albumDocRef, orderBy('createdTime'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    albumDataList.push({ ...doc.data(), id: doc.id });
  });

  return albumDataList;
};

const getThumbnail = async (uid: string, feedId: string) => {
  try {
    const docSnap = await getDoc(doc(appFireStore, uid, uid, 'feed', feedId));
    return docSnap?.data()?.imageUrl[0] || null;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const getFeed = async (feedId: string, uid: string) => {
  const docSnap = await getDoc(doc(appFireStore, uid, uid, 'feed', feedId));

  return docSnap.data();
};

export {
  deleteImg,
  uploadImg,
  getAlbumByName,
  getFeedsData,
  getSharedAlbums,
  checkAlbumPermission,
  addAlbum,
  removeAlbumFromSharedAlbums,
  getFeed,
  getAlbumList,
  getThumbnail,
};
