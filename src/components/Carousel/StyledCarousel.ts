import styled from 'styled-components';

const SlideImgWrap = styled.div`
  width: inherit;
  height: 100%;
  overflow: hidden;
  position: relative;

  @media (max-width: 430px) {
    margin: 0 calc(0px - var(--margin-mobile));
  }

  ul {
    height: 100%;
    display: flex;
    aspect-ratio: 1/1;
    transition: 0.3s;
  }

  li {
    width: 100%;
    flex-shrink: 0;
    background-color: var(--gray-900);

    img {
      object-fit: contain;
    }
  }

  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    box-sizing: content-box;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    padding: 4px 3.5px 4px 4.5px;
  }

  .ArrowBack {
    left: 8px;
    transform: translateY(-50%) rotate(180deg);
  }

  .ArrowRight {
    right: 8px;
    padding: 4px 3.5px 4px 4.5px;
  }
`;

const IndicatorList = styled.ul`
  width: 100%;
  margin-top: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const IndicatorItem = styled.li`
  width: 0.6rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: var(--gray-300);
  display: flex;
  gap: 2rem;
  margin-right: 0.6rem;

  &.active {
    background: var(--gray-900);
  }
`;

export { SlideImgWrap, IndicatorList, IndicatorItem };
