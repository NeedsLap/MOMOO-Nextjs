import styled from 'styled-components';

const StyledHomeTopBar = styled.header`
  position: fixed;
  background: var(--background-color);
  z-index: 1000;
  padding: 8px 0;
  width: 100%;
  border-bottom: 1px solid var(--gray-200);

  button {
    padding: 7px 0;
    width: 100%;
  }

  img {
    margin: auto;
    width: 112px;
    aspect-ratio: 112/18;
  }
`;

export default StyledHomeTopBar;
