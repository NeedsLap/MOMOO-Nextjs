import Image from 'next/image';
import { useRef } from 'react';

import {
  StyledSharingModal,
  DialogTitle,
} from '@/components/Modal/SharingModal/StyledSharingModal';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowModal from '@/hooks/dialog/useShowModal';
import { closeDialogOnClick } from '@/utils/dialog';

interface Props {
  albumId: string;
  closeModal: () => void;
}

export default function SharingModal({ albumId, closeModal }: Props) {
  const urlInputRef = useRef<HTMLInputElement | null>(null);

  const { showModal } = useShowModal();
  useEscDialog(closeModal);

  const copyUrl = () => {
    if (urlInputRef.current) {
      urlInputRef.current.select();
      document.execCommand('copy');
      alert('URL이 복사되었습니다.'); // 토스트 팝업으로 변경
    }
  };

  return (
    <StyledSharingModal
      aria-labelledby="modal"
      onClick={(e) => closeDialogOnClick(e, closeModal)}
      ref={showModal}
    >
      <div>
        <DialogTitle>공유</DialogTitle>
        <div>
          <label htmlFor="sharing" className="a11y-hidden">
            공유 링크
          </label>
          <input
            id="sharing"
            type="url"
            value="https://momoo.kr"
            ref={urlInputRef}
          />
          <button type="button" className="copy-btn" onClick={copyUrl}>
            복사
          </button>
        </div>
        <strong className="manage">게스트 관리</strong>
        <ul>
          <li>
            <Image
              width={32}
              height={32}
              src="/icons/x-small.svg"
              alt="프로필 사진"
            />
            <div>
              <span className="ellipsis">애벌레가 먹은 사과는 맛있었다</span>
              <span className="ellipsis">appleappleappleapple@naver.com</span>
            </div>
            <button type="button">삭제</button>
          </li>
        </ul>
        <button
          type="button"
          className="close-button"
          onClick={closeModal}
          aria-label="모달 닫기"
        >
          <Image width={16} height={16} src="/icons/x-small.svg" alt="" />
        </button>
      </div>
    </StyledSharingModal>
  );
}
