import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import StyledNav from '@/components/TapBar/StyledTapBar';
import useUploadFeedModalWithWebView from '@/hooks/useUploadFeedModalWithWebView';

export default function TabBar() {
  const pathname = usePathname();
  const { openModal } = useUploadFeedModalWithWebView();

  return (
    <StyledNav>
      <div className="navBtn">
        <Link href="/" className={pathname === '/' ? 'curr' : ''}>
          <Image
            width={22}
            height={22}
            src={pathname === '/' ? '/icons/home-mobile-active.svg' : '/icons/home-mobile.svg'}
            alt=""
          />
          Home
        </Link>
        <button type="button" onClick={() => openModal(['전체 보기'])}>
          <Image width={22} height={22} src="/icons/upload-mobile.svg" alt="" />
          Upload
        </button>
        <Link href="/my" className={pathname === '/my' ? 'curr' : ''}>
          <Image
            width={22}
            height={22}
            src={pathname === '/my' ? '/icons/my-mobile-active.svg' : '/icons/my-mobile.svg'}
            alt=""
          />
          Mypage
        </Link>
      </div>
    </StyledNav>
  );
}
