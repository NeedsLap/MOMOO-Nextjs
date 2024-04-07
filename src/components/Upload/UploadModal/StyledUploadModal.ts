import styled from 'styled-components';

const StyledDialog = styled.dialog`
  max-width: 43rem;
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
  z-index: 1001;
`;

const ContentContainer = styled.div`
  max-height: calc(100vh - 20px);
  overflow-y: auto;
  border-radius: 10px;
  background-color: var(--background-color);
  color: var(--gray-900);
`;

const UploadHeader = styled.header`
  position: relative;
  height: 4.8rem;
  display: flex;
  align-items: center;
  padding: 1.2rem 1.6rem;
  border-bottom: 1px solid var(--gray-200);

  h2 {
    margin: auto;
    font-size: var(--text-l);
  }

  .uploadBtn {
    position: absolute;
    right: 1.6rem;
    color: var(--point-dark-400);
    font-size: var(--text-m);
  }

  .uploadBtn:hover {
    color: var(--point-dark-600);
  }
`;

const MobileCloseBtn = styled.button`
  position: absolute;
  width: 1.6rem;
  aspect-ratio: 1/1;
`;

const TodaysPhoto = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 16px;

  p {
    font-size: var(--text-m);
  }

  span {
    color: var(--gray-600);
  }
`;

const PicSelectPart = styled.section`
  border-bottom: 1px solid var(--gray-200);
  padding: 0 0 1.3rem 1.6rem;
`;

const SelectPart = styled.section`
  position: relative;
  width: 100%;

  .inputWrapper {
    padding: 1.3rem 1.6rem;
    border-bottom: 1px solid var(--gray-200);
    font-size: var(--text-m);
  }

  ::placeholder {
    color: var(--gray-600);
  }

  input {
    width: 100%;
    outline: none;
  }

  .uploadInfo {
    height: 11.4rem;
    position: relative;

    textarea {
      width: 100%;
      height: auto;
      padding: 1.3rem 1.6rem;
      max-height: 11.4rem;
      outline: none;
      border: none;
      font-size: var(--text-m);
      resize: none;
      border-bottom: 1px solid var(--gray-200);
    }

    .countText {
      width: calc(100% - 1.6rem);
      background-color: var(--background-color);
      text-align: right;
      position: absolute;
      bottom: 1.2rem;

      @media (max-width: 430px) {
        bottom: 0rem;
        height: 2rem;
        border-bottom: 1px solid var(--gray-200);
      }
    }
  }
`;

const UploadContents = styled.div`
  width: 100%;
  overflow-y: auto;

  .todayPhoto {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.3rem 1.6rem;

    h3 {
      font-size: var(--text-m);
      color: var(--gray-900);
    }

    p {
      font-size: 1rem;
      color: var(--gray-600);
    }
  }

  @media (min-width: 1025px) {
    min-height: 48rem;
  }

  @media (max-width: 1024px) {
    height: calc(100% - 48px);
    flex-direction: column;
    overflow-y: scroll;
  }

  &.loading {
    min-height: calc(43rem - var(--nav-height-mobile));
    display: flex;
    height: 100%;
    align-items: center;
  }

  @media (max-width: 430px) {
    &.loading {
      min-height: calc(100vh - var(--nav-height-mobile));
    }
  }
`;

const LocationContents = styled.div`
  padding: 0.9rem 1.6rem;
  border-bottom: 1px solid var(--gray-200);
  font-size: var(--text-m);
  color: var(--gray-900);

  .locationHead {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }

  .rotate {
    transform: rotate(180deg);
    transition: transform 0.3s ease-in-out;
  }

  img {
    width: 1.6rem;
  }

  .toggle-icon {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }

  @media (max-width: 430px) {
    padding: 1.3rem 1.6rem;
    background-color: var(--background-color);
  }
`;

const KakaoMapContainer = styled.div`
  width: inherit;
  z-index: 1;
  position: absolute;
  max-height: 50vh;
`;

const AccordionContents = styled.div`
  margin-bottom: 2.4rem;

  img {
    width: 3.6rem;
    aspect-ratio: 1/1;
  }
`;

const CloseBtn = styled.button`
  position: fixed;
  top: 2rem;
  right: 2rem;
  background-color: transparent;
  z-index: 1010;
  cursor: pointer;
`;

export {
  StyledDialog,
  ContentContainer,
  MobileCloseBtn,
  UploadHeader,
  UploadContents,
  TodaysPhoto,
  PicSelectPart,
  SelectPart,
  LocationContents,
  KakaoMapContainer,
  AccordionContents,
  CloseBtn,
};
