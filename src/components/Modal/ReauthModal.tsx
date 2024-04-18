import Image from 'next/image';
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import InputModal from '@/components/Modal/InputModal/InputModal';
import useReauthenticate from '@/hooks/auth/useReauthenticate';

export default function ReauthModal({
  setIsModalOpen,
  setIsReauthSuccess,
  cancle,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsReauthSuccess: Dispatch<SetStateAction<boolean>>;
  cancle: () => void;
}) {
  const [value, setValue] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const { reauthenticate, error } = useReauthenticate();

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

  const handleReauth = async (e: FormEvent) => {
    e.preventDefault();
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
    <InputModal
      onClose={cancle}
      title="계정 확인"
      text="현재 비밀번호를 입력해 주세요"
    >
      <form onSubmit={handleReauth}>
        <input type="password" placeholder="password" onChange={changeValue} />
        {errMessage && <strong role="alert">*{errMessage}</strong>}
        <div className="btn-wrap">
          <button type="button" onClick={cancle}>
            취소
          </button>
          <button type="submit" disabled={!value || isPending}>
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
      </form>
    </InputModal>
  );
}
