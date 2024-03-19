import styled from 'styled-components';

const StyledFeed = styled.main`
  margin: 0 var(--right-padding-pc) 0 var(--nav-width-pc);
  padding: 10rem var(--margin-pc) 20px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    padding: calc(var(--nav-height-tablet) + 64px) var(--margin-tablet) 20px;
    margin: 0;
  }

  @media (max-width: 430px) {
    padding: var(--nav-height-mobile) var(--margin-mobile);
  }
`;

const StyledFeedList = styled.ul`
  position: relative;
  flex-grow: 1;
  max-width: 50rem;
  width: 100%;
  margin: auto;

  @media (max-width: 1024px) {
    max-width: 100%;
    margin-top: 20px;
  }

  @media (max-width: 430px) {
    margin-top: 0;
  }
`;

export default StyledFeed;
export { StyledFeedList };
