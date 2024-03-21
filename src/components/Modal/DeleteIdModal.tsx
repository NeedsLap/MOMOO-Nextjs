import { Dispatch, SetStateAction, useEffect } from 'react';

import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import LoadingModal from '@/components/Modal/Loading/Loading';
import useDeleteId from '@/hooks/auth/useDeleteId';

export default function DeleteIdModal({
  onClose,
  setSubmitErrMessage,
  setIsModalOpen,
}: {
  onClose: () => void;
  setSubmitErrMessage: Dispatch<SetStateAction<string>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { deleteId, error, isPending } = useDeleteId();

  useEffect(() => {
    if (error) {
      setSubmitErrMessage(error);
      setIsModalOpen(false);
    }
  }, [error]);

  return (
    <>
      {!isPending && (
        <ConfirmModal
          onClose={onClose}
          handleAgreeBtn={() => {
            (async () => {
              await deleteId();
            })();
          }}
          title="모무를 떠나시겠습니까?"
          btnNameList={['아니요', '예']}
        />
      )}
      {isPending && <LoadingModal text="계정 삭제 중" />}
    </>
  );
}
