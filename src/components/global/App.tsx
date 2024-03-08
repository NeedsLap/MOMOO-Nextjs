'use client';

import { useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { appAuth } from '@/firebase/config';
import { setAuth } from '@/modules/auth';
import { deleteCookie, setCookie } from '@/utils/cookie';

export default function App({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(appAuth, (user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        dispatch(setAuth({ displayName, email, photoURL, uid }));
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        setCookie('uid', uid, {
          expires,
        });
      } else {
        dispatch(setAuth(null));
        deleteCookie('uid');
      }
    });
  }, [dispatch]);

  return <>{children}</>;
}
