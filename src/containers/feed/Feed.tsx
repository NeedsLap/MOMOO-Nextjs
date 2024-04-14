'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import FeedItem from '@/components/FeedItem/FeedItem';
import Toast from '@/components/Toast/Toast';
import TopBar from '@/components/Topbar/Topbar';
import StyledFeed, { StyledFeedList } from '@/containers/feed/StyledFeed';
import useAlbumName from '@/hooks/useAlbumName';
import useGetFeeds from '@/hooks/useGetFeeds';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useWindowWidth from '@/hooks/useWindowWidth';

import { Feed as FeedType } from '@/types/feed';

export default function Feed({
  feeds,
  pageSize,
}: {
  feeds: FeedType[] | undefined;
  pageSize: number;
}) {
  const { page: nextPage, setItemToObserveRef: setLastItemToObserveRef } =
    useInfiniteScroll();
  const { page: prevPage, setItemToObserveRef: setFirstItemToObserveRef } =
    useInfiniteScroll();
  const startItemRef = useRef<HTMLLIElement | null>(null);

  const windowWidth = useWindowWidth();
  const albumName = useAlbumName();
  const { error, getFeeds } = useGetFeeds();

  const { uid } = useParams<{ uid: string }>();
  const searchParams = useSearchParams();
  const start = parseInt(searchParams.get('start') || '0');

  const [feedsData, setFeedsData] = useState<FeedType[]>(feeds || []);
  const [stopToObserveFirstItem, setStopToObserveFirstItem] = useState(!start);
  const [stopToObserveLastItem, setStopToObserveLastItem] = useState(false);
  const [startFeedItemIndex, setStartFeedItemIndex] = useState(0);

  const setStartFeedItemRef = (node: HTMLLIElement | null) => {
    if (windowWidth && node && node !== startItemRef.current) {
      startItemRef.current = node;
      const paddingTop = windowWidth > 1024 ? 100 : windowWidth > 430 ? 80 : 48;
      window.scrollTo(0, node.getBoundingClientRect().y - paddingTop);
    }
  };

  useEffect(() => {
    if (nextPage === 1) {
      return;
    }

    (async () => {
      const feedsToAdd = await getFeeds({
        limit: start + pageSize * nextPage,
        skip: start + pageSize * (nextPage - 1),
        uid,
        albumName,
      });

      if (!feedsToAdd) {
        return;
      }

      if (feedsToAdd.length < pageSize) {
        setStopToObserveLastItem(true);
      }

      setFeedsData((prev) => [...prev, ...feedsToAdd]);
    })();
  }, [nextPage]);

  useEffect(() => {
    if (prevPage === 1) {
      return;
    }

    (async () => {
      const skip = start - pageSize * (prevPage - 1);
      const feedsToAdd = await getFeeds({
        limit: start - pageSize * (prevPage - 2),
        skip: skip > 0 ? skip : 0,
        uid,
        albumName,
      });

      if (skip <= 0) {
        setStopToObserveFirstItem(true);
      }

      if (feedsToAdd) {
        setFeedsData((prev) => [...feedsToAdd, ...prev]);
        setStartFeedItemIndex(feedsToAdd.length);
      }
    })();
  }, [prevPage]);

  return (
    <>
      {windowWidth && windowWidth <= 430 && <TopBar tit="게시물" />}
      <StyledFeed>
        {(!feeds || error) && (
          <Toast message="데이터를 불러오는 중 에러가 발생했습니다" />
        )}
        {windowWidth && windowWidth > 430 && (
          <h2 className="a11y-hidden">게시물</h2>
        )}
        {windowWidth && windowWidth > 1024 && (
          <Breadcrumb
            navList={[
              { path: '/', text: 'Home' },
              { path: `/${albumName}`, text: albumName },
              { path: '', text: '게시물' },
            ]}
          />
        )}

        {feeds && (
          <StyledFeedList>
            {feedsData.map((v, i) => {
              if (!stopToObserveLastItem && i === feedsData.length - 1) {
                return (
                  <FeedItem
                    key={v.id}
                    feed={v}
                    ref={setLastItemToObserveRef}
                  ></FeedItem>
                );
              }

              if (!stopToObserveFirstItem && i === 0) {
                return (
                  <FeedItem
                    key={v.id}
                    feed={v}
                    ref={setFirstItemToObserveRef}
                  ></FeedItem>
                );
              }

              if (
                prevPage !== 1 &&
                startFeedItemIndex &&
                i === startFeedItemIndex
              ) {
                return (
                  <FeedItem
                    key={v.id}
                    feed={v}
                    ref={setStartFeedItemRef}
                  ></FeedItem>
                );
              }

              return <FeedItem key={v.id} feed={v}></FeedItem>;
            })}
          </StyledFeedList>
        )}
      </StyledFeed>
    </>
  );
}
