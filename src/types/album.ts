import { Timestamp } from 'firebase/firestore';

interface SharedUser {
  uid: string;
  permission: 'read';
}

type SharedUsers = SharedUser[];

interface AlbumMetadata {
  feedList: string[];
  createdTime: Timestamp;
  name: string;
  sharedUsers: SharedUsers;
}

interface Album extends Omit<AlbumMetadata, 'createdTime'> {
  createdTime: number;
  imageUrl: string | null;
  id: string;
  user?: {
    uid: string;
    displayName?: string;
    email?: string;
  };
}
// type GetAlbum = Album & { createdTime: Date };

export type { AlbumMetadata, Album, SharedUser, SharedUsers };
