'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// import useSetAlbumData from './useSetAlbumData';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useWindowWidth from '@/hooks/useWindowWidth';
import getFeedsAndHandleException from '@/utils/apis';

export default function AlbumDetail({
  feeds,
  pageSize,
}: {
  feeds: DocumentData[] | null;
  pageSize: number;
}) {
  const albumName = useAlbumName();
  const windowWidth = useWindowWidth();
  const { page, setItemToObserveRef } = useInfiniteScroll();
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

    (async () => {
      const feedsToAdd = await getFeedsAndHandleException({
        limit: pageSize * page,
        skip: pageSize * page - pageSize,
        uid,
        albumName,
      });
      setFeedsData((prev) => [...prev, ...feedsToAdd]);
    })();
  }, [page]);

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
              {feedsData.map((v, i) => {
                if (i === feedsData.length - 1) {
                  return (
                    <AlbumItem
                      key={v.id}
                      index={i}
                      feedData={v}
                      ref={
                        i === feedsData.length - 1 ? setItemToObserveRef : null
                      }
                    ></AlbumItem>
                  );
                }
              })}
            </StyledFeedList>
          )}
        </section>
      </StyledAlbum>
    </>
  );
}
