import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { deleteAuth } from '@/modules/auth';
import { deleteUser } from '@/services/user';

export default function useDeleteId() {
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const deleteId = async () => {
    setIsPending(true);

    try {
      const res = await deleteUser();

      if (!res.ok) {
        const { error } = await res.json();
        setError(error);
        throw new Error(error);
      }

      dispatch(deleteAuth());
      router.push('/login');
    } catch (error) {
      console.error(error);
    }

    setIsPending(false);
  };

  return { deleteId, error, isPending };
}
