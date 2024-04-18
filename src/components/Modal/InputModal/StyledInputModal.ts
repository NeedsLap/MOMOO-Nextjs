import styled from 'styled-components';

const StyledInputModal = styled.dialog`
  background: var(--background-color);
  border-radius: 1rem;
  width: 23rem;
  font-size: var(--text-l);
  overflow: hidden;

  input {
    margin: 0 auto;
    display: block;
    width: 19.8rem;
    padding: 10px;
    font-size: var(--text-s);
    color: var(--gray-900);
    border: 1px solid var(--gray-200, #d2d2d2);

    &::placeholder {
      color: var(--gray-600);
      margin-left: 1rem;
    }
  }

  input:focus {
    outline: none;
    border-color: var(--point-dark-400);
  }

  strong {
    display: block;
    margin: 8px 16px 0;
    font-size: var(--text-s);
    line-height: 1;
    color: var(--error-color);
    text-align: start;
  }

  .btn-wrap {
    margin: 20px 0 0;
  }

  .btn-wrap button {
    width: 50%;
    padding: 1rem 1.6rem;
    font-size: var(--text-m);
    border-top: 1px solid var(--gray-200);
  }

  .btn-wrap button:last-child {
    color: var(--point-dark-400);
    border-left: 1px solid var(--gray-200);
  }
`;

const Header = styled.header`
  padding: 2rem 1.6rem 1.6rem;
  text-align: center;

  h3 {
    font-size: 1.6rem;
  }

  p {
    font-size: 1.2rem;
    color: var(--gray-600);
  }
`;

export { StyledInputModal, Header };
