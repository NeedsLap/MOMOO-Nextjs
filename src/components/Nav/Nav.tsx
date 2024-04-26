'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import MyNonModal from '@/components/MyNonModal/MyNonModal';
import StyledNav from '@/components/Nav/StyledNav';
import useAuthState from '@/hooks/auth/useAuthState';
import useUploadFeedModalWithWebView from '@/hooks/useUploadFeedModalWithWebView';
import useWindowWidth from '@/hooks/useWindowWidth';

export default function Nav() {
  const [openMyDialog, setIsOpenMyDialog] = useState(false);

  const router = useRouter();
  const { uid } = useAuthState();
  const windowWidth = useWindowWidth();
  const { openModal } = useUploadFeedModalWithWebView();

  const openUploadModalFunc = () => {
    openModal(['전체 보기']);
  };

  const openMyDialogFunc = () => {
    setIsOpenMyDialog(true);
  };
  const handleHomeNavigate = () => {
    router.push('/');
  };

  return (
    <>
      <StyledNav>
        <div className="navBtn">
          <button
            type="button"
            className="home"
            onClick={handleHomeNavigate}
            disabled={!uid}
          >
            <Image width={24} height={24} src="/icons/home-pc.svg" alt="" />
            <p>Home</p>
          </button>

          <button
            type="button"
            className="upload"
            onClick={openUploadModalFunc}
            disabled={!uid}
          >
            <Image width={24} height={24} src="/icons/upload-pc.svg" alt="" />
            <p>Upload</p>
          </button>
          <button
            type="button"
            className="my"
            onClick={openMyDialogFunc}
            disabled={!uid}
          >
            <Image width={24} height={24} src="/icons/my-pc.svg" alt="" />
            <p>Mypage</p>
          </button>
        </div>
        {uid ? (
          <Link href="/">
            <h1 className="a11y-hidden">MoMoo</h1>
            {windowWidth && (
              <Image
                className="logoImg"
                width={windowWidth > 1024 ? 64 : 196}
                height={windowWidth > 1024 ? 376 : 32}
                src={
                  windowWidth > 1024 ? '/icons/logo-col.svg' : '/icons/logo.svg'
                }
                alt="로고"
              />
            )}
          </Link>
        ) : (
          <>
            <h1 className="a11y-hidden">MoMoo</h1>
            {windowWidth && (
              <Image
                className="logoImg"
                width={windowWidth > 1024 ? 64 : 196}
                height={windowWidth > 1024 ? 376 : 32}
                src={
                  windowWidth > 1024 ? '/icons/logo-col.svg' : '/icons/logo.svg'
                }
                alt="로고"
              />
            )}
          </>
        )}

        {openMyDialog && <MyNonModal setIsDialogOpen={setIsOpenMyDialog} />}
      </StyledNav>
    </>
  );
}
