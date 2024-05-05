import { Dispatch, SetStateAction } from 'react';

import { AlbumSortOpt } from '@/components/Modal/ArrayModal/model';
import { Album } from '@/types/album';

interface AlbumProps {
  album: Album;
  showDeleteButton: boolean;
  setAlbums?: Dispatch<SetStateAction<Album[]>>;
  setSharedAlbums?: Dispatch<SetStateAction<Album[]>>;
  sortOpt?: AlbumSortOpt;
}

export type { AlbumProps };
