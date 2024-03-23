import styled from 'styled-components';

import StyledAuth from '@/components/CommonStyled/StyledAuth';

const StyledLogin = styled(StyledAuth)`
  @media (max-width: 430px) {
    position: relative;

    form button {
      position: absolute;
      bottom: 0;
      width: calc(100% - var(--margin-mobile) * 2);
    }
  }
`;

export default StyledLogin;
