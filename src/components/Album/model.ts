import { Dispatch, SetStateAction } from 'react';

import { Album, AlbumType } from '@/types/album';

interface AlbumProps {
  album: Album;
  showDeleteButton: boolean;
  albumType: AlbumType;
  setAlbums?: Dispatch<SetStateAction<Album[]>>;
  setShouldFetchSharedAlbums?: Dispatch<SetStateAction<boolean>>;
}

export type { AlbumProps };
