import { deleteCookie, setCookie, getCookie } from '@/utils/cookie';

import { AuthState, AuthAction } from '@/modules/model';

const uid = getCookie('uid') || '';

const initState = {
  uid,
};

const setAuth = (uid: string): AuthAction => {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  setCookie('uid', uid, {
    expires,
  });

  return { type: 'loggedIn', payload: uid };
};

const deleteAuth = (): AuthAction => {
  deleteCookie('uid');

  return { type: 'loggedOut', payload: null };
};

const authReducer = (state = initState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'loggedIn':
      return { uid: action.payload };
    case 'loggedOut':
      return { uid: '' };
    default:
      return state;
  }
};

export default authReducer;
export { setAuth, deleteAuth };
