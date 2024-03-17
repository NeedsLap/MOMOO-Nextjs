import styled from 'styled-components';

const StyledSharingModal = styled.dialog`
  overflow: hidden;
  border-radius: 10px;
  color: var(--gray-900);
  background: var(--background-color);
  width: 280px;

  .modal-wrap {
    position: relative;
    font-size: var(--text-l);
  }

  .search-member {
    padding: 12px 16px;

    .result {
      margin: 8px 0 0;
      background: var(--gray-100);
      border-radius: 8px;
    }
  }

  .search {
    display: flex;
    border-radius: 10px;
    border: 1px solid var(--gray-200);
  }

  input {
    padding: 6px 0 5px 12px;
    min-width: 0;
    flex-grow: 1;
    font-size: var(--text-m);
  }

  input:focus {
    outline: none;
  }

  .search.focus {
    border-color: var(--point-color);
    outline: 1px solid var(--point-color);
  }

  .search > button {
    padding: 0 12px;

    img {
      margin: auto;
      width: 18px;
      height: 18px;
      aspect-ratio: 1/1;
    }
  }

  .result.not-found {
    font-size: var(--text-m);
    text-align: center;
    padding: 17px 0 18px;
  }

  .loading {
    padding: 16px;

    img {
      margin: auto;
      width: 24px;
    }
  }

  div.member {
    padding: 12px;
  }

  .invite-btn {
    margin: 0 0 0 auto;
    padding: 4px 10px;
    background: var(--point-dark-400);
    color: white;
    border-radius: 50px;
    font-size: var(--text-m);
  }

  .invite-btn:disabled {
    color: var(--gray-900);
    background: var(--gray-200);
  }

  .manage {
    margin-left: 16px;
    font-size: var(--text-s);
    color: var(--gray-600);
  }

  ul {
    margin: 4px 0 14px;
  }

  li.member {
    padding: 4px 16px;
  }

  .member {
    display: flex;
    align-items: center;
    gap: 8px;

    div {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      font-size: var(--text-m);

      span {
        display: block;
      }

      span:last-child {
        font-size: var(--text-s);
      }
    }

    button {
      flex-shrink: 0;
    }

    img {
      flex-shrink: 0;
      width: 3.2rem;
      aspect-ratio: 1/1;
      border-radius: 50%;
      border: 1px solid var(--gray-100);
    }
  }

  .delete-btn {
    margin: 0 -5px 0 auto;
    padding: 7px 5px;
    font-size: var(--text-m);
    color: var(--error-color);

    img {
      width: 21px;
      aspect-ratio: 1/1;
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
