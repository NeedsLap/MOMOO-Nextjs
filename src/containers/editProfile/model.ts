interface ProfileToUpdate {
  file: File | null;
  displayName: string | null;
  email: string;
  password: string;
}

interface EditProfileProps {
  userData: {
    displayName: string;
    email: string;
    photoURL: string;
  };
}

export type { ProfileToUpdate, EditProfileProps };
