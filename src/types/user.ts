interface Profile {
  displayName: string;
  email: string;
  photoURL: string;
}

interface User extends Profile {
  uid: string;
}

interface ProfileToUpdate extends Partial<Profile> {}

export type { Profile, User, ProfileToUpdate };
