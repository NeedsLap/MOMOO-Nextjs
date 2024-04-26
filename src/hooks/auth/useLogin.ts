import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { appAuth } from '@/firebase/config';
import { setAuth } from '@/modules/auth';

export default function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setPending] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const login = async (email: string, password: string) => {
    setError(null);
    setPending(true);

    try {
      const { user } = await signInWithEmailAndPassword(
        appAuth,
        email,
        password,
      );
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

  return { error, isPending, login };
}
