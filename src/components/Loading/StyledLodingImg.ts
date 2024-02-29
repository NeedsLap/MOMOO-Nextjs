import Image from 'next/image';

import styled from 'styled-components';

// 사용 시, src/alt/width/height 필수 지정
const StyledLoadingImg = styled(Image)`
  margin: auto;
  width: 36px;
  aspect-ratio: 1/1;
`;

const StyledLoadingComponent = styled(StyledLoadingImg)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
`;

export { StyledLoadingImg, StyledLoadingComponent };
