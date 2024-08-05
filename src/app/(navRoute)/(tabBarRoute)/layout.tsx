'use client';

import TabBar from '@/components/TapBar/TapBar';
import useWindowWidth from '@/hooks/useWindowWidth';

export default function TobBarLayout({ children }: { children: React.ReactNode }) {
  const windowWidth = useWindowWidth();

  return (
    <>
      {windowWidth && windowWidth <= 430 && <TabBar />}
      {children}
    </>
  );
}
