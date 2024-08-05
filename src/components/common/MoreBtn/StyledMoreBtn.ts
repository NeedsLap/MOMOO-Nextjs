import styled from 'styled-components';

const MoreBtn = styled.button`
  margin: -6px;
  padding: 6px;
  width: 2rem;
  aspect-ratio: 1/1;
  box-sizing: content-box;

  svg {
    vertical-align: top;
  }

  @media (max-width: 430px) {
    width: 1.6rem;
  }
`;

export { MoreBtn };
