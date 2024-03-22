import { useState } from 'react';

import { deleteUser } from '@/services/user';

export default function useDeleteId() {
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);

  const deleteId = async () => {
    setIsPending(true);

    try {
      const res = await deleteUser();

      if (!res.ok) {
        const error = await res.text();
        setError(error);
        throw new Error(error);
      }
    } catch (error) {
      console.error(error);
    }

    setIsPending(false);
  };

  return { deleteId, error, isPending };
}
