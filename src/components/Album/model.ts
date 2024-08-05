import { Dispatch, SetStateAction } from 'react';

import { Album, AlbumType } from '@/types/album';

export default interface AlbumProps {
  album: Album;
  showDeleteButton: boolean;
  albumType: AlbumType;
  setAlbums?: Dispatch<SetStateAction<Album[]>>;
  setShouldFetchSharedAlbums?: Dispatch<SetStateAction<boolean>>;
}
