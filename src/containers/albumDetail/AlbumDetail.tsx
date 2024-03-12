'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// import useSetAlbumData from './useSetAlbumData';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { DocumentData } from 'firebase/firestore';

import AlbumItem from '@/components/AlbumItem/AlbumItem';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import BreadcrumbWrap from '@/components/Breadcrumb/BreadcrumbWrap';
import StyledH2 from '@/components/CommonStyled/StyledH2';
import LoadingComponent from '@/components/Loading/LoadingComponent';
import AlbumDetailTopBar from '@/components/Topbar/AlbumDetailTopbar';
import StyledAlbum, {
  StyledAddFeed,
  StyledFeedList,
} from '@/containers/albumDetail/StyledAlbumDetail';
// ]import useUploadContext from '@/hooks/useUploadContext';
import useAlbumName from '@/hooks/useAlbumName';
import useWindowWidth from '@/hooks/useWindowWidth';
import { getFeeds } from '@/services/feed';

export default function AlbumDetail({
  feeds,
}: {
  feeds: DocumentData[] | null;
}) {
  const albumName = useAlbumName();
  const windowWidth = useWindowWidth();
  const lastAlbumItemRef = useRef<HTMLLIElement | null>();
  const observer = useRef<IntersectionObserver | null>(null);
  const [page, setPage] = useState(1);
  const { uid } = useParams<{ uid: string }>();
  // const router = useRouter();
  //   const { setAlbumNameListToAdd, setIsUploadModalOpen } = useUploadContext();
  const [feedsData, setFeedsData] = useState<DocumentData[]>(feeds || []);
  const openUploadModal = () => {
    // if (album !== '전체 보기') {
    //   setAlbumNameListToAdd(['전체 보기', album]);
    // }
    // if (windowWidth > 430) {
    //   setIsUploadModalOpen(true);
    // } else {
    //   router.push('/upload');
    // }
  };

  useEffect(() => {
    if (page === 1) {
      return;
    }

    const getFeedsData = async () => {
      try {
        const res = await getFeeds({
          limit: 15 * page,
          skip: 15 * page - 15,
          uid,
          albumName,
        });

        if (!res.ok) {
          if (res.status === 403 || res.status === 404 || res.status === 401) {
            console.error(new Error(await res.text()));
            return 'not-found';
          }
        }
        return await res.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    (async () => {
      const feedsToAdd = await getFeedsData();
      setFeedsData((prev) => [...prev, ...feedsToAdd]);
    })();
  }, [page]);

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
  const setLastAlbumItemRef = (node: HTMLLIElement) => {
    if (node && node !== lastAlbumItemRef.current) {
      lastAlbumItemRef.current = node;
      infiniteScroll(node);
    }
  };

  return (
    <>
      {windowWidth && windowWidth <= 430 && (
        <AlbumDetailTopBar tit={albumName} openUploadModal={openUploadModal} />
      )}
      <StyledAlbum>
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
          {!feeds && <LoadingComponent />}
          {feeds && (
            <StyledFeedList>
              {feedsData.length > 0 &&
                feedsData.map((v, i) => {
                  if (i === feedsData.length - 1) {
                    return (
                      <AlbumItem
                        key={v.id}
                        feedData={v}
                        ref={setLastAlbumItemRef}
                      ></AlbumItem>
                    );
                  }
                  return <AlbumItem key={v.id} feedData={v}></AlbumItem>;
                })}
            </StyledFeedList>
          )}
        </section>
      </StyledAlbum>
    </>
  );
}
