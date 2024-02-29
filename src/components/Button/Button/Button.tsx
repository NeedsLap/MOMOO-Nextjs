import React from 'react';

import { BtnStyle } from '@/components/Button/Button/StyledButton';

interface ButtonProps {
  children: React.ReactNode;
  size?: 'l' | 'm' | 's' | 'xs';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <BtnStyle {...props}>{children}</BtnStyle>;
};

export default Button;
