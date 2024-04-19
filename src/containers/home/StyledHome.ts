import styled from 'styled-components';

const StyledMain = styled.main`
  position: relative;
  padding: 24px var(--margin-mobile) calc(var(--nav-height-mobile) + 40px);

  @media (min-width: 431px) {
    padding: var(--nav-height-tablet) var(--margin-tablet) 40px;
    margin: 0;
  }

  @media (min-width: 1025px) {
    padding: 0 var(--margin-pc) 55px;
    margin: var(--padding-top-pc) var(--right-padding-pc) 0 var(--nav-width-pc);
  }
`;

const StyledHomeSection = styled.section`
  max-width: 33.3rem;
  margin: auto;

  .btn-wrap {
    display: flex;
    margin: 0 0 1.6rem;
  }

  .toggle-btn {
    padding: 5px 16px;
    font-size: var(--text-m);
    color: var(--gray-900);
    border: 1px solid var(--gray-200);
    border-radius: 8px;
  }

  .toggle-btn + .toggle-btn {
    margin-left: 12px;
  }

  .toggle-btn.selected {
    color: white;
    background: var(--gray-900);
    border-color: var(--gray-900);
  }

  .sort-btn {
    margin-left: auto;
  }

  .add-btn {
    margin-left: 12px;
  }

  .sort-btn,
  .add-btn {
    width: 3.3rem;
    height: 3.3rem;
    border-radius: 50%;
    background-color: var(--gray-100);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sort-btn img,
  .add-btn img {
    width: 2rem;
    height: 2rem;
  }
  .sort-btn:hover,
  .add-btn:hover {
    background-color: var(--point-color);
  }
  .sort-btn:focus,
  .add-btn:focus {
    background-color: var(--gray-800);
    img {
      filter: invert(99%) sepia(13%) saturate(487%) hue-rotate(187deg)
        brightness(113%) contrast(84%);
    }
  }

  & > ul {
    display: flex;
    flex-direction: column;
    gap: 5.5rem;

    & > li {
      width: 100%;
      aspect-ratio: 3/4;
    }
  }

  .array-modal {
    position: absolute;
    top: 22%;
  }

  @media (max-width: 1024px) {
    padding-top: 0;
    max-width: 100%;
    margin: 0;

    & > ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4rem 1.6rem;

      & > li {
        flex-shrink: 0;
      }
    }

    .array-modal {
      top: 26%;
    }
  }
  @media (max-width: 430px) {
    & > ul {
      display: flex;
    }
    .array-modal {
      top: 13%;
    }
  }
`;
export { StyledMain, StyledHomeSection };
