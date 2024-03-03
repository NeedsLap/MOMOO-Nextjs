'use client';

import { useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { appAuth } from '@/firebase/config';
import { setAuth } from '@/modules/auth';

export default function App({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(appAuth, (user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        dispatch(setAuth({ displayName, email, photoURL, uid }));
        localStorage.setItem('uid', uid);
      } else {
        dispatch(setAuth(null));
        localStorage.removeItem('uid');
      }
    });
  }, [dispatch]);

  return <>{children}</>;
}
