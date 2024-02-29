import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import StyledNav from '@/components/Nav/StyledNav';

export default function TabBar() {
  const router = useRouter();

  return (
    <StyledNav>
      <div className="navBtn">
        <Link href="/" className={router.pathname === '/' ? 'curr' : ''}>
          <Image
            width={22}
            height={22}
            src={
              router.pathname === '/'
                ? '/icons/home-mobile-active.svg'
                : '/icons/home-mobile.svg'
            }
            alt=""
          />
          Home
        </Link>
        <Link
          href="/upload"
          className={router.pathname === '/upload' ? 'curr' : ''}
        >
          <Image width={22} height={22} src="/icons/upload.svg" alt="" />
          Upload
        </Link>
        <Link href="/my" className={router.pathname === '/my' ? 'curr' : ''}>
          <Image
            width={22}
            height={22}
            src={
              router.pathname === '/my'
                ? '/icons/my-mobile-active.svg'
                : '/icons/my-mobile.svg'
            }
            alt=""
          />
          Mypage
        </Link>
      </div>
    </StyledNav>
  );
}
