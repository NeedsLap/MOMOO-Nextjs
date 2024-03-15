import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import StyledInputModal from '@/components/Modal/StyledInputModal';
import useReauthenticate from '@/hooks/auth/useReauthenticate';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowModal from '@/hooks/dialog/useShowModal';
import { closeDialogOnClick } from '@/utils/dialog';

export default function ReauthModal({
  setIsModalOpen,
  setIsReauthSuccess,
  cancel,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsReauthSuccess: Dispatch<SetStateAction<boolean>>;
  cancel: () => void;
}) {
  const [value, setValue] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const { reauthenticate, error } = useReauthenticate();
  const { showModal } = useShowModal();
  useEscDialog(cancel);

  useEffect(() => {
    if (!error) {
      return;
    }

    switch (error) {
      case 'auth/wrong-password':
        setErrMessage('비밀번호가 올바르지 않습니다');
        break;
      case 'auth/too-many-requests':
        setErrMessage('잠시 후 다시 시도해 주세요');
        break;
      case 'auth/network-request-failed':
        setErrMessage('네트워크 연결에 실패했습니다');
        break;
      case 'auth/internal-error':
        setErrMessage('잘못된 요청입니다');
        break;
      default:
        setErrMessage('계정 확인에 실패했습니다');
    }
  }, [error]);

  const handleReauth = async () => {
    setIsPending(true);
    const success = await reauthenticate(value);
    setIsPending(false);

    if (success) {
      setIsReauthSuccess(true);
      setIsModalOpen(false);
    }
  };

  const changeValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setErrMessage('');

    if (e.target.value === '') {
      setErrMessage('필수 입력 값입니다');
    }
  };

  return (
    <StyledInputModal
      role="dialog"
      aria-labelledby="modal-select"
      ref={showModal}
      onClick={(e) => closeDialogOnClick(e, cancel)}
    >
      <h3>계정 확인</h3>
      <p>현재 비밀번호를 입력해 주세요</p>
      <input type="password" placeholder="password" onChange={changeValue} />
      <strong role="alert">{errMessage ? `*${errMessage}` : ''}</strong>
      <div className="btn-wrap">
        <button type="button" onClick={cancel}>
          취소
        </button>
        <button type="button" onClick={handleReauth} disabled={!value}>
          {isPending ? (
            <Image
              width={16}
              height={16}
              src="/icons/loading.svg"
              alt="로딩중"
            />
          ) : (
            '확인'
          )}
        </button>
      </div>
    </StyledInputModal>
  );
}
