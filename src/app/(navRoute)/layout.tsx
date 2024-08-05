'use client';

import { useSelector } from 'react-redux';

import Nav from '@/components/Nav/Nav';
import UploadModal from '@/components/Upload/UploadModal/UploadModal';
import useWindowWidth from '@/hooks/useWindowWidth';

import { ReduxState } from '@/modules/model';

export default function NavLayout({ children }: { children: React.ReactNode }) {
  const windowWidth = useWindowWidth();
  const isUploadModalOpen = useSelector(
    (state: ReduxState) => state.uploadFeedModal.isUploadFeedModalOpen
  );

  return (
    <>
      {windowWidth && windowWidth > 430 && <Nav />}
      {isUploadModalOpen && <UploadModal />}
      {children}
    </>
  );
}
