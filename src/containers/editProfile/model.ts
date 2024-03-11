import { Profile } from '@/utils/model';

interface ProfileToUpdate {
  file: File | null;
  displayName: string | null;
  email: string;
  password: string;
}

interface EditProfileProps {
  profile: Profile;
}

export type { ProfileToUpdate, EditProfileProps };
