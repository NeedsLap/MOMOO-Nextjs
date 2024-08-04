'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';

import { SplashLogo, SplashLogoCircle } from '@/assets/Svgs';
import StyledSplash from '@/components/Splash/StyledSplash';
import { setCookie } from '@/utils/cookie';

export default function Splash({
  setSplashIsOver
}: {
  setSplashIsOver: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    setTimeout(() => {
      setSplashIsOver(true);
      setCookie('splash', 'rendered');
    }, 1700);
  }, []);

  return (
    <StyledSplash>
      <h1 className="a11y-hidden">MOMOO</h1>
      <SplashLogo className="logo" />

      <div>
        <SplashLogoCircle />
      </div>
    </StyledSplash>
  );
}
