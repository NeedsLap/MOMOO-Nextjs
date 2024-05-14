import { Timestamp } from 'firebase/firestore';

import { AlbumType } from '@/types/album';

interface FeedBase {
  imageUrl: string[];
  title: string;
  text: string;
  selectedAddress: string;
  emotionImage: string;
  weatherImage: string;
}

interface FeedToUpdate extends FeedBase {
  [key: string]: string | string[];
}

interface FeedOfDatabase extends FeedBase {
  id: string;
  timestamp: Timestamp;
}

interface Feed extends Omit<FeedOfDatabase, 'timestamp'> {
  timestamp: number;
  albumType: AlbumType;
}

export type { FeedToUpdate, Feed, FeedOfDatabase };
