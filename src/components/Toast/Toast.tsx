import { useEffect } from 'react';

import { toast } from 'react-toastify';

import StyledToast from '@/components/Toast/StyledToast';

import 'react-toastify/dist/ReactToastify.css';

export default function Toast({ message }: { message: string }) {
  useEffect(() => {
    if (message) {
      toast(message);
    }
  }, [message]);

  return (
    <StyledToast
      position="bottom-center"
      closeButton={false}
      hideProgressBar={true}
    />
  );
}
