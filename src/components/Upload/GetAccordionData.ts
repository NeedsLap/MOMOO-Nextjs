import {
  collection,
  getDocs,
  DocumentData,
  query,
  orderBy,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';

import { appFireStore } from '@/firebase/config';

import { AccordionDataType, AlbumIdData } from '@/components/Upload/model';
import { ReduxState } from '@/modules/model';

const GetAccordionData = () => {
  const user = useSelector((state: ReduxState) => state.auth.user);

  const getAccordionData = async () => {
    const albumDataList: DocumentData[] = [];
    const albumIdList: string[] = [];

    try {
      const q = query(
        collection(appFireStore, user.uid, user.uid, 'album'),
        orderBy('createdTime'),
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        albumDataList.push({ ...doc.data(), id: doc.id });
        albumIdList.push(doc.id);
      });
    } catch (error) {
      console.log(error);
    }

    const accordionData: AccordionDataType = [
      {
        question: '앨범 선택',
        answer: [],
      },
      {
        question: '오늘의 날씨',
        answer: [
          { path: '/images/sunny.svg', name: 'sunny' },
          { path: '/images/partly-sunny.svg', name: 'partly-sunny' },
          { path: '/images/cloudy.svg', name: 'cloudy' },
          { path: '/images/rainy.svg', name: 'rainy' },
          { path: '/images/snowy.svg', name: 'snowy' },
        ],
      },
      {
        question: '오늘의 기분',
        answer: [
          { path: '/images/excited.svg', name: 'excited' },
          { path: '/images/smiling.svg', name: 'smiling' },
          { path: '/images/yummy.svg', name: 'yummy' },
          { path: '/images/frowning.svg', name: 'frowning' },
          { path: '/images/sad.svg', name: 'sad' },
          { path: '/images/angry.svg', name: 'angry' },
        ],
      },
    ];

    const albumIdData: AlbumIdData[] = [];

    albumDataList.forEach((albumData, i) => {
      accordionData[0].answer.push(albumData.name);
      albumIdData.push({
        albumName: albumData.name,
        docId: albumIdList[i],
      });
    });

    return { accordionData, albumIdData };
  };

  return getAccordionData;
};

export default GetAccordionData;
