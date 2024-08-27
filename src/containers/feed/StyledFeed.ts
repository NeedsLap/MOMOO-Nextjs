import styled from 'styled-components';

const StyledFeed = styled.main`
  margin: 0 var(--right-padding-pc) 0 var(--nav-width-pc);
  padding: 10rem var(--margin-pc) 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    padding: calc(var(--nav-height-tablet)) var(--margin-tablet) 20px;
    margin: 0;
  }

  @media (max-width: 430px) {
    padding: var(--nav-height-mobile) var(--margin-mobile);
  }
`;

export default StyledFeed;
