import styled from 'styled-components';

const StyledFeedList = styled.ul`
  position: relative;
  flex-grow: 1;
  max-width: 50rem;
  width: 100%;
  margin: auto;

  @media (max-width: 1024px) {
    max-width: 100%;
  }

  @media (max-width: 430px) {
    margin-top: 0;
  }
`;

export default StyledFeedList;
