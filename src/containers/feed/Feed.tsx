'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { DocumentData } from 'firebase-admin/firestore';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import FeedItem from '@/components/FeedItem/FeedItem';
import TopBar from '@/components/Topbar/Topbar';
import StyledFeed, { StyledFeedList } from '@/containers/feed/StyledFeed';
import useAlbumName from '@/hooks/useAlbumName';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useWindowWidth from '@/hooks/useWindowWidth';
import getFeedsAndHandleException from '@/utils/apis';

export default function Feed({
  feeds,
  initialFetchOpts,
}: {
  feeds: DocumentData[] | null;
  initialFetchOpts: { limit: number; skip: number; pageSize: number };
}) {
  const [feedsData, setFeedsData] = useState<DocumentData[]>(feeds || []);
  const [stopToObserveFirstItem, setStopToObserveFirstItem] = useState(false);
  const [stopToObserveLastItem, setStopToObserveLastItem] = useState(false);

  const { page: nextPage, setItemToObserveRef: setLastItemToObserveRef } =
    useInfiniteScroll();
  const { page: prevPage, setItemToObserveRef: setFirstItemToObserveRef } =
    useInfiniteScroll();
  const startItemRef = useRef<HTMLLIElement | null>(null);

  const windowWidth = useWindowWidth();
  const albumName = useAlbumName();
  const { uid } = useParams<{ uid: string }>();

  const setStartFeedItemRef = (node: HTMLLIElement | null) => {
    if (node && node !== startItemRef.current) {
      startItemRef.current = node;
      node.scrollIntoView();
    }
  };

  useEffect(() => {
    if (nextPage === 1) {
      return;
    }

    (async () => {
      const feedsToAdd = await getFeedsAndHandleException({
        limit:
          initialFetchOpts.limit + initialFetchOpts.pageSize * (nextPage - 1),
        skip:
          initialFetchOpts.skip + initialFetchOpts.pageSize * (nextPage - 1),
        uid,
        albumName,
      });

      if (feedsToAdd.length < initialFetchOpts.pageSize) {
        setStopToObserveLastItem(true);
      }

      setFeedsData((prev) => [...prev, ...feedsToAdd]);
    })();
  }, [nextPage, initialFetchOpts, albumName, uid]);

  useEffect(() => {
    if (prevPage === 1) {
      return;
    }

    (async () => {
      const skip =
        initialFetchOpts.skip - initialFetchOpts.pageSize * (prevPage - 1);
      const feedsToAdd = await getFeedsAndHandleException({
        limit:
          initialFetchOpts.limit - initialFetchOpts.pageSize * (prevPage - 1),
        skip: skip > 0 ? skip : 0,
        uid,
        albumName,
      });

      if (skip <= 0) {
        setStopToObserveFirstItem(true);
      }

      setFeedsData((prev) => [...feedsToAdd, ...prev]);
    })();
  }, [prevPage, initialFetchOpts, albumName, uid]);

  return (
    <>
      {windowWidth && windowWidth <= 430 && <TopBar tit="게시물" />}
      <StyledFeed>
        {windowWidth && windowWidth > 430 && (
          <Breadcrumb
            navList={[
              { path: '/', text: 'Home' },
              { path: `/${albumName}`, text: albumName },
              { path: '', text: '게시물' },
            ]}
          />
        )}

        {feeds ? (
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

              if (i === 4 && nextPage === 1 && prevPage === 1) {
                return (
                  <FeedItem
                    key={v.id}
                    feed={v}
                    ref={setStartFeedItemRef}
                  ></FeedItem>
                );
              }

              if (prevPage !== 1 && i === 15) {
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
        ) : (
          <div>
            데이터를 불러오는 중 예기치 못한 오류가 발생했습니다. 잠시 후 다시
            시도해 주시거나 지원팀에 문의해 주세요.
          </div>
        )}
      </StyledFeed>
    </>
  );
}
