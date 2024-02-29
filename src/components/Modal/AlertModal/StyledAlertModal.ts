import styled from 'styled-components';

const StyledAlertModal = styled.dialog`
  max-width: min(280px, calc(100% - var(--margin-mobile) * 2));
  text-align: center;
  border-radius: 1rem;
  background: var(--background-color);

  p {
    padding: 22px 30px;
    font-size: var(--text-l);
    word-break: keep-all;
  }

  button {
    width: 100%;
    padding: 1.2rem;
    font-size: var(--text-m);
    color: var(--point-dark-400);
    border-top: 1px solid var(--gray-200);
  }

  button:focus {
    outline-color: var(--primary-color);
  }
`;

export default StyledAlertModal;
