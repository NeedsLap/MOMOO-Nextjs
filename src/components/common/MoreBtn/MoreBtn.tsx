import Image from 'next/image';

import StyledMoreBtn from '@/components/common/MoreBtn/StyledMoreBtn';

import MoreBtnProps from '@/components/common/MoreBtn/model';

export default function MoreBtn({ handleOnClick, color, style }: MoreBtnProps) {
  return (
    <StyledMoreBtn aria-label="더보기" type="button" onClick={handleOnClick} style={style}>
      <Image
        width={20}
        height={20}
        alt=""
        src={color === 'white' ? '/icons/more-white.svg' : '/icons/more.svg'}
      />
    </StyledMoreBtn>
  );
}
