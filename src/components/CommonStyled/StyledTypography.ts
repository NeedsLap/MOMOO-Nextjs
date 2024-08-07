import styled from 'styled-components';

import { FontWeight, Headline, Text, Title } from '@/types/designToken';

const StyledHeadline = styled.span<{ $size: Headline; $weight?: FontWeight }>`
  font-size: ${({ $size }) => `var(--headline-${$size})`};
  font-weight: ${({ $weight = 'base' }) => `var(--font-weight-${$weight})`};
  line-height: 1.2;
`;

const StyledTitle = styled.span<{ $size: Title; $weight?: FontWeight }>`
  font-size: ${({ $size }) => `var(--title-${$size})`};
  font-weight: ${({ $weight = 'base' }) => `var(--font-weight-${$weight})`};
  line-height: 1.5;
`;

const StyledText = styled.span<{ $size: Text; $weight?: FontWeight }>`
  font-size: ${({ $size }) => `var(--text-${$size})`};
  font-weight: ${({ $weight = 'base' }) => `var(--font-weight-${$weight})`};
  line-height: 1.5;
`;

export { StyledHeadline, StyledTitle, StyledText };
