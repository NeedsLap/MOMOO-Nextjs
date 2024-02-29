import { DocumentData } from 'firebase/firestore';

import useGetSharedAlbums from '@/hooks/useGetSharedAlbums';

export default function useCheckAlbumPermission() {
  const { getSharedAlbums } = useGetSharedAlbums();

  const checkAlbumPermission = async (toCheckAlbum: DocumentData) => {
    const sharedAlbums = await getSharedAlbums();

    for (const ref of sharedAlbums) {
      if (ref.path === toCheckAlbum.ref.path) {
        return { isSharedAlbum: true };
      }
    }

    return { isSharedAlbum: false };
  };

  return { checkAlbumPermission };
}
