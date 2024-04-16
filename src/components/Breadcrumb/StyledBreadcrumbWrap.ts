import styled from 'styled-components';

const StyledBreadcrumbWrap = styled.div`
  position: relative;
  width: 100%;

  nav {
    margin-left: auto;
  }

  @media (max-width: 430px) {
    display: none;
  }
`;

export default StyledBreadcrumbWrap;
