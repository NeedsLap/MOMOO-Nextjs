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
