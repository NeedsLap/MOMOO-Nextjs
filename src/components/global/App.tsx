'use client';

import { useState } from 'react';

import Splash from '@/components/Splash/Splash';

export default function App({
  children,
  splashRendered,
}: {
  children: React.ReactNode;
  splashRendered: boolean;
}) {
  const [splashIsOver, setSplashIsOver] = useState(splashRendered);

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
