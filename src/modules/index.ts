import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '@/modules/auth';
import pageReducer from '@/modules/page';
import signupReducer from '@/modules/signup';

import type { SignupData, PageData, AuthState } from '@/modules/model';

export interface RootState {
  signup: SignupData;
  page: PageData;
  auth: AuthState;
}

const rootReducer = combineReducers({
  auth: authReducer,
  page: pageReducer,
  signup: signupReducer,
});

export default rootReducer;
