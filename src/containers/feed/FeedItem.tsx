import { Dispatch, ForwardedRef, forwardRef, SetStateAction } from 'react';

import Feed from '@/components/Feed/Feed';

import type { Feed as FeedType, FeedTest } from '@/types/feed';

function FeedItem(
  { feed, setFeedsData }: { feed: FeedType; setFeedsData: Dispatch<SetStateAction<FeedTest[]>> },
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref}>
      <Feed>
        <Feed.Carousel imgUrlList={feed.imageUrl} style={{ marginBottom: '12px' }} />
        <Feed.Icons emotion={feed.emotionImage} weather={feed.weatherImage} />
        <Feed.More feed={feed} setFeedsData={setFeedsData} />
        <Feed.Title title={feed.title} />
        <Feed.Content text={feed.text} />
        <Feed.Background millis={feed.timestamp} address={feed.selectedAddress} />
      </Feed>
    </div>
  );
}

export default forwardRef(FeedItem);
