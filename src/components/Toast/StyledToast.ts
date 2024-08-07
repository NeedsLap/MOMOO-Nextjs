import styled, { keyframes } from 'styled-components';

const pop = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
`;

const hide = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const StyledToast = styled.div`
  animation:
    ${pop} 0.2s forwards,
    ${hide} 0.2s 2.6s forwards;
  position: fixed;
  z-index: 2000;
  bottom: 0px;
  left: 0px;
  right: 0px;
  font-size: var(--text-m);
  padding: 16px;
  color: white;
  background: rgba(0, 0, 0, 0.9);

  @media (max-width: 430px) {
    bottom: 56px;
    border-radius: 6px;
  }
`;

export default StyledToast;
