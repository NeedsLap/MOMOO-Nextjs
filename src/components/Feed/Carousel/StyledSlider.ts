import styled from 'styled-components';

const StyledSlider = styled.div`
  width: inherit;
  height: 100%;
  overflow: hidden;
  position: relative;

  @media (max-width: 430px) {
    margin: 0 calc(0px - var(--margin-mobile));
  }
`;

export default StyledSlider;
