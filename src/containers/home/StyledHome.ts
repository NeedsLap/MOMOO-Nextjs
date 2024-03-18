import styled from 'styled-components';

const StyledMain = styled.main`
  padding: 28px var(--margin-mobile) 60px;

  @media (min-width: 431px) {
    padding: var(--nav-height-tablet) var(--margin-tablet) 0;
    margin: 0;
  }

  @media (min-width: 1025px) {
    width: 100%;
    padding: 0 var(--margin-pc);
    margin: var(--padding-top-pc) var(--right-padding-pc) 0 var(--nav-width-pc);
  }
`;

const StyledHomeSection = styled.section`
  max-width: 33.3rem;
  margin: auto;

  .btn-wrap {
    display: flex;
    justify-content: space-between;
    margin: 2.3rem 0 2rem;
  }
  .btn-wrap button {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    background-color: var(--gray-100);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-wrap button img {
    width: 2rem;
    height: 2rem;
  }
  .btn-wrap button:hover {
    background-color: var(--point-color);
  }
  .btn-wrap button:focus {
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
    max-width: 100%;
    margin: 0;
    .album-title {
      margin-top: 5.9rem;
    }

    & > ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4rem 1.6rem;

      & > li {
        flex-shrink: 0;
      }
    }

    .btn-wrap {
      margin: 0 0 1.1rem;
    }
    .btn-wrap button {
      width: 3rem;
      height: 3rem;
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
