import { doc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

import { appFireStore } from '@/firebase/config';
import useAuthState from '@/hooks/auth/useAuthState';

import { ReduxState } from '@/modules/model';

interface EditFeedData {
  title: string;
  text: string;
  selectedAddress: string;
  weatherImage: string;
  emotionImage: string;
  imageUrl: string[];
  [key: string]: string | string[];
}

export default function useEditFeed() {
  const { user } = useAuthState();
  const feedIdToEdit = useSelector(
    (state: ReduxState) => state.editFeedModal.feedIdToEdit,
  );

  const editFeed = async (updateData: EditFeedData, id?: string) => {
    let feedDocRef;

    if (feedIdToEdit) {
      feedDocRef = doc(appFireStore, user.uid, user.uid, 'feed', feedIdToEdit);
    } else if (id) {
      feedDocRef = doc(appFireStore, user.uid, user.uid, 'feed', id);
    } else {
      console.error('id 아규먼트가 누락되었습니다.');
      return;
    }

    await updateDoc(feedDocRef, updateData);
  };

  return editFeed;
}
