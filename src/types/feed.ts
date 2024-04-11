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

interface Feed extends FeedBase {
  id: string;
  timestamp: Timestamp;
}

export type { FeedToUpdate, Feed };
