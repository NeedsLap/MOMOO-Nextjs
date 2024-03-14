import Image from 'next/image';
import { useRef, useState } from 'react';

import { DocumentData } from 'firebase/firestore';

import {
  StyledSharingModal,
  DialogTitle,
} from '@/components/Modal/SharingModal/StyledSharingModal';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowModal from '@/hooks/dialog/useShowModal';
import { closeDialogOnClick } from '@/utils/dialog';

interface Props {
  albumData: DocumentData;
  closeModal: () => void;
}

export default function SharingModal({ closeModal, albumData }: Props) {
  const urlInputRef = useRef<HTMLInputElement | null>(null);
  const [focusedOnSearch, setFocusedOnSearch] = useState(false);

  const { showModal } = useShowModal();
  useEscDialog(closeModal);

  const searchMember = () => {};
  console.log(albumData);
  return (
    <StyledSharingModal
      aria-labelledby="modal"
      onClick={(e) => closeDialogOnClick(e, closeModal)}
      ref={showModal}
    >
      <div>
        <DialogTitle>공유</DialogTitle>
        <section className="search-member">
          <div className={focusedOnSearch ? 'search focus' : 'search'}>
            <label htmlFor="sharing" className="a11y-hidden">
              공유 대상 찾기
            </label>
            <input
              id="sharing"
              type="text"
              ref={urlInputRef}
              onFocus={() => setFocusedOnSearch(true)}
              onBlur={() => setFocusedOnSearch(false)}
            />
            <button type="button" onClick={searchMember} aria-label="검색하기">
              <Image width={18} height={18} src="/icons/search.svg" alt="" />
            </button>
          </div>
          <div className="member">
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
            <button type="button">초대</button>
          </div>
        </section>

        <strong className="manage">공유 대상 관리</strong>
        <ul>
          <li className="member">
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
