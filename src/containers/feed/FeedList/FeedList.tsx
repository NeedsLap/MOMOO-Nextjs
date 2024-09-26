'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { forwardRef, HTMLProps, useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import Toast from '@/components/Toast/Toast';
import PAGE_SIZE from '@/constants/feed';
import FeedItem from '@/containers/feed/FeedItem';
import StyledFeedList from '@/containers/feed/FeedList/StyledFeedList';
import useAlbumName from '@/hooks/useAlbumName';
import useGetFeeds from '@/hooks/useGetFeeds';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useUploadFeed from '@/hooks/useUploadFeed';
import useWindowWidth from '@/hooks/useWindowWidth';
import { resetUploadFeedModalState } from '@/modules/uploadFeedModal';

import { NonNegativeInteger } from '@/types/common';
import { Feed } from '@/types/feed';

const List = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>((props, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledFeedList role="list" ref={ref} {...props} />;
});
const Item = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div role="listitem" ref={ref} {...props} />
));

export default function FeedList({ feeds }: { feeds: Feed[] }) {
  const { page: nextPage, setItemToObserveRef: setLastItemToObserveRef } = useInfiniteScroll();
  const { page: prevPage, setItemToObserveRef: setFirstItemToObserveRef } = useInfiniteScroll();

  const windowWidth = useWindowWidth();
  const albumName = useAlbumName();
  const { error, getFeeds } = useGetFeeds();
  const { shouldUpdateFeedsData } = useUploadFeed();

  const dispatch = useDispatch();
  const { uid } = useParams<{ uid: string }>();
  const searchParams = useSearchParams();
  const start = parseInt(searchParams.get('start') || '0', 10) as NonNegativeInteger;

  const [feedsData, setFeedsData] = useState(feeds);
  const [stopToObserveFirstItem, setStopToObserveFirstItem] = useState(!start);
  const [stopToObserveLastItem, setStopToObserveLastItem] = useState(false);
  const [startFeedItemIndex, setStartFeedItemIndex] = useState<null | number>(null);

  const virtuosoRef = useRef<null | VirtuosoHandle>(null);

  useEffect(
    function scrollToItem() {
      if (!windowWidth || startFeedItemIndex === null) {
        return;
      }

      let offset;

      if (windowWidth > 1024) {
        offset = -100;
      } else if (windowWidth > 430) {
        offset = -80;
      } else {
        offset = -48;
      }

      setTimeout(() => {
        if (virtuosoRef.current) {
          virtuosoRef.current.scrollToIndex({
            index: startFeedItemIndex,
            align: 'start',
            behavior: 'auto',
            offset
          });
        }
      }, 0);
    },
    [startFeedItemIndex, windowWidth]
  );

  useEffect(() => {
    if (!shouldUpdateFeedsData) {
      return;
    }

    const updateFeedsData = async () => {
      const feedToAdd = await getFeeds({
        limit: 1,
        skip: 0,
        uid,
        albumName
      });

      if (feedToAdd && feedToAdd.length) {
        setFeedsData(prev => [...feedToAdd, ...prev]);
      }
    };

    updateFeedsData();
    dispatch(resetUploadFeedModalState());
  }, [shouldUpdateFeedsData]);

  useEffect(() => {
    if (nextPage === 1) {
      return;
    }

    (async () => {
      const feedsToAdd = await getFeeds({
        limit: start + PAGE_SIZE * nextPage,
        skip: start + PAGE_SIZE * (nextPage - 1),
        uid,
        albumName
      });

      if (!feedsToAdd) {
        return;
      }

      if (feedsToAdd.length < PAGE_SIZE) {
        setStopToObserveLastItem(true);
      }

      setFeedsData(prev => [...prev, ...feedsToAdd]);
    })();
  }, [nextPage]);

  useEffect(() => {
    if (prevPage === 1) {
      return;
    }

    (async () => {
      const skip = start - PAGE_SIZE * (prevPage - 1);
      const feedsToAdd = await getFeeds({
        limit: start - PAGE_SIZE * (prevPage - 2),
        skip: skip > 0 ? skip : 0,
        uid,
        albumName
      });

      if (skip <= 0) {
        setStopToObserveFirstItem(true);
      }

      if (feedsToAdd) {
        setFeedsData(prev => [...feedsToAdd, ...prev]);
        setStartFeedItemIndex(feedsToAdd.length);
      }
    })();
  }, [prevPage]);

  const itemContent = (i: number, v: Feed) => {
    if (!stopToObserveLastItem && i === feedsData.length - 1) {
      return (
        <FeedItem setFeedsData={setFeedsData} key={v.id} feed={v} ref={setLastItemToObserveRef} />
      );
    }

    if (!stopToObserveFirstItem && i === 0) {
      return (
        <FeedItem setFeedsData={setFeedsData} key={v.id} feed={v} ref={setFirstItemToObserveRef} />
      );
    }

    return <FeedItem setFeedsData={setFeedsData} key={v.id} feed={v} />;
  };

  return error ? (
    <Toast message="데이터를 불러오는 중 에러가 발생했습니다" />
  ) : (
    <Virtuoso
      ref={virtuosoRef}
      useWindowScroll
      data={feedsData}
      itemContent={itemContent}
      components={{
        List,
        Item
      }}
    />
  );
}
