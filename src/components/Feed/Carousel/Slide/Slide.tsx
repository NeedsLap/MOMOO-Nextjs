import Image from 'next/image';
import { ForwardedRef, forwardRef } from 'react';

import StyledSlide from '@/components/Feed/Carousel/Slide/StyledSlice';

import SlideProps from '@/components/Feed/Carousel/Slide/model';

function Slide(
  { startDragging, dragSlide, endDragging, imgUrlList, style }: SlideProps,
  ref: ForwardedRef<HTMLUListElement>
) {
  return (
    <StyledSlide
      ref={ref}
      onTouchStart={startDragging}
      onTouchMove={dragSlide}
      onTouchEnd={endDragging}
      style={style}
    >
      {imgUrlList.map(imgUrl => (
        <li key={imgUrl}>
          <Image
            src={imgUrl}
            width={0}
            height={0}
            sizes=" 500px
                (max-width: 431px) calc(100vw - 48px),
               (max-width: 430px) calc(100vw - 32px)"
            alt="사진"
          />
        </li>
      ))}
    </StyledSlide>
  );
}
export default forwardRef(Slide);
