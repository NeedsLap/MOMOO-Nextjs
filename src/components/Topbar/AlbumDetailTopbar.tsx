import Image from 'next/image';
import { useRouter } from 'next/navigation';

import StyledTopbar, {
  StyledAddPhotoBtn,
} from '@/components/Topbar/StyledTopbar';

import { AlbumDetailTopbapProps } from '@/components/Topbar/model';

export default function AlbumDetailTopBar({
  tit,
  openUploadModal,
}: AlbumDetailTopbapProps) {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <StyledTopbar>
      <h1 className="a11y-hidden">MOMOO</h1>
      <h2>{tit}</h2>
      <button
        type="button"
        className="back"
        onClick={goBack}
        aria-label="이전 페이지로 가기"
      >
        <Image src="/icons/arrow-back.svg" alt="" width={16} height={16} />
      </button>
      <StyledAddPhotoBtn
        type="button"
        aria-label="사진 추가하기"
        onClick={openUploadModal}
      >
        <Image width={16} height={16} src="/icons/add-s.svg" alt="" />
      </StyledAddPhotoBtn>
    </StyledTopbar>
  );
}
