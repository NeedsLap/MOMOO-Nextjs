import React from 'react';

import { BtnStyle } from '@/components/Button/StyledButton';

import ButtonProps from '@/components/Button/model';

export default function Button({ children, size, disabled }: ButtonProps) {
  return (
    <BtnStyle size={size} disabled={disabled}>
      {children}
    </BtnStyle>
  );
}
