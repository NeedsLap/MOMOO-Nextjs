import { Dispatch, SetStateAction } from 'react';

import { AlbumSortOpt } from '@/components/Modal/ArrayModal/model';
import { Album } from '@/types/album';

interface AlbumProps {
  albumData: Album;
  showDeleteButton: boolean;
  setSharedAlbums?: Dispatch<SetStateAction<Album[]>>;
  sortOpt?: AlbumSortOpt;
}

export type { AlbumProps };
