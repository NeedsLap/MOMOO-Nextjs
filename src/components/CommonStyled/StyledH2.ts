import styled from 'styled-components';

const StyledH2 = styled.h2`
  font-size: var(--title-s);
  font-family: var(--title-font-family);
  color: var(--gray-800);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin: 0 auto;

  &::before,
  &::after {
    content: '';
    height: 1px;
    width: 32px;
    background: var(--gray-800);
  }
  @media (max-width: 1024px) {
    justify-content: start;
    margin-bottom: 40px;
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
