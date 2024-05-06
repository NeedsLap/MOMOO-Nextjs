import { Profile } from '@/types/user';

interface ProfileToUpdate {
  file: File | null;
  displayName: string;
  email: string;
  password: string;
}

interface EditProfileProps {
  profile: Profile;
}

export type { ProfileToUpdate, EditProfileProps };
