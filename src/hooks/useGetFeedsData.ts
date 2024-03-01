import { useState } from 'react';

import {
  getDocs,
  collection,
  query,
  where,
  or,
  DocumentData,
  orderBy,
} from 'firebase/firestore';

import { appFireStore } from '@/firebase/config';

export default function useGetFeedsData() {
  const [feedsData, setFeedsData] = useState<DocumentData[] | null>(null);

  const getFeedsData = async (feedList: string[], uid: string) => {
    if (!feedList.length) {
      return setFeedsData([]);
    }

    const feedRef = collection(appFireStore, uid, uid, 'feed');
    const searchList = feedList.map((feedId) => where('id', '==', feedId));
    const q = query(feedRef, or(...searchList), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const feedListData: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
      feedListData.push(doc.data());
    });

    setFeedsData(feedListData);
  };

  return { feedsData, getFeedsData };
}
