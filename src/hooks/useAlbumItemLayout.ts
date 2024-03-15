import { useEffect, useState } from 'react';

import useWindowWidth from '@/hooks/useWindowWidth';

interface ImgSize {
  width: number;
  height: number;
}

export default function useAlbumItemLayout(node: HTMLLIElement | null) {
  const [imgSize, setImgSize] = useState<ImgSize | null>(null);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const setLayout = async () => {
      if (!imgSize || !windowWidth || !node) {
        return;
      }

      const height = node.clientWidth * (imgSize.height / imgSize.width);

      if (windowWidth > 430) {
        node.style.gridRowEnd = `span ${Math.round(height + 16)}`;
      } else {
        node.style.gridRowEnd = `span ${Math.round(height + 12)}`;
      }

      node.style.border = '1px solid var(--gray-100)';
    };

    setLayout();
  }, [windowWidth, imgSize, node]);

  return { setImgSize };
}
