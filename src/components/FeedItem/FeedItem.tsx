import { Dispatch, ForwardedRef, forwardRef, SetStateAction } from 'react';

import FeedContent from '@/components/FeedItem/FeedContent';
import StyledFeedItem from '@/components/FeedItem/StyledFeedItem';

import type { Feed } from '@/types/feed';

function FeedItem(
  { feed, setFeedsData }: { feed: Feed; setFeedsData: Dispatch<SetStateAction<Feed[]>> },
  ref: ForwardedRef<HTMLLIElement>
) {
  return (
    <StyledFeedItem>
      <FeedContent ref={ref}>
        <FeedContent.Carousel imgUrlList={feed.imageUrl} style={{ marginBottom: '12px' }} />
        <FeedContent.Icons emotion={feed.emotionImage} weather={feed.weatherImage} />
        <FeedContent.More feed={feed} setFeedsData={setFeedsData} />
        <FeedContent.Title title={feed.title} />
        <FeedContent.Content text={feed.text} />
        <FeedContent.Background millis={feed.timestamp} address={feed.selectedAddress} />
      </FeedContent>
    </StyledFeedItem>
  );
}
export default forwardRef(FeedItem);
