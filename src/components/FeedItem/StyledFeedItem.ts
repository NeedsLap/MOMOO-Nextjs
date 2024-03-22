import styled from 'styled-components';

const StyledFeedItem = styled.li`
  margin: 0 auto;
  color: var(--gray-900);

  & + & {
    margin-top: 4rem;
  }

  ul + .contentsSection {
    margin-top: 12px;
  }

  div + .contentsSection {
    margin-top: 20px;
  }

  .contentsSection {
    position: relative;
  }

  .iconSection {
    width: 100%;
    display: flex;
    align-items: flex-start;
    margin: 0 0 1.2rem;

    .emotion,
    .weather {
      align-self: center;
      display: inline-block;
      width: 3.2rem;
      aspect-ratio: 1/1;
    }

    .weather {
      width: 3.6rem;
      margin-left: 1.6rem;
    }
  }

  .more {
    position: absolute;
    top: 0;
    right: 0;
    width: 2rem;
    aspect-ratio: 1/1;
  }

  h3 {
    margin-bottom: 2rem;
    font-size: var(--text-l);
  }

  p,
  time {
    font-size: var(--text-m);
  }

  .detailText {
    margin-bottom: 4rem;
  }

  .locationSection {
    display: inline-block;
    margin-right: 4.8rem;
  }

  .date {
    color: var(--gray-600);
  }

  @media (max-width: 430px) {
    .iconSection {
      margin: 1.6rem 0 1.2rem;

      .emotion {
        width: 2.4rem;
      }

      .weather {
        width: 2.6rem;
        margin-left: 1.2rem;
      }

      button {
        width: 1.6rem;
      }
    }

    h3 {
      margin-bottom: 1.2rem;
    }

    .detailText {
      margin-bottom: 2.4rem;
    }

    .locationSection {
      margin-right: 2rem;
    }
  }
`;

export default StyledFeedItem;
