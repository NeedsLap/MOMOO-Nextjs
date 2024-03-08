'use client';

import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// import useSetAlbumData from './useSetAlbumData';

import { DocumentData } from 'firebase/firestore';

import AlbumItem from '@/components/AlbumItem/AlbumItem';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import BreadcrumbWrap from '@/components/Breadcrumb/BreadcrumbWrap';
import StyledH2 from '@/components/CommonStyled/StyledH2';
import LoadingComponent from '@/components/Loading/LoadingComponent';
import StyledAlbum, {
  StyledAddFeed,
  StyledFeedList,
} from '@/containers/albumDetail/StyledAlbumDetail';
// ]import useUploadContext from '@/hooks/useUploadContext';
import useAlbumName from '@/hooks/useAlbumName';
import useWindowWidth from '@/hooks/useWindowWidth';
import AlbumDetailTopBar from '@/components/Topbar/AlbumDetailTopbar';

export default function AlbumDetail({
  feeds,
}: {
  feeds: DocumentData[] | null;
}) {
  const albumName = useAlbumName();
  const windowWidth = useWindowWidth();
  // const router = useRouter();
  //   const { setAlbumNameListToAdd, setIsUploadModalOpen } = useUploadContext();
  // const [feedsData, setFeedsData] = useState<DocumentData[] | null>(feeds);
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
              {feeds.length > 0 &&
                feeds.map((v) => {
                  return <AlbumItem key={v.id} feedData={v}></AlbumItem>;
                })}
            </StyledFeedList>
          )}
        </section>
      </StyledAlbum>
    </>
  );
}
