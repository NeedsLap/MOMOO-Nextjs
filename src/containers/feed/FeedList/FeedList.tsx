'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';

import FeedItem from '@/components/FeedItem/FeedItem';
import Toast from '@/components/Toast/Toast';
import PAGE_SIZE from '@/constants/feed';
import StyledFeedList from '@/containers/feed/FeedList/StyledFeedList';
import useAlbumName from '@/hooks/useAlbumName';
import useGetFeeds from '@/hooks/useGetFeeds';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useUploadFeed from '@/hooks/useUploadFeed';
import useWindowWidth from '@/hooks/useWindowWidth';
import { resetUploadFeedModalState } from '@/modules/uploadFeedModal';

import { Feed } from '@/types/feed';

export default function FeedList({ feeds }: { feeds: Feed[] }) {
  const { page: nextPage, setItemToObserveRef: setLastItemToObserveRef } = useInfiniteScroll();
  const { page: prevPage, setItemToObserveRef: setFirstItemToObserveRef } = useInfiniteScroll();
  const startItemRef = useRef<HTMLLIElement | null>(null);

  const windowWidth = useWindowWidth();
  const albumName = useAlbumName();
  const { error, getFeeds } = useGetFeeds();
  const { shouldUpdateFeedsData } = useUploadFeed();

  const dispatch = useDispatch();
  const { uid } = useParams<{ uid: string }>();
  const searchParams = useSearchParams();
  const start = parseInt(searchParams.get('start') || '0', 10);

  const [feedsData, setFeedsData] = useState(feeds);
  const [stopToObserveFirstItem, setStopToObserveFirstItem] = useState(!start);
  const [stopToObserveLastItem, setStopToObserveLastItem] = useState(false);
  const [startFeedItemIndex, setStartFeedItemIndex] = useState(0);

  const getFeedGap = () => {
    if (windowWidth && windowWidth > 1024) {
      return 100;
    }
    if (windowWidth && windowWidth > 430) {
      return 80;
    }

    return 48;
  };

  const setStartFeedItemRef = (node: HTMLLIElement | null) => {
    if (node && node !== startItemRef.current) {
      startItemRef.current = node;
      const paddingTop = getFeedGap();
      window.scrollTo(0, node.getBoundingClientRect().y - paddingTop);
    }
  };

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

  return error ? (
    <Toast message="데이터를 불러오는 중 에러가 발생했습니다" />
  ) : (
    <StyledFeedList>
      {feedsData.map((v, i) => {
        if (!stopToObserveLastItem && i === feedsData.length - 1) {
          return (
            <FeedItem
              setFeedsData={setFeedsData}
              key={v.id}
              feed={v}
              ref={setLastItemToObserveRef}
            />
          );
        }

        if (!stopToObserveFirstItem && i === 0) {
          return (
            <FeedItem
              setFeedsData={setFeedsData}
              key={v.id}
              feed={v}
              ref={setFirstItemToObserveRef}
            />
          );
        }

        if (prevPage !== 1 && startFeedItemIndex && i === startFeedItemIndex) {
          return (
            <FeedItem setFeedsData={setFeedsData} key={v.id} feed={v} ref={setStartFeedItemRef} />
          );
        }

        return <FeedItem setFeedsData={setFeedsData} key={v.id} feed={v} />;
      })}
    </StyledFeedList>
  );
}
