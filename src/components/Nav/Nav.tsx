import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import MyNonModal from '@/components/MyNonModal/MyNonModal';
import StyledNav from '@/components/Nav/StyledNav';
import useAuthContext from '@/hooks/useAuthContext';
import useUploadContext from '@/hooks/useUploadContext';

export default function Nav() {
  const [openMyDialog, setIsOpenMyDialog] = useState(false);
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
  const { setIsUploadModalOpen } = useUploadContext();
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  const openUploadModalFunc = () => {
    setIsUploadModalOpen(true);
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
            disabled={!user}
          >
            <Image width={24} height={24} src="/icons/home-pc.svg" alt="" />
            <p>Home</p>
          </button>

          <button
            type="button"
            className="upload"
            onClick={openUploadModalFunc}
            disabled={!user}
          >
            <Image width={24} height={24} src="/icons/upload-pc.svg" alt="" />
            <p>Upload</p>
          </button>
          <button
            type="button"
            className="my"
            onClick={openMyDialogFunc}
            disabled={!user}
          >
            <Image width={24} height={24} src="/icons/my-pc.svg" alt="" />
            <p>Mypage</p>
          </button>
        </div>
        {user ? (
          <Link href="/">
            <h1 className="a11y-hidden">MoMoo</h1>
            <Image
              width={clientWitch > 1024 ? 64 : 196}
              height={clientWitch > 1024 ? 376 : 32}
              src={
                clientWitch > 1024 ? '/icons/logo-col.svg' : '/icons/logo.svg'
              }
              alt="로고"
            />
          </Link>
        ) : (
          <>
            <h1 className="a11y-hidden">MoMoo</h1>
            <Image
              width={clientWitch > 1024 ? 64 : 196}
              height={clientWitch > 1024 ? 376 : 32}
              src={
                clientWitch > 1024 ? '/icons/logo-col.svg' : '/icons/logo.svg'
              }
              alt="로고"
            />
          </>
        )}

        {openMyDialog && <MyNonModal setIsDialogOpen={setIsOpenMyDialog} />}
      </StyledNav>
    </>
  );
}
