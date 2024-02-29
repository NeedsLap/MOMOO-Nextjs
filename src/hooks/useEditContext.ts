import { useContext } from 'react';

import { EditContext } from '@/context/EditContext';

export default function useEditContext() {
  const context = useContext(EditContext);

  return context;
}
