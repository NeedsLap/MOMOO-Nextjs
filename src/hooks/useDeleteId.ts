import { useState } from 'react';

import { FirebaseError } from 'firebase/app';
import { deleteUser } from 'firebase/auth';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, listAll, deleteObject } from 'firebase/storage';

import { appAuth, appFireStore, storage } from '@/firebase/config';
import { deleteImg } from '@/utils/SDKUtils';

export default function useDeleteId() {
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);

  const deleteId = async () => {
    setIsPending(true);
    const user = appAuth.currentUser;

    if (!user) {
      setIsPending(false);
      return;
    }

    const photoURL = user.photoURL;
    const uid = user.uid;

    try {
      await deleteUser(user);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
        setIsPending(false);
        return;
      }
    }

    if (photoURL) {
      deleteImg(photoURL);
    }

    await deleteFeedsImg(uid);
    await deleteUserDocs(uid);
    setIsPending(false);
  };

  return { deleteId, error, isPending };
}

async function deleteFeedsImg(uid: string) {
  const listRef = ref(storage, `feed/${uid}`);

  const res = await listAll(listRef);
  res.items.forEach((itemRef) => deleteObject(itemRef));
}

async function deleteUserDocs(uid: string) {
  const feedList = await getDocs(collection(appFireStore, uid, uid, 'feed'));
  feedList.forEach((feedDoc) =>
    deleteDoc(doc(appFireStore, uid, uid, 'feed', feedDoc.id)),
  );

  const albumList = await getDocs(collection(appFireStore, uid, uid, 'album'));
  albumList.forEach((albumDoc) =>
    deleteDoc(doc(appFireStore, uid, uid, 'album', albumDoc.id)),
  );
}
