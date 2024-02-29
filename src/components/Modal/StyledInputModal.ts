import styled from 'styled-components';

const StyledInputModal = styled.dialog`
  width: 230px;
  padding: 20px 16px 0;
  border-radius: 10px;
  color: var(--gray-900);
  background: var(--background-color);

  h3 {
    text-align: center;
    font-size: var(--text-l);
  }

  p {
    margin-bottom: 16px;
    text-align: center;
    font-size: var(--text-s);
    color: var(--gray-600);
  }

  input {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: var(--text-s);
    border: 1px solid var(--gray-200, #d2d2d2);

    &::placeholder {
      margin-left: 10px;
      font-size: var(--text-s);
      color: var(--gray-600);
    }

    &:focus {
      outline: none;
      border-color: var(--point-dark-400);
    }
  }

  strong {
    display: block;
    margin: 8px 0 20px;
    font-size: var(--text-s);
    line-height: 1;
    color: var(--error-color);
  }

  div {
    margin: 0 -16px;
    display: flex;
    align-items: stretch;
    border-top: 1px solid var(--gray-200);
  }

  button {
    width: 50%;
    padding: 10px 16px;
    font-size: var(--text-m);
  }

  button:last-child {
    border-left: 1px solid var(--gray-200);
    color: var(--point-dark-400);
  }

  img {
    width: 16px;
    height: 16px;
    margin: auto;
  }
`;

export default StyledInputModal;
