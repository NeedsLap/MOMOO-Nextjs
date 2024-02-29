import styled from 'styled-components';

const StyledBreadcrumbWrap = styled.div`
  width: 100%;
  margin: 59px 0 0;
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
