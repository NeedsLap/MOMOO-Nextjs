import styled from 'styled-components';

const StyledMy = styled.main`
  padding: 0 0 48px;
  display: flex;
  flex-direction: column;
  min-height: inherit;

  .profile {
    padding: 35px 0 24px;
    text-align: center;

    img {
      margin: 0 auto 8px;
      width: 70px;
      aspect-ratio: 1/1;
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
    padding: 15px 0;
    border-top: 1px solid var(--gray-300);

    button,
    a {
      padding: 10px 30px;
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
      margin-right: 20px;
      width: 24px;
    }
  }

  .footer {
    margin-top: auto;
    padding: 22px 16px;
    text-align: center;
    border-top: 1px solid var(--gray-300);
    font-family: var(--serif);
    font-size: var(--text-l);
    color: var(--gray-700);
  }
`;

export default StyledMy;
