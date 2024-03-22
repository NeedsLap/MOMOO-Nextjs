import styled from 'styled-components';

type Container = {
  $arrow: string;
  $arrowGray: string;
};

const StyledBreadcrumb = styled.nav<Container>`
  position: absolute;
  right: var(--margin-tablet);
  display: flex;

  ol {
    margin-left: auto;
  }

  li {
    display: inline-block;
    font-size: var(--text-m);
    color: var(--gray-600);
  }

  li.current {
    color: var(--gray-900);
  }

  li:not(:first-child)::before {
    content: '';
    display: inline-block;
    margin-right: 20px;
    width: 12px;
    aspect-ratio: 1/1;
    background: ${(props) => `url(${props.$arrowGray}) no-repeat`};
    transform: rotateZ(-90deg);
  }

  li.current::before {
    background: ${(props) => `url(${props.$arrow}) no-repeat`};
  }

  li + li {
    margin-left: 20px;
  }

  @media (min-width: 1025px) {
    position: fixed;
    top: var(--padding-top-pc);
    right: 48px;
    transform: rotateZ(90deg);
    transform-origin: top right;

    ol {
      position: absolute;
      display: flex;
    }

    li {
      white-space: nowrap;
    }
  }
`;

export default StyledBreadcrumb;
