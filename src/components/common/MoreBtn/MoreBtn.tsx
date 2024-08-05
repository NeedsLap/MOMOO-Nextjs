import Image from 'next/image';
import { ButtonHTMLAttributes } from 'react';

import * as Styled from '@/components/common/MoreBtn/StyledMoreBtn';

interface MoreBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleOnClick: () => void;
  color?: 'white';
}

export default function MoreBtn({ handleOnClick, color, ...props }: MoreBtnProps) {
  return (
    <Styled.MoreBtn aria-label="더보기" type="button" onClick={handleOnClick} {...props}>
      <Image
        width={20}
        height={20}
        alt=""
        src={color === 'white' ? '/icons/more-white.svg' : '/icons/more.svg'}
      />
    </Styled.MoreBtn>
  );
}
