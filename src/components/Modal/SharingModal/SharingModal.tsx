import Image from 'next/image';
import { FormEvent, useRef, useState } from 'react';

import { DocumentData } from 'firebase/firestore';

import {
  StyledSharingModal,
  DialogTitle,
} from '@/components/Modal/SharingModal/StyledSharingModal';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowModal from '@/hooks/dialog/useShowModal';
import { postSharing } from '@/services/album';
import { getUserByEmail } from '@/services/user';
import { closeDialogOnClick } from '@/utils/dialog';

import { UserData } from '@/modules/model';

interface Props {
  albumData: DocumentData;
  closeModal: () => void;
}

export default function SharingModal({ closeModal, albumData }: Props) {
  const urlInputRef = useRef<HTMLInputElement | null>(null);
  const [focusedOnSearch, setFocusedOnSearch] = useState(false);
  const [searchInp, setSearchInp] = useState('');
  const [searchResult, setSearchResult] = useState<{
    seccess: boolean;
    user: UserData | null; // uid 추가하기
  } | null>(null);
  const [isPending, setIsPending] = useState(false);

  const { showModal } = useShowModal();
  useEscDialog(closeModal);

  const searchMember = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchInp) {
      return;
    }

    setIsPending(true);
    // 예외 처리 추가하기
    const res = await getUserByEmail(searchInp);
    const { user } = await res.json();
    setSearchResult({ user, seccess: !!user });
    setIsPending(false);
  };

  const inviteUser = () => {
    postSharing(searchResult?.user?.uid || '', albumData.id);
  };

  return (
    <StyledSharingModal
      aria-labelledby="modal"
      onClick={(e) => closeDialogOnClick(e, closeModal)}
      ref={showModal}
    >
      <div>
        <DialogTitle>공유</DialogTitle>
        <section className="search-member">
          <form
            className={focusedOnSearch ? 'search focus' : 'search'}
            onSubmit={searchMember}
          >
            <label htmlFor="sharing" className="a11y-hidden">
              공유 대상 찾기
            </label>
            <input
              id="sharing"
              type="text"
              placeholder="ex) momoo@naver.com"
              value={searchInp}
              ref={urlInputRef}
              onChange={(e) => setSearchInp(e.target.value)}
              onFocus={() => setFocusedOnSearch(true)}
              onBlur={() => setFocusedOnSearch(false)}
            />
            <button aria-label="검색하기">
              <Image width={18} height={18} src="/icons/search.svg" alt="" />
            </button>
          </form>
          {isPending ? (
            <div className="result loading">
              <Image
                width={28}
                height={28}
                src="/icons/loading.svg"
                alt="검색중"
              />
            </div>
          ) : searchResult && searchResult.seccess ? (
            <div className="result member">
              <Image
                width={32}
                height={32}
                src={
                  searchResult.user?.photoURL || '/images/profile-basic-img.svg'
                }
                alt="프로필 사진"
              />
              <div>
                <span className="ellipsis">
                  {searchResult.user?.displayName}
                </span>
                <span className="ellipsis">{searchResult.user?.email}</span>
              </div>
              <button type="button" onClick={inviteUser}>
                초대
              </button>
            </div>
          ) : (
            searchResult && (
              <p className="result not-found">검색 결과가 없습니다</p>
            )
          )}
        </section>

        <strong className="manage">공유 대상 관리</strong>
        <ul>
          <li className="member">
            <Image
              width={32}
              height={32}
              src="/images/profile-basic-s.svg"
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
