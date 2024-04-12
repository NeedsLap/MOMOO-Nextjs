import styled from 'styled-components';

const StyledMyNonModal = styled.dialog`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: none;

  & > div {
    position: relative;
    width: 252px;
    background: var(--gray-100);
  }

  .profile {
    padding: 20px 0;
    text-align: center;

    img {
      width: 60px;
      aspect-ratio: 1/1;
      margin: 0 auto 8px;
      border-radius: 50%;
    }

    .displayName {
      margin-bottom: 5px;
      font-size: var(--text-l);
      color: var(--gray-900);
    }

    .email {
      font-size: var(--text-s);
      color: var(--gray-700);
    }
  }

  .menu {
    padding: 20px 0 15px;
    border-top: 1px solid var(--gray-300);

    button,
    a {
      padding: 5px 15px;
      display: flex;
      align-items: center;
      width: 100%;
      font-size: var(--text-m);
      color: var(--gray-900);
    }

    a:hover,
    button:hover {
      background: var(--point-color);
    }

    img {
      margin-right: 10px;
      width: 24px;
    }
  }

  .footer {
    padding: 16px;
    text-align: center;
    border-top: 1px solid var(--gray-300);
    font-family: var(--serif);
    font-size: var(--text-s);
    color: var(--gray-700);
  }

  .close {
    position: absolute;
    width: 20px;
    aspect-ratio: 1/1;
    top: 20px;
    right: 20px;
  }

  @media (min-width: 1025px) {
    & > div {
      margin-top: 218px;
    }
  }

  @media (max-width: 1024px) {
    & > div {
      margin: var(--nav-height-tablet) 0 0 auto;
    }

    .profile {
      padding: 15px 0;
    }

    .close {
      top: 15px;
      right: 15px;
    }
  }
`;

export default StyledMyNonModal;
