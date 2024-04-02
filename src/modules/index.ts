import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '@/modules/auth';
import editFeedModalReducer from '@/modules/editFeedModal';
import pageReducer from '@/modules/page';
import signupReducer from '@/modules/signup';
import uploadFeedModalReducer from '@/modules/uploadFeedModal';

const rootReducer = combineReducers({
  auth: authReducer,
  page: pageReducer,
  signup: signupReducer,
  editFeedModal: editFeedModalReducer,
  uploadFeedModal: uploadFeedModalReducer,
});

export default rootReducer;
