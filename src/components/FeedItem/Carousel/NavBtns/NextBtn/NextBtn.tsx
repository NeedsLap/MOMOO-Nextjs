import Image from 'next/image';

import StyledNextBtn from '@/components/FeedItem/Carousel/NavBtns/NextBtn/StyledNextBtn';

import NextBtnProps from '@/components/FeedItem/Carousel/NavBtns/NextBtn/model';

export default function NextBtn({ goToNextSlide, style }: NextBtnProps) {
  return (
    <StyledNextBtn type="button" onClick={goToNextSlide} aria-label="앞으로가기" style={style}>
      <Image src="/icons/arrow-white.svg" width={24} height={24} alt="" />
    </StyledNextBtn>
  );
}
