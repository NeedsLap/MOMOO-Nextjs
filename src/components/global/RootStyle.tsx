'use client';

import GlobalStyle from '@/components/global/GlobalStyle';
import StyledComponentsRegistry from '@/components/global/StyledComponentsRegistry';

export default function RootStyle({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      {children}
    </StyledComponentsRegistry>
  );
}
