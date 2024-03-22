import { useRef, useState } from 'react';

export default function useInfiniteScroll() {
  const itemRef = useRef<HTMLLIElement | null>();
  const observer = useRef<IntersectionObserver | null>(null);
  const [page, setPage] = useState(1);

  const infiniteScroll = (node: HTMLLIElement) => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => ++prev);

        if (observer.current) {
          observer.current.disconnect();
        }
      }
    });
    observer.current.observe(node);
  };

  const setItemToObserveRef = (node: HTMLLIElement) => {
    if (node && node !== itemRef.current) {
      itemRef.current = node;
      infiniteScroll(node);
    }
  };

  return { page, setItemToObserveRef };
}
