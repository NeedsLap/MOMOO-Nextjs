import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';

import { appAuth, appFireStore } from '@/firebase/config';
import { setAuth } from '@/modules/auth';
import { addAlbum, uploadImg } from '@/utils/SDKUtils';

interface Props {
  email: string;
  password: string;
  displayName: string;
  file: File | null;
}

interface Opt {
  displayName: string;
  photoURL?: string;
}

export default function useSignup() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setPending] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const signup = async ({ email, password, displayName, file }: Props) => {
    setError(null);
    setPending(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        appAuth,
        email,
        password,
      );

      const opt: Opt = { displayName };

      if (file !== null) {
        opt.photoURL = await uploadImg(`profile/${user.uid}`, file);
      }

      await updateProfile(user, opt);
      await addAlbum(user.uid, '전체 보기');
      await setDoc(doc(appFireStore, user.uid, user.uid), {
        sharedAlbums: [],
      });
      dispatch(setAuth(user.uid));
      router.replace('/');
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
      } else if (err instanceof Error) {
        setError(err.message);
      }

      console.error(err);
      setPending(false);
    }
  };

  return { error, isPending, signup };
}
