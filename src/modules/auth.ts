import { deleteCookie, setCookie } from '@/utils/cookie';

import { AuthState, AuthAction } from '@/modules/model';
import { ProfileToUpdate, User } from '@/types/user';

const initUser = {
  displayName: '',
  email: '',
  photoURL: '',
  uid: ''
};

const initState = {
  user: initUser,
  isAuthReady: false,
  loggedIn: false
};

const setAuth = (user: User): AuthAction => {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  setCookie('uid', user.uid, {
    expires
  });

  return { type: 'login', payload: user };
};

const deleteAuth = (): AuthAction => {
  deleteCookie('uid');
  return { type: 'logout', payload: null };
};

const updateAuth = (profileToUpdate: ProfileToUpdate): AuthAction => {
  return { type: 'editProfile', payload: profileToUpdate };
};

/* eslint-disable @typescript-eslint/default-param-last */
const authReducer = (state = initState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'login':
      return { isAuthReady: true, loggedIn: true, user: action.payload };
    case 'logout':
      return { isAuthReady: true, loggedIn: false, user: initUser };
    case 'editProfile':
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
};

export default authReducer;
export { setAuth, deleteAuth, updateAuth };
