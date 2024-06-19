import { useEffect, useState } from 'react';

import StyledToast from '@/components/Toast/StyledToast';

export default function Toast({ message }: { message: string }) {
  const [timeOver, setTimeOver] = useState(false);

  useEffect(() => {
    setTimeOver(false);

    setTimeout(() => {
      setTimeOver(true);
    }, 3000);
  }, [message]);

  return <>{!timeOver && <StyledToast role="alert">{message}</StyledToast>}</>;
}
