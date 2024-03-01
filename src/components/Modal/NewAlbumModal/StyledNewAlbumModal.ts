import styled from 'styled-components';

const NewAlbumDialog = styled.dialog`
  background: var(--background-color);
  border-radius: 1rem;
  width: 23rem;
  font-size: var(--text-l);
  overflow: hidden;
  position: fixed;

  .modal-list button {
    width: 50%;
    padding: 1rem 1.6rem;
    font-size: var(--text-m);
    transition: all 0.2s ease-in-out;
  }
  .modal-list button:first-child {
    border-right: 1px solid var(--gray-200);
  }

  .modal-list button:hover {
    color: var(--point-color);
  }
`;

const Header = styled.header`
  padding: 2rem 1.6rem;
  border-bottom: 1px solid var(--gray-200);
  text-align: center;

  h2 {
    font-size: 1.6rem;
  }
  p {
    font-size: 1.2rem;
    margin-bottom: 1.6rem;
    color: var(--gray-600);
  }
  input {
    display: block;
    width: 19.8rem;
    height: 3.9rem;
    padding: 2rem 1rem;
    border: 1px solid var(--gray-200, #d2d2d2);

    &::placeholder {
      font-size: 1.2rem;
      color: var(--gray-600);
      margin-left: 1rem;
    }
  }
  strong {
    display: block;
    margin-top: 8px;
    font-size: var(--text-s);
    line-height: 1;
    color: var(--error-color);
    text-align: start;
  }
`;

export { NewAlbumDialog, Header };
