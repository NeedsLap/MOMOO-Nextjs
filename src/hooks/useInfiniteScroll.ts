import { RefCallback, useRef, useState } from 'react';

export default function useInfiniteScroll<T extends HTMLElement>() {
  const itemRef = useRef<T | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const [page, setPage] = useState(1);

  const infiniteScroll = (node: T) => {
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);

        if (observer.current) {
          observer.current.disconnect();
        }
      }
    });
    observer.current.observe(node);
  };

  const setItemToObserveRef: RefCallback<T> = node => {
    if (node && node !== itemRef.current) {
      itemRef.current = node;
      setTimeout(() => {
        infiniteScroll(node);
      }, 0);
    }
  };

  return { page, setItemToObserveRef };
}
