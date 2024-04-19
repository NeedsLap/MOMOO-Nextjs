import styled from 'styled-components';

const ConfirmModalDialog = styled.dialog`
  background: var(--background-color);
  border-radius: 1rem;
  width: 25.2rem;
  font-size: var(--text-l);
  overflow: hidden;
  position: fixed;
  text-align: center;

  h3 {
    padding: 2rem 2.2rem 0.2rem;
  }

  p {
    font-size: var(--text-s);
    color: var(--gray-600);
  }

  .btn-wrap {
    margin: 20px 0 0;
    border-top: 1px solid var(--gray-200);

    button {
      width: 50%;
      text-align: center;
      padding: 1.2rem;
      font-size: var(--text-m);
      transition: all 0.2s ease-in-out;
    }

    button:first-child {
      border-right: 1px solid var(--gray-200);
    }

    button:last-child {
      color: var(--point-dark-400);
    }

    button:hover {
      background-color: var(--point-color);
    }
  }
`;

export { ConfirmModalDialog };
