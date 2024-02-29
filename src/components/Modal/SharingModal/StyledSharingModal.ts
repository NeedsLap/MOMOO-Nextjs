import styled from 'styled-components';

const StyledSharingModal = styled.dialog`
  overflow: hidden;
  border-radius: 10px;
  color: var(--gray-900);
  background: var(--background-color);
  width: 280px;

  & > div {
    position: relative;
    font-size: var(--text-l);

    & > div {
      padding: 12px 16px 16px;
      display: flex;
    }
  }

  input {
    margin-right: 8px;
    padding: 7px 16px 6px;
    min-width: 0;
    font-size: var(--text-m);
    border: 1px solid var(--gray-200);
  }

  input:focus {
    border-color: var(--point-color);
    outline: 1px solid var(--point-color);
  }

  .copy-btn {
    flex-shrink: 0;
    padding: 7px 17px 6px;
    font-size: var(--text-m);
    color: white;
    background: var(--point-dark-400);
  }

  input,
  .copy-btn {
    border-radius: 10px;
  }

  .manage {
    margin-left: 16px;
    font-size: var(--text-s);
    color: var(--gray-600);
  }

  ul {
    margin: 4px 0 10px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;

    div {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      line-height: 1;
      font-size: var(--text-m);

      span {
        display: block;
      }

      span:last-child {
        margin-top: 2px;
        font-size: var(--text-s);
      }
    }

    button {
      flex-shrink: 0;
      margin: 0 -5px 0 auto;
      padding: 11px 5px;
      line-height: 1;
      font-size: var(--text-m);
      color: var(--error-color);
    }

    img {
      flex-shrink: 0;
      width: 3.2rem;
      aspect-ratio: 1/1;
      border-radius: 50%;
      border: 1px solid var(--gray-100);
    }
  }

  .close-button {
    position: absolute;
    box-sizing: content-box;
    top: 4px;
    right: 6px;
    width: 1.6rem;
    aspect-ratio: 1/1;
    padding: 10px;
  }
`;

const DialogTitle = styled.strong`
  display: block;
  padding: 10px 16px;
  text-align: center;
  font-size: var(--text-l);
  border-bottom: 1px solid var(--gray-200);
`;

export { StyledSharingModal, DialogTitle };
