import { Dispatch, SetStateAction } from 'react';

interface SharingModalProps {
  albumId: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsShared: Dispatch<SetStateAction<boolean>>;
}

export type { SharingModalProps };
