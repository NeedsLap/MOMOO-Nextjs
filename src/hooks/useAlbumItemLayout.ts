import { useEffect, useState } from 'react';

import useWindowWidth from '@/hooks/useWindowWidth';

interface ImgSize {
  width: number;
  height: number;
}

export default function useAlbumItemLayout(node: HTMLLIElement | null) {
  const [imgSize, setImgSize] = useState<ImgSize | null>(null);
  const [gridRowEnd, setGridRowEnd] = useState('');
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const setLayout = async () => {
      if (!imgSize || !windowWidth || !node) {
        return;
      }

      const height = node.clientWidth * (imgSize.height / imgSize.width);

      if (windowWidth > 430) {
        setGridRowEnd(`span ${Math.round(height + 16)}`);
      } else {
        setGridRowEnd(`span ${Math.round(height + 12)}`);
      }
    };

    setLayout();
  }, [imgSize]);

  return { setImgSize, gridRowEnd };
}
