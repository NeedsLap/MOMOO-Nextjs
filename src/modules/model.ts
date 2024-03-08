interface SignupForm {
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

interface SignupState {
  signupForm: null | SignupForm;
}

type SignupAction =
  | {
      type: 'reset';
      payload: SignupState;
    }
  | {
      type: 'prevSignup';
      payload: SignupState;
    };

type Path = 'signup' | 'terms' | 'privacy';

interface PageState {
  prevPath: null | Path;
}

type PageAction =
  | {
      type: 'reset';
      payload: PageState;
    }
  | {
      type: 'savePrevPath';
      payload: PageState;
    };

interface UserData {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
}

interface AuthState {
  user: UserData;
  isAuthReady: boolean;
  loggedIn: boolean;
}

type AuthAction =
  | { type: 'loggedIn'; payload: UserData }
  | { type: 'loggedOut'; payload: null };

interface EditFeedModalState {
  isEditFeedModalOpen: boolean;
  feedIdToEdit: string;
}

type EditFeedModalAction =
  | {
      type: 'open';
      payload: {
        feedIdToEdit: string;
      };
    }
  | { type: 'close'; payload: null };

interface ReduxState {
  signup: SignupState;
  page: PageState;
  auth: AuthState;
  editFeedModal: EditFeedModalState;
}

export type {
  ReduxState,
  SignupForm,
  SignupState,
  SignupAction,
  Path,
  PageState,
  PageAction,
  UserData,
  AuthState,
  AuthAction,
  EditFeedModalState,
  EditFeedModalAction,
};
