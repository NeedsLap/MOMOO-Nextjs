import styled from 'styled-components';

const AccordionWrapper = styled.div`
  width: 100%;
  padding: 0 1.6rem;
  border-bottom: 1px solid var(--gray-200);
  background-color: var(--background-color);

  .que {
    position: relative;
    width: 100%;
    padding: 0.9rem 0rem;
    transition: transform 0.3s ease-in-out;
    font-size: var(--text-m);
    cursor: pointer;
  }

  #answer {
    display: flex;
    overflow: hidden;
    gap: 0.5rem;

    button {
      border-radius: 50%;
      margin-bottom: 0.9rem;
      transition: all 0.1s ease-in-out;
    }

    @media (min-width: 431px) {
      button:hover {
        background-color: var(--point-light-100);
        border-radius: 50%;
      }
    }

    button.selected {
      background-color: var(--point-color);
    }
  }

  .btnImg {
    margin: 0 auto;
  }

  .arrow-wrap {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translate(0, -50%);
  }

  .que .arrow-top {
    display: block;
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }

  .que .arrow-bottom {
    display: block;
    transform: rotate(0deg);
    transition: transform 0.3s ease;
  }

  .que.on .arrow-bottom {
    display: block;
    transform: rotate(180deg);
  }

  .que.on .arrow-top {
    display: block;
    transform: rotate(180deg);
  }

  .directionIcon {
    width: 1.6rem;
    height: 1.6rem;
  }

  @media (max-width: 430px) {
    .que {
      padding: 1.3rem 0rem;
    }

    button {
      width: 3rem;
      height: 3rem;
    }

    .btnImg {
      width: 2.6rem;
      height: 2.6rem;
    }
  }
`;

const MultiAccordionWrapper = styled.div`
  #multiAnswer {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    max-height: 7rem;
    overflow-y: scroll;
    padding: 1rem 0;

    button {
      min-width: 8.8rem;
      background-color: var(--gray-100);
      padding: 0.7rem 0.1rem;
      font-size: var(-text-m);
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

export { AccordionWrapper, MultiAccordionWrapper };
