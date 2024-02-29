import styled from 'styled-components';

const StyledArrayModal = styled.dialog`
  border-radius: 1rem;
  background-color: var(--background-color);
  border: 1px solid var(--gray-200);
  width: 19.6rem;
  font-size: var(--text-s);

  .modal-list button {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;
    text-align: start;
    font-size: var(--text-m);
    transition: all 0.2s ease-in-out;
  }
  .modal-list .selected img {
    width: 2rem;
    height: 2rem;
  }
  .modal-list button:first-child {
    border-top: 0.25rem solid var(--gray-200);
  }

  .modal-list button:hover {
    background-color: var(--gray-300);
  }
  .modal-list button:last-child:hover {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
`;

const Header = styled.header`
  padding: 1rem;
  border-bottom: 0.25rem solid var(--gray-200);
`;
export { StyledArrayModal, Header };
