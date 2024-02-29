import { useState } from 'react';

import { FirebaseError } from 'firebase/app';
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

import { appAuth } from '@/firebase/config';

export default function useReauthenticate() {
  const [error, setError] = useState<null | string>(null);
  const user = appAuth.currentUser;

  const reauthenticate = async (password: string) => {
    setError(null);

    if (user === null || user?.email === null) {
      return false;
    }

    const credential = EmailAuthProvider.credential(user.email, password);

    try {
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
      }

      return false;
    }
  };

  return { reauthenticate, error };
}
