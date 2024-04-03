import { useSelector } from 'react-redux';

import { ReduxState } from '@/modules/model';

export default function useUploadFeed() {
  const uploadFeed = useSelector((state: ReduxState) => state.uploadFeedModal);

  return { ...uploadFeed };
}
