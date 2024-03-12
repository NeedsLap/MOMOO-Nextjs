'use client';

import { useParams } from 'next/navigation';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import FeedItem from '@/components/FeedItem/FeedItem';
import TopBar from '@/components/Topbar/Topbar';
import StyledFeed from '@/containers/feed/StyledFeed';
import useWindowWidth from '@/hooks/useWindowWidth';

export default function Feed() {
  const windowWidth = useWindowWidth();

  const { albumName } = useParams<{ albumName: string }>();

  return (
    <>
      {windowWidth && windowWidth <= 430 && <TopBar tit="게시물" />}
      <StyledFeed>
        {windowWidth && windowWidth > 430 && (
          <Breadcrumb
            navList={[
              { path: '/', text: 'Home' },
              { path: `/${albumName}`, text: albumName },
              { path: '', text: 'feed' },
            ]}
          />
        )}
        <section>
          <FeedItem />
        </section>
      </StyledFeed>
    </>
  );
}
