import { combineReducers } from 'redux';

import pageReducer from '@/modules/pageReducer';
import signupReducer from '@/modules/signupReducer';

import type { SignupData, PageData } from '@/modules/model';

export interface RootState {
  signupReducer: SignupData;
  pageReducer: PageData;
}

const rootReducer = combineReducers({ signupReducer, pageReducer });
console.log(rootReducer);
export default rootReducer;
