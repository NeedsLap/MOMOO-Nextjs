import { useState } from 'react';

import { deleteAlbum } from '@/services/album';

interface Props {
  albumId: string;
}

export default function useDeleteAlbum() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAlbumAndHandleException = async ({ albumId }: Props) => {
    try {
      setIsPending(true);

      await deleteAlbum(albumId);
      setIsPending(false);

      return { success: true, message: '앨범이 삭제되었습니다.' };
    } catch (error) {
      setError('앨범 삭제 중 오류가 발생했습니다.');
      setIsPending(false);
      return { success: false, message: '앨범 삭제 중 오류가 발생했습니다.' };
    }
  };

  return { deleteAlbumAndHandleException, isPending, error };
}
