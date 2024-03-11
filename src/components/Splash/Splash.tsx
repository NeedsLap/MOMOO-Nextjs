'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from 'react';

import StyledSplash from '@/components/Splash/StyledSplash';
import { setCookie } from '@/utils/cookie';

export default function Splash({
  setSplashIsOver,
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
      <Image width={565} height={96} src="/icons/splash-logo.svg" alt="MOMOO" />
      <div>
        <svg viewBox="0 0 89 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M85.8479 67.6572C87.6717 61.7361 88.5836 55.1619 88.5836 47.9347C88.5836 38.2694 86.9769 29.8667 83.7636 22.7265C80.6371 15.4993 75.8171 9.92653 69.3036 6.00816C62.7901 2.00272 54.4963 0 44.422 0C34.261 0 25.8803 2.00272 19.28 6.00817C12.7665 9.92653 7.90304 15.4558 4.68972 22.5959C1.56324 29.7361 -1.15258e-07 38.1388 0 47.8041C8.61837e-08 55.0313 0.868472 61.6055 2.60539 67.5265C4.42917 73.4476 7.12142 78.5415 10.6821 82.8082C14.3297 86.9878 18.9326 90.2531 24.4908 92.6041C30.1358 94.868 36.7361 96 44.2918 96C51.8474 96 58.4044 94.868 63.9626 92.6041C69.6076 90.3401 74.2105 87.0748 77.7712 82.8082C81.4187 78.5415 84.111 73.4912 85.8479 67.6572Z"
            fill="#A9D3D9"
          />
        </svg>
      </div>
    </StyledSplash>
  );
}
