import { EditFeedModalAction, EditFeedModalState } from '@/modules/model';

const initState = {
  isEditFeedModalOpen: false,
  feedIdToEdit: '',
};

const openEditFeedModal = (feedIdToEdit: string): EditFeedModalAction => {
  return { type: 'open', payload: { feedIdToEdit } };
};

const closeEditFeedModal = (): EditFeedModalAction => {
  return { type: 'close', payload: null };
};

const editFeedModalReducer = (
  state = initState,
  action: EditFeedModalAction,
): EditFeedModalState => {
  switch (action.type) {
    case 'open':
      return { isEditFeedModalOpen: true, ...action.payload };
    case 'close':
      return initState;
    default:
      return state;
  }
};

export default editFeedModalReducer;
export { openEditFeedModal, closeEditFeedModal };
