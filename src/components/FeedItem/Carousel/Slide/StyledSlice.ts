import styled from 'styled-components';

const StyledSlide = styled.ul`
  height: 100%;
  display: flex;
  aspect-ratio: 1/1;
  transition: 0.3s;

  li {
    width: 100%;
    flex-shrink: 0;
    background-color: var(--gray-900);

    img {
      object-fit: contain;
    }
  }
`;

export default StyledSlide;
