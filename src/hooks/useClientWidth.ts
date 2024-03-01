import { useEffect, useState } from 'react';

export default function useClientWidth() {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );

  useEffect(() => {
    const changeClientWidth = () => {
      setClientWitch(document.documentElement.clientWidth);
    };

    window.addEventListener('resize', changeClientWidth);

    return window.removeEventListener('resize', changeClientWidth);
  }, []);

  return clientWitch;
}
