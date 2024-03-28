import styled from 'styled-components';

const StyledFeedItem = styled.li`
  margin: 0 auto;
  color: var(--gray-900);

  & + & {
    margin-top: 4rem;
  }

  ul + .contentsSection {
    margin-top: 4px;
  }

  div + .contentsSection {
    margin-top: 12px;
  }

  .contentsSection {
    position: relative;
  }

  .iconSection {
    width: 100%;
    display: flex;
    align-items: flex-start;
    margin: 0 0 4px;

    .emotion,
    .weather {
      align-self: center;
      display: inline-block;
      width: 3.2rem;
      aspect-ratio: 1/1;
    }

    .weather {
      margin-left: 10px;
    }
  }

  .more {
    position: absolute;
    top: 0;
    right: 0;
    width: 2rem;
    aspect-ratio: 1/1;
  }

  .tit {
    display: block;
    font-weight: 600;
    margin-bottom: 4px;
    font-size: var(--text-l);
  }

  .time-wrap {
    display: flex;
    align-items: center;
    font-size: var(--text-s);

    img {
      margin-right: 4px;
      width: 1.6rem;
      aspect-ratio: 1/1;
    }

    time + img {
      margin-left: 16px;
    }
  }

  .detailText {
    font-size: var(--text-m);
    margin-bottom: 10px;
  }

  @media (max-width: 430px) {
    .more {
      width: 1.6rem;
    }
  }
`;

export default StyledFeedItem;
