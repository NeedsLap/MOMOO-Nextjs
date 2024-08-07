import Image from 'next/image';

import styled from 'styled-components';

const StyledEmotionImg = styled(Image)<{ $size: number }>`
  width: ${({ $size }) => `${$size * 0.1}rem`};
  aspect-ratio: 1/1;
`;

export default StyledEmotionImg;
