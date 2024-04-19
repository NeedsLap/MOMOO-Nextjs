import styled from 'styled-components';

const StyledDeleteAndEditAlbumDialog = styled.dialog`
  background: var(--background-color);
  border-radius: 10px;
  width: 31.8rem;
  font-size: var(--text-l);
  overflow: hidden;
  position: fixed;
  padding: 2.5rem 1.6rem 2.8rem;

  .modal-content {
  }

  .close-button {
    position: absolute;
    top: 2.5rem;
    right: 1.9rem;
  }
  .modal-list {
    padding: 1.6rem 0 2rem;
  }
  .modal-list p {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  .modal-list input {
    color: var(--gray-600);
    border: 1px solid var(--gray-300);
    width: 100%;
    height: 4rem;
    padding: 2rem 1rem;
    margin-bottom: 1.6rem;
  }
  .modal-list button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: 1px solid var(--gray-300);
    padding: 1rem;
    color: var(--error-color, #de3f35);
    font-family: Prata;
    font-size: var(--text-l);
    transition: all 0.2s ease-in-out;
  }
  .modal-list strong {
    display: block;
    margin-bottom: 16px;
    font-size: var(--text-s);
    line-height: 1;
    color: var(--error-color);
  }
  .modal-list button img {
    width: 2rem;
    height: 2rem;
  }

  .modal-list button:hover {
    background: var(--point-color);
  }

  .edit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    width: 8.2rem;
    height: 3.2rem;
    background: var(--gray-200);
    font-size: var(--text-m);
  }
  .edit-btn:hover {
    background: var(--gray-300);
  }
`;

const Header = styled.header`
  text-align: center;
  h2 {
    color: var(--gray-900);
    font-family: Prata;
    font-size: 2rem;
  }
`;

export { StyledDeleteAndEditAlbumDialog, Header };
