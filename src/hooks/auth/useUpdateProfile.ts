import { useState } from 'react';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import useAuthContext from '../useAuthContext';
import { uploadImg } from '../../utils/SDKUtils';

interface Profile {
  email: string | null;
  password: string | null;
  displayName: string | null;
  file: File | null;
}

export const useUpdateProfile = () => {
  const [error, setError] = useState<null | string>(null);
  const { user } = useAuthContext();

  const setProfile = async ({
    email,
    password,
    displayName,
    file,
  }: Profile) => {
    setError(null);

    if (user === null) {
      return;
    }

    interface Opt {
      displayName: string | null;
      photoURL?: string;
    }

    const opt: Opt = { displayName };

    if (displayName) {
      opt.displayName = displayName;
    }

    try {
      if (file !== null) {
        opt.photoURL = await uploadImg(`profile/${user.uid}`, file);
      }

      if (opt.displayName || user.displayName !== null || opt.photoURL) {
        await updateProfile(user, opt);
      }

      if (email) {
        await updateEmail(user, email);
      }

      if (password) {
        await updatePassword(user, password);
      }

      setError(null);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
      } else {
        setError('프로필 변경에 실패했습니다');
      }
    }
  };

  return { error, setProfile };
};
