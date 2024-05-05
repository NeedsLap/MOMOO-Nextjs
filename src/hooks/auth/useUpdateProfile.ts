import { useState } from 'react';

import { FirebaseError } from 'firebase/app';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { appAuth } from '@/firebase/config';
import { updateAuth } from '@/modules/auth';
import { uploadImg } from '@/utils/SDKUtils';

import type { ProfileToUpdate } from '@/containers/editProfile/model';
import type { UpdateProfileOpt } from '@/hooks/auth/model';

export const useUpdateProfile = () => {
  const [error, setError] = useState<null | string>(null);
  const dispatch = useDispatch();
  const user = appAuth.currentUser;

  const setProfile = async ({
    email,
    password,
    displayName,
    file,
  }: ProfileToUpdate) => {
    if (user === null) {
      return;
    }

    setError(null);
    const opt: UpdateProfileOpt = {};

    try {
      if (displayName !== user.displayName) {
        opt.displayName = displayName;
      }

      if (file !== null) {
        opt.photoURL = await uploadImg(`profile/${user.uid}`, file);
      }

      if (Object.keys(opt).length) {
        await updateProfile(user, opt);
      }

      if (email !== user.email) {
        await updateEmail(user, email);
      }

      if (password) {
        await updatePassword(user, password);
      }

      if (opt.displayName || opt.photoURL || email !== user.email) {
        dispatch(updateAuth({ ...opt, email }));
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
