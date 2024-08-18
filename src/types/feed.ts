import { Timestamp } from 'firebase/firestore';

import { AlbumType } from '@/types/album';

interface FeedOfDatabase {
  imageUrl: string[];
  title: string;
  text: string;
  selectedAddress: string;
  emotionImage: string;
  weatherImage: string;
  id: string;
  timestamp: Timestamp;
}

interface FeedToUpdate extends Omit<FeedOfDatabase, 'id' | 'timestamp'> {}

interface FeedToUpdateWithIndexSignature extends FeedToUpdate {
  [key: string]: string | string[];
}

interface Feed extends Omit<FeedOfDatabase, 'timestamp'> {
  timestamp: number;
  albumType: AlbumType;
}

export type { FeedToUpdate, FeedToUpdateWithIndexSignature, Feed, FeedOfDatabase };
