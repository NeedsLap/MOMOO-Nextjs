import styled from 'styled-components';

const StyledH2 = styled.h2`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--title-s);
  font-family: var(--title-font-family);
  color: var(--gray-800);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;

  &::before,
  &::after {
    content: '';
    height: 1px;
    width: 32px;
    background: var(--gray-800);
  }

  @media (max-width: 1024px) {
    position: relative;
    justify-content: start;
    margin-bottom: 20px;

    &::before,
    &::after {
      display: none;
    }
  }

  @media (max-width: 430px) {
    display: none;
  }
`;

export default StyledH2;
