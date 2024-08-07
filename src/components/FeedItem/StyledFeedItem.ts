import styled from 'styled-components';

const StyledFeedItem = styled.li`
  & + & {
    margin-top: 4rem;
  }
`;

export default StyledFeedItem;
