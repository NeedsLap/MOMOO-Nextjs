import styled from 'styled-components';

import StyledAuth from '@/components/CommonStyled/StyledAuth';

import { StyledSignupProps } from '@/containers/signup/model';

const StyledSignup = styled(StyledAuth)<StyledSignupProps>`
  .agree {
    margin: 20px 0 0;
    padding: 20px 30px;
    border: 1px solid var(--gray-300);
  }

  h3 {
    margin-bottom: 24px;
    font-size: var(--text-l);
    color: var(--gray-900);
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
  }

  label.checkbox {
    display: flex;
    flex-direction: row-reverse;
    width: fit-content;
    align-items: center;
    font-size: var(--text-m);
    color: var(--gray-900);

    &::after {
      content: '';
      background: center / contain url(${(props) => props.$checkboxIcon})
        no-repeat;
      margin: 1px 8px 0 0;
      width: 14px;
      aspect-ratio: 1/1;
      flex-shrink: 0;
    }

    &.checked::after {
      background-image: url(${(props) => props.$checkboxCheckedIcon});
      margin: 1px 8px 0 0;
    }
  }

  .focus::after {
    outline: 1px solid var(--gray-900);
  }

  button.link {
    padding: 8px;
    margin: -8px -8px -8px 0;
    width: min-content;

    img {
      width: 14px;
      aspect-ratio: 1/1;
    }
  }

  @media (max-width: 430px) {
    padding-bottom: calc(57px + 15px); // 57px - signup button

    .agree {
      margin-top: 15px;
      padding: 14px 20px;
    }

    h3 {
      margin-bottom: 20px;
    }

    li {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }

    .submit-btn-wrap {
      margin: 0 -16px;
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 6px 16px 0;
      background: var(--background-color);
      border-top: 1px solid var(--gray-100);

      button {
        margin: 0;
      }
    }
  }
`;

export default StyledSignup;
