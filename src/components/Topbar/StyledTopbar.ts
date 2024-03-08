import styled from 'styled-components';

const StyledTopbar = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 100;
  padding: 12px var(--margin-mobile);
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid var(--gray-200);
  background: var(--background-color);

  h2 {
    margin: auto;
    font-size: var(--text-l);
    color: var(--gray-900);
  }

  .back {
    position: absolute;
    width: 16px;
    aspect-ratio: 1/1;
  }
`;

const StyledAddPhotoBtn = styled.button`
  position: absolute;
  right: var(--margin-mobile);
  padding: 2px;
  border: 1px solid var(--gray-900);
  border-radius: 6px;

  img {
    width: 1.6rem;
    aspect-ratio: 1/1;
  }
`;

export default StyledTopbar;
export { StyledAddPhotoBtn };
