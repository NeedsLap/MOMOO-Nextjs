import { Timestamp } from 'firebase/firestore';

interface AlbumMetadata {
  feedList: string[];
  createdTime: Timestamp;
  name: string;
  sharedUsers: string[];
}

interface Album extends AlbumMetadata {
  imageUrl: string | null;
  id: string;
  user?: {
    uid: string;
    displayName?: string;
    email?: string;
  };
}

export type { AlbumMetadata, Album };
