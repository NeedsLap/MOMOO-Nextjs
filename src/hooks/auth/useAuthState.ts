import { useSelector } from 'react-redux';

import { ReduxState } from '@/modules/model';

export default function useAuthState() {
  const auth = useSelector((state: ReduxState) => state.auth);

  return { ...auth };
}
