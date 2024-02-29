import { useContext } from 'react';

import { UploadContext } from '@/context/UploadContext';

export default function useUploadContext() {
  const context = useContext(UploadContext);

  return context;
}
