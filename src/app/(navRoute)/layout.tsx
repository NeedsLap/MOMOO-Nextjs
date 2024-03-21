'use client';

import Nav from '@/components/Nav/Nav';
import useWindowWidth from '@/hooks/useWindowWidth';

export default function NavLayout({ children }: { children: React.ReactNode }) {
  const windowWidth = useWindowWidth();

  return (
    <>
      {windowWidth && windowWidth > 430 && <Nav />}
      {children}
    </>
  );
}
