import Image from 'next/image';

import StyledPrevBtn from '@/components/Feed/Carousel/NavBtns/PrevBtn/StyledPrevBtn';

import PrevBtnProps from '@/components/Feed/Carousel/NavBtns/PrevBtn/model';

function PrevBtn({ goToPrevSlide, style }: PrevBtnProps) {
  return (
    <StyledPrevBtn type="button" onClick={goToPrevSlide} aria-label="뒤로가기" style={style}>
      <Image src="/icons/arrow-white.svg" width={24} height={24} alt="" />
    </StyledPrevBtn>
  );
}

export default PrevBtn;
