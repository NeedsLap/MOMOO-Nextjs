import { useEffect } from 'react';

import useWindowWidth from '@/hooks/useWindowWidth';

export default function useScrollLockForDimmed() {
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (!windowWidth || windowWidth > 430) {
      return;
    }

    document.body.classList.add('scroll-lock');

    return () => document.body.classList.remove('scroll-lock');
  }, [windowWidth]);
}
