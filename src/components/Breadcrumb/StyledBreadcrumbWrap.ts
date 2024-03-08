import styled from 'styled-components';

const StyledBreadcrumbWrap = styled.div`
  position: absolute;
  width: calc(100% - var(--margin-tablet) * 2);
  display: flex;
  align-items: center;

  h2 {
    font-family: var(--title-font-family);
    font-size: var(--title-s);
    color: var(--gray-800);
  }

  nav {
    margin-left: auto;
  }
`;

export default StyledBreadcrumbWrap;
