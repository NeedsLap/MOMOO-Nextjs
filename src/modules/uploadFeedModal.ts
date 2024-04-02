import { UploadFeedModalAction, UploadFeedModalState } from '@/modules/model';

const initState = {
  isUploadFeedModalOpen: false,
  albumNameToAdd: '',
};

const openUploadFeedModal = (albumNameToAdd: string): UploadFeedModalAction => {
  return { type: 'open', payload: { albumNameToAdd } };
};

const closeUploadFeedModal = (): UploadFeedModalAction => {
  return { type: 'close', payload: null };
};

const uploadFeedModalReducer = (
  state = initState,
  action: UploadFeedModalAction,
): UploadFeedModalState => {
  switch (action.type) {
    case 'open':
      return { isUploadFeedModalOpen: true, ...action.payload };
    case 'close':
      return initState;
    default:
      return state;
  }
};

export default uploadFeedModalReducer;
export { openUploadFeedModal, closeUploadFeedModal };
