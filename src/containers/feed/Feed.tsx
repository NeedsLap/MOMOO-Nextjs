'use client';

import { useParams } from 'next/navigation';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import TopBar from '@/components/Topbar/Topbar';
import FeedList from '@/containers/feed/FeedList/FeedList';
import StyledFeed from '@/containers/feed/StyledFeed';
import useAlbumName from '@/hooks/useAlbumName';
import useWindowWidth from '@/hooks/useWindowWidth';

import { Feed as FeedType } from '@/types/feed';

export default function Feed({ feeds }: { feeds: FeedType[] }) {
  const windowWidth = useWindowWidth();
  const albumName = useAlbumName();
  const { uid } = useParams<{ uid: string }>();

  return (
    <>
      {windowWidth && windowWidth <= 430 && <TopBar tit="게시물" />}
      <StyledFeed>
        {windowWidth && windowWidth > 430 && <h2 className="a11y-hidden">게시물</h2>}
        {windowWidth && windowWidth > 1024 && (
          <Breadcrumb
            navList={[
              { path: '/', text: 'Home' },
              { path: `/${uid}/album/${albumName}`, text: albumName },
              { path: '', text: '게시물' }
            ]}
          />
        )}

        <FeedList feeds={feeds} />
      </StyledFeed>
    </>
  );
}
