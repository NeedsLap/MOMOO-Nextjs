import styled from 'styled-components';

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: var(--nav-height-mobile);
  display: flex;
  align-items: center;
  flex-grow: 1;
  z-index: 1;
  background-color: var(--background-color);
  border-top: 1px solid var(--gray-200);

  .navBtn {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
    padding: 0.7rem 1.6rem;
  }

  .navBtn a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    margin-top: 3px;
    font-size: 0.8rem;
    line-height: 1;
  }

  a.curr {
    color: var(--point-dark-400);
  }

  .navBtn a img {
    width: 2.2rem;
    height: 2.2rem;
  }
`;

export default StyledNav;
