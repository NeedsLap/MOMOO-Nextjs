import styled, { css } from 'styled-components';

const sizeStyles = {
  l: css`
    width: 100%;
    padding: 1rem 0;
    font-size: var(--title-m);

    img {
      padding: calc(var(--title-m) * 0.3) 0;
      width: calc(var(--title-m) * 1.2);
    }

    @media (max-width: 1024px) {
      font-size: var(--title-s);

      img {
        padding: calc(var(--title-s) * 0.3) 0;
        width: calc(var(--title-s) * 1.2);
      }
    }
  `
};

const BtnStyle = styled.button<{ size?: 'l' }>`
  ${({ size }) => sizeStyles[size || 'l'] || ''}

  background-color: var(--gray-800);
  color: var(--gray-100);
  font-family: var(--serif);
  transition: color 0.3s ease-in-out;

  &:hover {
    color: var(--point-color);
  }

  &:disabled {
    background-color: var(--gray-200);
    color: var(--gray-800);
    cursor: default;
  }

  img {
    margin: auto;
    height: auto;
    aspect-ratio: 1/1;
    box-sizing: content-box;
  }
`;

export { sizeStyles, BtnStyle };
