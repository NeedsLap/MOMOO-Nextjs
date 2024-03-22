import { deleteCookie, setCookie } from '@/utils/cookie';

import { AuthState, AuthAction, UserData } from '@/modules/model';

const initUser = {
  displayName: '',
  email: '',
  photoURL: '',
  uid: '',
};

const initState = {
  user: initUser,
  isAuthReady: false,
  loggedIn: false,
};

const setAuth = (user: UserData): AuthAction => {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  setCookie('uid', user.uid, {
    expires,
  });

  return { type: 'loggedIn', payload: user };
};

const deleteAuth = (): AuthAction => {
  deleteCookie('uid');

  return { type: 'loggedOut', payload: null };
};

const authReducer = (state = initState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'loggedIn':
      return { isAuthReady: true, loggedIn: true, user: action.payload };
    case 'loggedOut':
      return { isAuthReady: true, loggedIn: false, user: initUser };
    default:
      return state;
  }
};

export default authReducer;
export { setAuth, deleteAuth };
