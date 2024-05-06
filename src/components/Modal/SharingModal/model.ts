import { Dispatch, SetStateAction } from 'react';

interface SharingModalProps {
  albumId: string;
  isShared: boolean;
  setIsShared: Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setShouldFetchSharedAlbums: Dispatch<SetStateAction<boolean>>;
}

export type { SharingModalProps };
