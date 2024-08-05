import styled from 'styled-components';

const StyledIndicatorList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 0.6rem;
`;

const StyledIndicatorItem = styled.li`
  width: 0.6rem;
  aspect-ratio: 1/1;

  button {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: var(--gray-300);
  }

  &.active button {
    background: var(--gray-900);
  }
`;

export { StyledIndicatorList, StyledIndicatorItem };
