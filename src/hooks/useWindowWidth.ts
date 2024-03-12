'use client';

import { useEffect, useState } from 'react';

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState<null | number>(null);

  useEffect(() => {
    const changeWindowWidth = () => {
      setWindowWidth(window ? window.innerWidth : 0);
    };

    changeWindowWidth();
    window.addEventListener('resize', changeWindowWidth);

    return () => window.removeEventListener('resize', changeWindowWidth);
  }, []);

  return windowWidth;
}
