import styled from 'styled-components';

const StyledTopbar = styled.header`
  position: fixed;
  z-index: 100;
  padding: 12px var(--margin-mobile);
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid var(--gray-200);
  background: var(--background-color);

  h1 {
    font-size: var(--text-l);
    color: var(--gray-900);
    text-align: center;
  }

  .back {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    aspect-ratio: 1/1;
  }
`;

export default StyledTopbar;
