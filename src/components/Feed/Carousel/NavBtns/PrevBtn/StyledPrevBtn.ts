import styled from 'styled-components';

import StyledNavBtn from '@/components/Feed/Carousel/NavBtns/StyledNavBtn';

const StyledPrevBtn = styled(StyledNavBtn)`
  left: 8px;
  padding: 4px 3.5px 4px 4.5px;
  transform: translateY(-50%) rotate(180deg);
`;

export default StyledPrevBtn;
