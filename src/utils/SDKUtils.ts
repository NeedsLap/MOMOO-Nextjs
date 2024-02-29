import {
  getDocs,
  collection,
  query,
  where,
  DocumentData,
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

export { deleteImg, uploadImg, getAlbumByName };
