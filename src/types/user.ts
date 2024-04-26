interface Profile {
  displayName: string;
  email: string;
  photoURL: string;
}

interface User extends Profile {
  uid: string;
}

export type { Profile, User };
