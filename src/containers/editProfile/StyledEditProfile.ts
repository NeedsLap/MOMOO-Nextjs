import styled from 'styled-components';

import StyledAuth from '@/components/CommonStyled/StyledAuth';

const StyledEditProfile = styled(StyledAuth)`
  article {
    justify-content: flex-start;

    h2 {
      margin: 0 0 80px;
    }

    button + button {
      margin-top: 32px;
    }

    button {
      padding: 10px;
      font-size: var(--title-s);
    }

    button:hover {
      background: var(--point-color);
    }

    button.selected {
      background: var(--gray-800);
      color: var(--gray-100);
    }
  }

  .delete-btn {
    display: flex;
    margin-top: 46px;
    padding: 10px 20px;
    width: 100%;
    font-size: var(--text-l);
    font-family: var(--serif);
    border: 1px solid var(--gray-800);
    color: var(--error-color);

    img {
      margin-left: auto;
      width: 20px;
      aspect-ratio: 1/1;
    }
  }

  @media (max-width: 1024px) {
    article > h2 {
      display: none;
    }
  }

  @media (min-width: 431px) and (max-width: 1024px) {
    padding-top: var(--nav-height-tablet);
    flex-direction: column;
    align-items: flex-start;

    article {
      justify-content: center;

      button + button {
        margin-top: 0;
      }

      button {
        text-align: left;
        padding: 5px 14px;
        white-space: nowrap;
        font-size: var(--title-s);
      }
    }
  }

  @media (max-width: 430px) {
    padding: var(--nav-height-mobile) var(--margin-mobile);

    article {
      display: none;
    }

    .container {
      padding: 48px 0 20px;
    }

    .profile {
      margin: 0 auto 55px;
    }

    form {
      button {
        margin-top: 35px;
        position: static;
        width: 100%;
      }
    }
  }
`;

export default StyledEditProfile;
