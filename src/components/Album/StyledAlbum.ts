import Link from 'next/link';

import styled from 'styled-components';

interface Props {
  $imageUrl?: string;
}

const AlbumContainer = styled.article<Props>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background: ${(props) => {
    if (!props.$imageUrl) {
      return 'linear-gradient(0deg, #343434 5.58%, rgba(126, 126, 126, 0) 40.58%, rgba(225, 225, 225, 0) 105.15%), var(--gray-200)';
    } else
      return `linear-gradient(0deg, #343434 5.58%, rgba(126, 126, 126, 0) 40.58%, rgba(225, 225, 225, 0) 105.15%), url('${props.$imageUrl}') no-repeat center / cover`;
  }};
  .txtWrapper {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 2rem 1.5rem;
    .albumTitle {
      color: var(--background-color);
      font-size: 2.4rem;
    }
    .CountWrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .albumCount {
        color: var(--gray-200);
        font-family: Prata;
        font-size: 2rem;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
      }
      button {
        width: 2rem;
        height: 2rem;
        background: url('/icons/more-white.svg') no-repeat center/ contain;
      }
    }
  }
`;

const AlbumLink = styled(Link)`
  display: block;
  width: inherit;
  height: inherit;
`;

export { AlbumContainer, AlbumLink };
