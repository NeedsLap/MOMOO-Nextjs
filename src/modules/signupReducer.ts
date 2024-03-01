import { SignupForm, SignupData } from '@/modules/model';

const initState = {
  signupForm: null,
};

type Action =
  | {
      type: 'reset';
      payload: SignupData;
    }
  | {
      type: 'prevSignup';
      payload: SignupData;
    };

export const setSignupForm = (signupForm: SignupForm): Action => {
  return { type: 'prevSignup', payload: { signupForm: signupForm } };
};

export const resetSignupData = (): Action => {
  return { type: 'reset', payload: initState };
};

const signupReducer = (state = initState, action: Action): SignupData => {
  switch (action.type) {
    case 'prevSignup':
      return action.payload;
    case 'reset':
      return action.payload;
    default:
      return state;
  }
};

export default signupReducer;
