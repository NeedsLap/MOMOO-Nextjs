'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import AlbumItem from '@/components/AlbumItem/AlbumItem';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import BreadcrumbWrap from '@/components/Breadcrumb/BreadcrumbWrap';
import StyledH2 from '@/components/CommonStyled/StyledH2';
import Toast from '@/components/Toast/Toast';
import AlbumDetailTopBar from '@/components/Topbar/AlbumDetailTopbar';
import StyledAlbum, {
  StyledAddFeed,
  StyledFeedList,
} from '@/containers/albumDetail/StyledAlbumDetail';
import useAlbumName from '@/hooks/useAlbumName';
import useGetFeeds from '@/hooks/useGetFeeds';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useUploadFeedModalWithWebView from '@/hooks/useUploadFeedModalWithWebView';
import useWindowWidth from '@/hooks/useWindowWidth';

import type { Feed } from '@/types/feed';

export default function AlbumDetail({
  feeds,
  pageSize,
}: {
  feeds: Feed[] | undefined;
  pageSize: number;
}) {
  const albumName = useAlbumName();
  const windowWidth = useWindowWidth();
  const { page, setItemToObserveRef } = useInfiniteScroll();
  const { openModal } = useUploadFeedModalWithWebView();

  const { uid } = useParams<{ uid: string }>();

  const [feedsData, setFeedsData] = useState<Feed[]>(feeds || []);
  const { error, getFeeds } = useGetFeeds();

  const openUploadModal = () => {
    if (albumName !== '전체 보기') {
      openModal(['전체 보기', albumName]);
    } else {
      openModal(['전체 보기']);
    }
  };

  useEffect(() => {
    if (page === 1) {
      return;
    }

    (async () => {
      const feedsToAdd = await getFeeds({
        limit: pageSize * page,
        skip: pageSize * page - pageSize,
        uid,
        albumName,
      });

      if (feedsToAdd) {
        setFeedsData((prev) => [...prev, ...feedsToAdd]);
      }
    })();
  }, [page]);

  return (
    <>
      {windowWidth && windowWidth <= 430 && (
        <AlbumDetailTopBar tit={albumName} openUploadModal={openUploadModal} />
      )}
      <StyledAlbum>
        {(!feeds || error) && (
          <Toast message="데이터를 불러오는 중 에러가 발생했습니다" />
        )}
        {windowWidth && windowWidth > 1024 && (
          <>
            <h1 className="a11y-hidden">MOMOO</h1>
            <StyledH2>{albumName}</StyledH2>
            <Breadcrumb
              navList={[
                { path: '/', text: 'Home' },
                { path: '', text: albumName },
              ]}
            />
          </>
        )}
        {windowWidth && windowWidth > 430 && windowWidth <= 1024 && (
          <BreadcrumbWrap
            navList={[
              { path: '/', text: 'Home' },
              { path: '', text: albumName },
            ]}
            title={albumName}
          />
        )}

        {windowWidth && windowWidth > 430 && (
          <StyledAddFeed>
            <button
              type="button"
              aria-label="사진 추가하기"
              onClick={openUploadModal}
            >
              <Image width={24} height={24} src="/icons/add-l.svg" alt="" />
            </button>
          </StyledAddFeed>
        )}

        <section>
          <h3 className="a11y-hidden">게시글 목록</h3>
          {feeds && (
            <StyledFeedList>
              {feedsData.map((v, i) => {
                return (
                  <AlbumItem
                    key={v.id}
                    index={i}
                    feed={v}
                    ref={
                      i === feedsData.length - 1 ? setItemToObserveRef : null
                    }
                  ></AlbumItem>
                );
              })}
            </StyledFeedList>
          )}
        </section>
      </StyledAlbum>
    </>
  );
}
