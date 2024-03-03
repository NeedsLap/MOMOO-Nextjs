import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '@/modules/auth';
import pageReducer from '@/modules/page';
import signupReducer from '@/modules/signup';

const rootReducer = combineReducers({
  auth: authReducer,
  page: pageReducer,
  signup: signupReducer,
});

export default rootReducer;
