import { Timestamp } from 'firebase/firestore';

interface SharedUser {
  uid: string;
  permission: 'read';
}

type SharedUsers = SharedUser[];

interface AlbumOfDatabase {
  feedList: string[];
  createdTime: Timestamp;
  name: string;
  sharedUsers: SharedUsers;
}

interface Album extends Omit<AlbumOfDatabase, 'createdTime'> {
  createdTime: number;
  imageUrl: string | null;
  id: string;
  user: {
    uid: string;
    displayName?: string;
    email?: string;
  };
}

type AlbumType = 'shared' | 'my';

export type { AlbumOfDatabase, Album, SharedUser, SharedUsers, AlbumType };
