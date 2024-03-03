import { SignupAction, SignupForm, SignupState } from '@/modules/model';

const initState = {
  signupForm: null,
};

const setSignupForm = (signupForm: SignupForm): SignupAction => {
  return { type: 'prevSignup', payload: { signupForm: signupForm } };
};

const resetSignupState = (): SignupAction => {
  return { type: 'reset', payload: initState };
};

const signupReducer = (
  state = initState,
  action: SignupAction,
): SignupState => {
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
export { setSignupForm, resetSignupState };
