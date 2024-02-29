import Image from 'next/image';
import { useRouter } from 'next/navigation';

import StyledTopbar from '@/components/Topbar/StyledTopbar';

const TopBar = ({ tit }: { tit: string }) => {
  const router = useRouter();

  const handleBtn = () => {
    router.back();
  };

  return (
    <StyledTopbar>
      <h1>{tit}</h1>
      <button
        type="button"
        className="back"
        onClick={handleBtn}
        aria-label="이전 페이지로 가기"
      >
        <Image src="/icons/srrow-back.svg" alt="" width={16} height={16} />
      </button>
    </StyledTopbar>
  );
};

export default TopBar;
