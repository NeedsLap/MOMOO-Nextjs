import Image from 'next/image';
import { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import {
  StyledSharingModal,
  DialogTitle
} from '@/components/Modal/SharingModal/StyledSharingModal';
import Toast from '@/components/Toast/Toast';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowModal from '@/hooks/dialog/useShowModal';
import { deleteSharedUser, getSharedUsers, postSharing } from '@/services/album';
import { searchUser } from '@/services/user';
import closeDialogOnClick from '@/utils/dialog';

import type SharingModalProps from '@/components/Modal/SharingModal/model';
import { ReduxState } from '@/modules/model';
import type { User } from '@/types/user';

export default function SharingModal({
  albumId,
  isShared,
  setIsShared,
  setIsModalOpen,
  setShouldFetchSharedAlbums
}: SharingModalProps) {
  const urlInputRef = useRef<HTMLInputElement | null>(null);
  const [focusedOnSearch, setFocusedOnSearch] = useState(false);
  const [searchInp, setSearchInp] = useState('');
  const [searchResult, setSearchResult] = useState<{
    success: boolean;
    user: User | null;
    shared: boolean;
  } | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [deleteSharedUserIsPending, setDeleteSharedUserIsPending] = useState(false);
  const [sharedUsers, setSharedUsers] = useState<User[]>([]);
  const [toastMessage, setToastMessage] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);

    if (!!sharedUsers.length !== isShared) {
      setShouldFetchSharedAlbums(true);
      setIsShared(!sharedUsers.length);
    }
  };

  const user = useSelector((state: ReduxState) => state.auth.user);

  const { showModal } = useShowModal();
  useEscDialog(closeModal);

  const searchUserToShare = async () => {
    setIsPending(true);
    const sharedUser = sharedUsers.find(v => v.email === searchInp);

    if (sharedUser) {
      setSearchResult({ user: sharedUser, success: true, shared: true });
    } else {
      try {
        const res = await searchUser(searchInp);
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error);
        }

        const { user: resultUser } = json;
        setSearchResult({ user: resultUser, success: !!resultUser, shared: false });
      } catch (error) {
        setToastMessage('검색 중 에러가 발생했습니다');
        console.error(error);
      }
    }

    setIsPending(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    switch (searchInp) {
      case '':
        return;
      case user.email:
        setSearchResult({ user, success: true, shared: false });
        return;
      default:
        searchUserToShare();
        break;
    }
  };

  const inviteUser = async (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.disabled = true;
    const resultUser = searchResult?.user;

    if (resultUser) {
      try {
        const res = await postSharing(resultUser.uid, albumId);

        if (!res.ok) {
          const json = await res.json();
          throw new Error(json.error);
        }

        setSearchResult(null);
        setSharedUsers(prev => [...prev, resultUser]);
      } catch (error) {
        target.disabled = false;
        setToastMessage('공유 대상을 추가하는데 실패했습니다');
        console.error(error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getSharedUsers(albumId);
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error);
        }

        setSharedUsers(json);
      } catch (error) {
        setToastMessage('공유한 사용자 정보를 불러오는데 실패했습니다');
        console.error(error);
      }
    })();
  }, []);

  const handleDeleteSharedUserBtn = async (index: number) => {
    setDeleteSharedUserIsPending(true);

    try {
      const res = await deleteSharedUser(albumId, sharedUsers[index].uid);

      if (!res.ok) {
        throw new Error(await res.text());
      }

      setSharedUsers(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    } catch (error) {
      setToastMessage('공유 대상을 삭제하는데 실패했습니다');
      console.error(error);
    }

    setDeleteSharedUserIsPending(false);
  };

  return (
    <StyledSharingModal
      aria-labelledby="modal"
      onClick={e => closeDialogOnClick(e, closeModal)}
      ref={showModal}
    >
      <div className="modal-wrap">
        <DialogTitle>공유</DialogTitle>
        <section className="search-member">
          <form className={focusedOnSearch ? 'search focus' : 'search'} onSubmit={handleSubmit}>
            <label htmlFor="sharing" className="a11y-hidden">
              공유 대상 찾기
            </label>
            <input
              id="sharing"
              type="text"
              placeholder="ex) momoo@naver.com"
              value={searchInp}
              ref={urlInputRef}
              onChange={e => setSearchInp(e.target.value)}
              onFocus={() => setFocusedOnSearch(true)}
              onBlur={() => setFocusedOnSearch(false)}
            />
            <button type="button" aria-label="검색하기">
              <Image width={18} height={18} src="/icons/search.svg" alt="" />
            </button>
          </form>
          {isPending && (
            <div className="result loading">
              <Image width={28} height={28} src="/icons/loading.svg" alt="검색중" />
            </div>
          )}
          {!isPending && searchResult?.success ? (
            <div className="result member">
              <Image
                width={32}
                height={32}
                src={searchResult.user?.photoURL || '/images/profile-basic-img.svg'}
                alt="프로필 사진"
              />
              <div>
                <span className="ellipsis">{searchResult.user?.displayName}</span>
                <span className="ellipsis">{searchResult.user?.email}</span>
              </div>
              <button
                type="button"
                onClick={inviteUser}
                disabled={searchResult.shared || searchResult.user === user}
                className="invite-btn"
              >
                {searchResult.shared ? '초대됨' : '초대'}
              </button>
            </div>
          ) : (
            searchResult && <p className="result not-found">검색 결과가 없습니다</p>
          )}
        </section>

        {!!sharedUsers.length && (
          <>
            <strong className="manage">공유 대상 관리</strong>
            <ul>
              {sharedUsers.map((sharedUser, i) => (
                <li className="member" key={sharedUser.uid}>
                  <Image
                    width={32}
                    height={32}
                    src={sharedUser.photoURL || '/images/profile-basic-s.svg'}
                    alt="프로필 사진"
                  />
                  <div>
                    <span className="ellipsis">{sharedUser.displayName}</span>
                    <span className="ellipsis">{sharedUser.email}</span>
                  </div>
                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() => handleDeleteSharedUserBtn(i)}
                    disabled={deleteSharedUserIsPending}
                  >
                    {deleteSharedUserIsPending ? (
                      <Image width={21} height={21} src="/icons/loading.svg" alt="" />
                    ) : (
                      '삭제'
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
        <button type="button" className="close-button" onClick={closeModal} aria-label="모달 닫기">
          <Image width={16} height={16} src="/icons/x-small.svg" alt="" />
        </button>
      </div>
      <Toast message={toastMessage} />
    </StyledSharingModal>
  );
}
