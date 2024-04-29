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

interface Album extends AlbumMetadata {
  imageUrl: string | null;
  id: string;
  user?: {
    uid: string;
    displayName?: string;
    email?: string;
  };
}

export type { AlbumMetadata, Album, SharedUser, SharedUsers };
