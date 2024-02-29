import styled from 'styled-components';

const ChangeModalDialog = styled.dialog`
  overflow: hidden;
  background: var(--background-color);
  border-radius: 10px;
  width: 32rem;
  font-size: var(--text-l);
  position: fixed;
  header {
    padding: 2rem 0 1.8rem;
    text-align: center;
    font-size: var(--text-l);

    p {
      font-size: var(--text-s);
      color: var(--gray-600);
    }
  }

  .modalList {
    button {
      width: 50%;
      text-align: center;
      padding: 1.2rem 0;
      font-size: var(--text-m);
      transition: all 0.2s ease-in-out;
      border-top: 1px solid var(--gray-200);
    }

    button:first-child {
      border-right: 1px solid var(--gray-200);
    }

    button:hover {
      background-color: var(--point-color);
    }
  }
`;

const MultiAccordionWrapper = styled.div`
  min-height: 12rem;
  margin: 0 0 1.2rem 1.6rem;
  overflow: hidden;

  #multiAnswer {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    overflow-y: scroll;

    button {
      min-width: 8.8rem;
      background-color: var(--gray-100);
      padding: 0.7rem 1.6rem;
      font-size: var(--text-s);
      color: var(--gray-900);
      border-radius: 4px;
    }

    @media (min-width: 431px) {
      button:hover {
        background-color: var(--point-light-100);
      }
    }

    button.selected {
      background-color: var(--point-color);
    }
  }
`;

export { ChangeModalDialog, MultiAccordionWrapper };
