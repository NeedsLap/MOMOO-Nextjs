import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { appAuth } from '@/firebase/config';

export default function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setPending] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setError(null);
    setPending(true);

    try {
      await signInWithEmailAndPassword(appAuth, email, password);
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
