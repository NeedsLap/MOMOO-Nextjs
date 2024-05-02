import { Timestamp } from 'firebase/firestore';

interface FeedBase {
  imageUrl: string[];
  title: string;
  text: string;
  album: string[];
  selectedAddress: string;
  emotionImage: string;
  weatherImage: string;
}

interface FeedToUpdate extends FeedBase {
  [key: string]: string | string[];
}

interface FeedMetadata extends FeedBase {
  id: string;
  timestamp: Timestamp;
}

type AlbumType = 'shared' | 'my';

interface Feed extends Omit<FeedMetadata, 'timestamp'> {
  timestamp: number;
  albumType: AlbumType;
}

export type { FeedToUpdate, Feed, FeedMetadata, AlbumType };
