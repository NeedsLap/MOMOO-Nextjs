import { Dispatch, SetStateAction } from 'react';

import { Album } from '@/types/album';

interface AlbumProps {
  album: Album;
  showDeleteButton: boolean;
  setAlbums?: Dispatch<SetStateAction<Album[]>>;
  setShouldFetchSharedAlbums?: Dispatch<SetStateAction<boolean>>;
}

export type { AlbumProps };
