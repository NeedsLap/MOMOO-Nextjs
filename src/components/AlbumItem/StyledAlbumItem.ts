import styled from 'styled-components';

const StyledAlbumItem = styled.li`
  position: relative;
  display: inline-block;
  margin: 0 0 16px;
  width: 100%;
  background-color: black;
  border: 1px solid var(--gray-100);
  vertical-align: top;

  .hover-wrap {
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
    margin: 0 0 12px;

    .hover-wrap {
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
