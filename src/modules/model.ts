export interface SignupForm {
  profileImgFiles: FileList | null;
  displayName: string;
  email: string;
  password: string;
  passwordConfirm: string;

  emailErrMessage: string;
  passwordErrMessage: string;
  passwordConfirmErrMessage: string;

  disabledSubmitBtn: boolean;

  allChecked: boolean;
  ageChecked: boolean;
  termsChecked: boolean;
  privacyChecked: boolean;
}

export interface SignupData {
  signupForm: null | SignupForm;
}

export type Path = 'signup' | 'terms' | 'privacy';

export interface PageData {
  prevPath: null | Path;
}

export interface UserData {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string | null;
}

export interface AuthState {
  user: null | UserData;
  isAuthReady: boolean;
}
