'use client';

import { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import Splash from '@/components/Splash/Splash';
import { appAuth } from '@/firebase/config';
import { setAuth } from '@/modules/auth';
import { deleteCookie, setCookie } from '@/utils/cookie';

export default function App({
  children,
  splashRendered,
}: {
  children: React.ReactNode;
  splashRendered: boolean;
}) {
  const dispatch = useDispatch();
  const [splashIsOver, setSplashIsOver] = useState(splashRendered);

  useEffect(() => {
    onAuthStateChanged(appAuth, (user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        dispatch(
          setAuth({
            displayName: displayName || '',
            email: email || '',
            photoURL: photoURL || '',
            uid,
          }),
        );
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

  return (
    <>
      {splashIsOver ? (
        <>{children}</>
      ) : (
        <Splash setSplashIsOver={setSplashIsOver} />
      )}
    </>
  );
}
