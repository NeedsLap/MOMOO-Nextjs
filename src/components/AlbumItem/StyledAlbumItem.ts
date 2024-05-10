import styled from 'styled-components';

import a11yHidden from '@/components/CommonStyled/a11yHidden';

const StyledAlbumItem = styled.li`
  margin: 8px;
  position: relative;
  box-sizing: content-box;

  .album-item-wrap:not(:hover) > div {
    ${a11yHidden}
  }

  .album-item-wrap:hover > div {
    position: absolute;
    inset: 0;
    background: #00000080;
    color: white;

    strong {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: var(--text-l);
    }

    button {
      position: absolute;
      right: 16px;
      bottom: 16px;
      padding: 6px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8);
    }
  }

  @media (max-width: 430px) {
    margin: 6px;

    .album-item-wrap > div:hover {
      strong {
        font-size: var(--text-m);
      }

      button {
        right: 12px;
        bottom: 12px;
        padding: 4px;
      }

      img {
        width: 16px;
      }
    }
  }
`;

export default StyledAlbumItem;
