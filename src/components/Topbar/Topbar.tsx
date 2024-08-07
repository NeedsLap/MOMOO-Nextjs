import Image from 'next/image';
import { useRouter } from 'next/navigation';

import StyledTopbar from '@/components/Topbar/StyledTopbar';

export default function TopBar({ tit }: { tit: string }) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <StyledTopbar>
      <h1 className="a11y-hidden">MOMOO</h1>
      <h2>{tit}</h2>
      <button type="button" className="back" onClick={goBack} aria-label="이전 페이지로 가기">
        <Image src="/icons/arrow-back.svg" alt="" width={16} height={16} />
      </button>
    </StyledTopbar>
  );
}
