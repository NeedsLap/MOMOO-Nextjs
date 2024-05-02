import styled from 'styled-components';

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: var(--background-color);

  .navBtn button {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .navBtn button img {
    width: 2.4rem;
    height: 2.4rem;
  }

  .navBtn button p {
    font-size: var(--text-m);
  }

  .logoImg {
    width: 6.4rem;
    height: auto;
    position: absolute;
    bottom: 0rem;
    left: 4.8rem;
    aspect-ratio: 64 / 376;
  }

  @media (min-width: 1025px) {
    width: var(--nav-width-pc);
    height: 100vh;

    .navBtn button {
      padding: 1.8rem 4.8rem;
      width: 100%;
    }

    .navBtn button:first-child {
      margin-top: calc(var(--padding-top-pc) - 1.8rem);
    }
  }

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    height: var(--nav-height-tablet);
    padding: 2.4rem;

    .navBtn {
      display: flex;
      justify-content: end;
      align-items: center;
      gap: 2.8rem;
      width: 100%;
    }

    .navBtn button p {
      display: none;
    }

    .logoImg {
      position: initial;
      width: 19.6rem;
      aspect-ratio: 196 / 32;
    }
  }
`;

export default StyledNav;
