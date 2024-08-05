import {
  StyledIndicatorItem,
  StyledIndicatorList
} from '@/components/FeedItem/Carousel/Indicator/StyledIndicator';

import IndicatorProps from '@/components/FeedItem/Carousel/Indicator/model';

export default function Indicator({ imgUrlList, currIndex, updateCurrIndex }: IndicatorProps) {
  return (
    <StyledIndicatorList>
      {imgUrlList.map((imgUrl, i) => (
        <StyledIndicatorItem key={imgUrl} className={i === currIndex ? 'active' : ''}>
          <button
            type="button"
            onClick={() => updateCurrIndex(i)}
            aria-label={`${imgUrlList.length}개 중 ${i + 1}번`}
          />
        </StyledIndicatorItem>
      ))}
    </StyledIndicatorList>
  );
}
