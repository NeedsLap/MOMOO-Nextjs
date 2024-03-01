import { useState } from 'react';

import { signOut } from 'firebase/auth';

import { appAuth } from '@/firebase/config';

export default function useLogout() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setPending] = useState(false);

  const logout = async () => {
    setError(null);
    setPending(true);

    try {
      await signOut(appAuth);
    } catch (error) {
      setError('로그아웃에 실패했습니다');
    }

    setPending(false);
  };

  return { error, isPending, logout };
}
