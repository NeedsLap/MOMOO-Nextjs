import { AuthState, UserData } from '@/modules/model';
type Action = { type: 'isAuthReady'; payload: UserData | null };

const initState = {
  user: null,
  isAuthReady: false,
};
export const setAuth = (user: UserData | null): Action => {
  return { type: 'isAuthReady', payload: user };
};

const authReducer = (state = initState, action: Action): AuthState => {
  switch (action.type) {
    case 'isAuthReady':
      return { isAuthReady: true, user: action.payload };
    default:
      return state;
  }
};

export default authReducer;
