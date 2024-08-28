'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';

import FeedItem from '@/components/FeedItem/FeedItem';
import Toast from '@/components/Toast/Toast';
import { OFFSET_FROM_START, PAGE_SIZE } from '@/constants/feed';
import StyledFeedList from '@/containers/feed/FeedList/StyledFeedList';
import useAlbumName from '@/hooks/useAlbumName';
import useGetFeeds from '@/hooks/useGetFeeds';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useUploadFeed from '@/hooks/useUploadFeed';
import useWindowWidth from '@/hooks/useWindowWidth';
import { resetUploadFeedModalState } from '@/modules/uploadFeedModal';
import getInitialSkip from '@/utils/page/feed';

import { NonNegativeInteger } from '@/types/common';
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
  const start = parseInt(searchParams.get('start') || '0', 10) as NonNegativeInteger;
  const initialSkip = getInitialSkip(start);

  const [feedsData, setFeedsData] = useState(feeds);
  const [stopToObserveFirstItem, setStopToObserveFirstItem] = useState(!initialSkip);
  const [stopToObserveLastItem, setStopToObserveLastItem] = useState(false);
  const [startFeedItemIndex, setStartFeedItemIndex] = useState(
    start > OFFSET_FROM_START ? OFFSET_FROM_START : start
  );

  const getFeedGap = () => {
    if (windowWidth && windowWidth > 1024) {
      return 0;
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
      setTimeout(() => {
        window.scrollTo(0, node.getBoundingClientRect().y - paddingTop);
      }, 0);
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
        limit: initialSkip + PAGE_SIZE * nextPage,
        skip: initialSkip + PAGE_SIZE * (nextPage - 1),
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
      const skip = initialSkip - PAGE_SIZE * (prevPage - 1);
      const feedsToAdd = await getFeeds({
        limit: initialSkip - PAGE_SIZE * (prevPage - 2),
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
    if (startFeedItemIndex && i === startFeedItemIndex) {
      return <FeedItem setFeedsData={setFeedsData} key={v.id} feed={v} ref={setStartFeedItemRef} />;
    }

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
    <StyledFeedList>
      <Virtuoso
        customScrollParent={document.documentElement}
        data={feedsData}
        itemContent={itemContent}
      />
    </StyledFeedList>
  );
}
