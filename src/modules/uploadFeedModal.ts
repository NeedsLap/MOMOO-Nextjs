import { UploadFeedModalAction, UploadFeedModalState } from '@/modules/model';

const initState = {
  isUploadFeedModalOpen: false,
  albumNameToAdd: [],
  shouldUpdateFeedsData: false,
};

const openUploadFeedModal = (
  albumNameToAdd: string[],
): UploadFeedModalAction => {
  return {
    type: 'open',
    payload: { albumNameToAdd, shouldUpdateFeedsData: false },
  };
};

const closeUploadFeedModal = (): UploadFeedModalAction => {
  return { type: 'close', payload: null };
};

const shouldReloadPostData = (): UploadFeedModalAction => {
  return { type: 'done', payload: null };
};
const resetUploadFeedModalState = (): UploadFeedModalAction => {
  return { type: 'reset', payload: null };
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
    case 'done':
      return { ...state, shouldUpdateFeedsData: true };
    case 'reset':
      return initState;
    default:
      return state;
  }
};

export default uploadFeedModalReducer;
export {
  openUploadFeedModal,
  closeUploadFeedModal,
  shouldReloadPostData,
  resetUploadFeedModalState,
};
