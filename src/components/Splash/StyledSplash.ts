import styled, { keyframes } from 'styled-components';

const changeColor = keyframes`
  0% {
      fill: var(--point-dark-100);
  }
  100% {
      fill: var(--primary-color);
  }
`;

const sliceCircle = keyframes`
  0% {
    opacity: 1;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
`;

const StyledSplash = styled.main`
  position: relative;
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: var(--background-color);

  --width: min(
    565px,
    calc(var(--column-tablet) * 6 + var(--gutter-tablet) * 7)
  );

  @media (max-width: 430px) {
    --width: calc(100vw * 0.76923077);
  }

  @keyframes moveCircle {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(calc(-50vw + var(--width) / 2 + 50%));
    }
  }

  .logo {
    margin: auto;
    width: var(--width);
    height: auto;
  }

  div {
    animation: moveCircle 0.7s forwards ease;
    position: absolute;
    right: 0;
    transform: translateX(100%);
    height: min(96px, calc(var(--width) / 5.88541667));
    aspect-ratio: 89 / 96;

    path {
      animation: ${changeColor} 0.5s 0.7s forwards;
    }
  }

  div::after {
    animation: ${sliceCircle} 0.5s 1.2s forwards;
    content: '';
    position: absolute;
    width: 50%;
    height: 100%;
    opacity: 0;
    background: var(--background-color);
    right: 0;
  }
`;

export default StyledSplash;
