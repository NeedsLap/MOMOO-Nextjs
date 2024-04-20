import { Timestamp } from 'firebase/firestore';

interface AlbumMetadata {
  feedList: [];
  createdTime: Timestamp;
  name: string;
  sharedUsers?: [];
}

interface Album extends AlbumMetadata {
  imageUrl: string | null;
  id: string;
  uid?: string;
}

export type { AlbumMetadata, Album };
